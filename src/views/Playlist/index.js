/*eslint-disable*/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// core components
import GridItem from '@components/Grid/GridItem.js';
import GridContainer from '@components/Grid/GridContainer.js';
import Card from '@components/Card/Card.js';
import CardBody from '@components/Card/CardBody.js';
import NewPlaylist from '@components/Playlist/NewPlaylist';
import PlaylistList from '@components/Playlist/PlaylistList';
import PlaylistStream from '@components/Playlist/PlaylistStream';
import PlaylistFiles from '@components/Playlist/PlaylistFiles';
import {
  getPlaylists,
  addPlaylist,
  deletePlaylist,
  editPlaylist,
  getFileData,
  filesFromPlaylist,
  playFile,
} from '@store/playlists/playlist.actions';

const Playlist = (props) => {
  const {
    editPlaylist,
    getPlaylists,
    playlistList,
    addPlaylist,
    deletePlaylist,
    file,
    chosenList,
    getFileData,
    filesFromPlaylist,
    playFile,
  } = props;

  useEffect(() => {
    if (file.id) {
      getFileData(file.id);
    }
  }, [file.id]);

  useEffect(() => {
    getPlaylists();
  }, []);

  const handlePlaylist = () => {
    filesFromPlaylist('6048fdf0c9f9c4552e3fc2a6');
  };

  return (
    <div>
      <button onClick={() => handlePlaylist()}>SET playlist</button>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          {file.active && (
            <Card profile>
              <CardBody>
                <PlaylistStream file={file} />
              </CardBody>
            </Card>
          )}
          {chosenList.list && (
            <Card profile>
              <CardBody profile>
                <PlaylistFiles
                  chosenList={chosenList}
                  file={file.file._id}
                  playFile={playFile}
                />
              </CardBody>
            </Card>
          )}
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardBody>
              <PlaylistList
                playlistList={playlistList}
                deletePlaylist={deletePlaylist}
                editPlaylist={editPlaylist}
              />
              <NewPlaylist addPlaylist={addPlaylist} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

Playlist.propTypes = {
  playlistList: PropTypes.array.isRequired,
  getPlaylists: PropTypes.func.isRequired,
  addPlaylist: PropTypes.func.isRequired,
  deletePlaylist: PropTypes.func.isRequired,
  getFileData: PropTypes.func.isRequired,
  filesFromPlaylist: PropTypes.func.isRequired,
  playFile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playlistList: state.playlist.list,
  file: state.playlist.playFile,
  chosenList: state.playlist.chosenList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    editPlaylist: (x) => dispatch(editPlaylist(x)),
    getPlaylists: () => dispatch(getPlaylists()),
    addPlaylist: (x) => dispatch(addPlaylist(x)),
    deletePlaylist: (x) => dispatch(deletePlaylist(x)),
    getFileData: (x) => dispatch(getFileData(x)),
    filesFromPlaylist: (x) => dispatch(filesFromPlaylist(x)),
    playFile: (id) => dispatch(playFile(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
