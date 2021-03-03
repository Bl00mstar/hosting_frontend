import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import { tokenConfig } from '@store/user/user.helpers';
// import AddIcon from '@material-ui/icons/Add';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { Box, Paper } from '@material-ui/core';
import defaultStyles from './styles';
import { Attachment, Close } from '@material-ui/icons';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      styles: Object.assign({}, defaultStyles, props.styles),
    };
    this.url = 'http://192.168.55.100:9000/stream/upload';
    this.activeDrag = 0;
    this.xhrs = [];
    this.onClick = this.onClick.bind(this);
    this.onUploadButtonClick = this.onUploadButtonClick.bind(this);
    this.onFileSelect = this.onFileSelect.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onClick() {
    this.fileInput.click();
  }

  onUploadButtonClick() {
    this.upload();
  }

  onFileSelect() {
    const items = this.filesToItems(this.fileInput.files);
    this.setState({ items }, () => {
      if (this.props.auto) {
        this.upload();
      }
    });
  }

  onDragEnter() {
    this.activeDrag += 1;
    this.setState({ isActive: this.activeDrag > 0 });
  }

  onDragOver(e) {
    if (e) {
      e.preventDefault();
    }
    return false;
  }

  onDragLeave() {
    this.activeDrag -= 1;
    if (this.activeDrag === 0) {
      this.setState({ isActive: false });
    }
  }

  onDrop(e) {
    if (!e) {
      return;
    }
    e.preventDefault();
    this.activeDrag = 0;
    const droppedFiles = e.dataTransfer ? e.dataTransfer.files : [];
    const items = this.filesToItems(droppedFiles);

    this.setState({ isActive: false, items }, () => {
      if (this.props.auto) {
        this.upload();
      }
    });
  }

  clearIfAllCompleted() {
    if (this.props.clearTimeOut > 0) {
      const completed = this.state.items.filter((item) => item.progress === 100)
        .length;
      if (completed === this.state.items.length) {
        setTimeout(() => {
          this.setState({ items: [] });
        }, this.props.clearTimeOut);
      }
    }
  }

  updateFileProgress(index, progress) {
    const newItems = [...this.state.items];
    newItems[index] = Object.assign({}, this.state.items[index], { progress });
    this.setState({ items: newItems }, this.clearIfAllCompleted);
  }

  updateFileChunkProgress(index, chunkIndex, progress) {
    const newItems = [...this.state.items];
    const currentItem = this.state.items[index];
    const newProgressArr = [...currentItem.chunkProgress];
    const totalProgress =
      newProgressArr.reduce((a, b) => a + b) / (newProgressArr.length - 1);
    newProgressArr[chunkIndex] = progress;
    newItems[index] = Object.assign({}, currentItem, {
      chunkProgress: newProgressArr,
      progress: totalProgress,
    });
    this.setState({ items: newItems }, this.clearIfAllCompleted);
  }

  cancelFile(index) {
    const newItems = [...this.state.items];
    newItems[index] = Object.assign({}, this.state.items[index], {
      cancelled: true,
    });
    if (this.xhrs[index]) {
      this.xhrs[index].upload.removeEventListener('progress');
      this.xhrs[index].removeEventListener('load');
      this.xhrs[index].abort();
    }
    this.setState({ items: newItems });
  }

  upload() {
    const items = this.state.items;
    if (items) {
      items
        .filter((item) => !item.cancelled)
        .forEach((item) => {
          this.uploadItem(item);
        });
    }
  }

  uploadItem(item) {
    if (this.props.chunks && item.file) {
      const BYTES_PER_CHUNK = this.props.chunkSize;
      const SIZE = item.file.size;

      let start = 0;
      let end = BYTES_PER_CHUNK;

      const chunkProgressHandler = (percentage, chunkIndex) => {
        this.updateFileChunkProgress(item.index, chunkIndex, percentage);
      };
      let chunkIndex = 0;
      while (start < SIZE) {
        this.uploadChunk(
          item.file.slice(start, end),
          (chunkIndex += 1),
          item.file.name,
          chunkProgressHandler
        );
        start = end;
        end = start + BYTES_PER_CHUNK;
      }
    } else {
      this.uploadFile(item.file, (progress) =>
        this.updateFileProgress(item.index, progress)
      );
    }
  }

  uploadChunk(blob, chunkIndex, fileName, progressCallback) {
    if (blob) {
      const formData = new FormData();

      const xhr = new XMLHttpRequest();
      const data = this.props.formData;
      if (data.length > 0) {
        data.map((d) => {
          formData.append(d.name, d.value);
        });
      }
      let token = tokenConfig();

      console.log(token);
      formData.append(
        this.props.fieldName,
        blob,
        `${fileName}-chunk${chunkIndex}`
      );

      xhr.onload = () => {
        progressCallback(100, chunkIndex);
      };
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          progressCallback((e.loaded / e.total) * 100, chunkIndex);
        }
      };
      xhr.open(this.props.method, this.url, true);
      xhr.setRequestHeader(
        'Authorization',
        `Bearer ${token.headers['x-auth-token']}`
      );
      xhr.send(formData);
    }
  }

  uploadFile(file, progressCallback) {
    if (file) {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      const data = this.props.formData;
      console.log('x');
      if (data.length > 0) {
        data.map((d) => {
          formData.append(d.name, d.value);
        });
      }
      let token = tokenConfig();

      console.log(token);
      formData.append(this.props.fieldName, file, file.name);

      xhr.onload = () => {
        progressCallback(100);
      };

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          progressCallback((e.loaded / e.total) * 100);
        }
      };

      xhr.open(this.props.method, this.url, true);
      xhr.setRequestHeader(
        'Authorization',
        `Bearer ${token.headers['x-auth-token']}`
      );
      xhr.send(formData);
      this.xhrs[file.index] = xhr;
    }
  }

  filesToItems(files) {
    const fileItems = Array.prototype.slice
      .call(files)
      .slice(0, this.props.maxFiles);
    const items = fileItems.map((f, i) => {
      if (this.props.chunks) {
        const chunkProgress = [];
        for (let j = 0; j <= f.size / this.props.chunkSize; j += 1) {
          chunkProgress.push(0);
        }
        return {
          file: f,
          index: i,
          progress: 0,
          cancelled: false,
          chunkProgress,
        };
      }
      return { file: f, index: i, progress: 0, cancelled: false };
    });
    return items;
  }

  humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    var units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
  }

  renderDropTarget() {
    return (
      <div
        data-test-id="dropTarget"
        // style={dropTargetStyle}

        onClick={this.onClick}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
      >
        {/* style={styles.placeHolderStyle} */}
        <div
          style={{
            border: '3px dashed #009900',
            padding: 10,
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          <p>{this.props.dropzoneLabel}</p>
          <Attachment />
        </div>

        {this.renderFileSet()}
      </div>
    );
  }

  renderFileSet() {
    const items = this.state.items;
    const { filesetTransitionName: transitionName } = this.props;
    if (items.length > 0) {
      const { cancelIconClass, completeIconClass } = this.props;
      const { styles } = this.state;
      return (
        <TransitionGroup
          component="div"
          transitionName={transitionName}
          transitionEnterTimeout={0}
          transitionLeaveTimeout={0}
        >
          {/* style={filesetStyle} */}
          <div>
            {items
              .filter((item) => !item.cancelled && !!item.file)
              .map((item) => {
                const file = item.file;
                const iconClass =
                  item.progress < 100 ? cancelIconClass : completeIconClass;
                return (
                  <Paper
                    elevation={3}
                    key={item.index}
                    style={{ margin: '10px' }}
                  >
                    <div>
                      <div style={styles.fileDetails}>
                        <span className="icon-file icon-large">&nbsp;</span>
                        <span style={styles.fileName}>{`${file.name}`}</span>
                        <Close
                          className={iconClass}
                          style={{ cursor: 'pointer', color: 'red' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            this.cancelFile(item.index);
                          }}
                        />
                      </div>
                      <Box
                        display="flex"
                        alignItems="center"
                        style={{ padding: 5 }}
                      >
                        <Box width="100%" mr={1}>
                          <LinearProgress
                            variant="determinate"
                            value={item.progress}
                          />
                        </Box>
                        <Box minWidth={35}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >{`${item.progress}%`}</Typography>
                        </Box>
                      </Box>
                    </div>
                  </Paper>
                );
              })}
          </div>
        </TransitionGroup>
      );
    }
    return (
      <TransitionGroup
        component="div"
        transitionName={transitionName}
        transitionEnterTimeout={0}
        transitionLeaveTimeout={0}
      />
    );
  }

  renderInput() {
    const maxFiles = this.props.maxFiles;
    return (
      <input
        style={{ display: 'none' }}
        multiple={maxFiles > 1}
        type="file"
        ref={(c) => {
          if (c) {
            this.fileInput = c;
          }
        }}
        onChange={this.onFileSelect}
      />
    );
  }

  render() {
    return (
      <div style={{ border: '1px transparent', padding: '30px' }}>
        {this.renderDropTarget()}
        {this.renderInput()}
      </div>
    );
  }
}

Upload.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.string,
  auto: PropTypes.bool,
  fieldName: PropTypes.string,
  buttonLabel: PropTypes.string,
  dropzoneLabel: PropTypes.string,
  chunks: PropTypes.bool,
  chunkSize: PropTypes.number,
  maxFiles: PropTypes.number,
  clearTimeOut: PropTypes.number,
  filesetTransitionName: PropTypes.string,
  styles: PropTypes.shape({}),
  cancelIconClass: PropTypes.string,
  completeIconClass: PropTypes.string,
  uploadIconClass: PropTypes.string,
  progressClass: PropTypes.string,
  formData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

Upload.defaultProps = {
  method: 'POST',
  auto: true,
  fieldName: 'datafile',
  buttonLabel: 'Upload',
  dropzoneLabel: 'Drag and drop files',
  maxSize: 25 * 1024 * 1024,
  chunks: false,
  chunkSize: 512 * 1024,
  localStore: false,
  maxFiles: 10,
  encrypt: false,
  clearTimeOut: 3000,
  filesetTransitionName: 'fileset',
  cancelIconClass: 'fa fa-close',
  completeIconClass: 'fa fa-check',
  uploadIconClass: 'fa fa-upload',
  formData: [],
};

export default Upload;
