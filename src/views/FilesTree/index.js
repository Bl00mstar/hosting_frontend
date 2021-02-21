/*eslint-disable*/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@components/FilesTree/Card.js';
import CardHeader from '@components/FilesTree/CardHeader.js';
import FilesPath from '@components/FilesTree/FilesPath';
import CardBody from '@components/FilesTree/CardBody.js';
// import GridItem from '@components/FilesTree/GridItem.js';
// import GridContainer from '@components/FilesTree/GridContainer.js';
// import CustomTabs from '@components/FilesTree/CustomTabs.js';

// import FilesUploadSingleFile from '@components/FilesTree/FilesUploadSingleFile';
// import FilesRename from '@components/FilesTree/FilesRename';
// import FilesMove from '@components/FilesTree/FilesMove';
// import FilesDeleteToTrash from '@components/FilesTree/FilesDeleteToTrash';

// import FilesOption from '@components/FilesTree/FilesOption';

import useFilesList from '@hooks/FilesTree/useFilesList.js';
import useFilesOptions from '@hooks/FilesTree/useFilesOptions.js';

import { getUserFiles } from '@store/files/file.actions';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '18px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontSize: '17px',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '2px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '55%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

const useStyles = makeStyles(styles);

const FilesTree = ({ files, getFiles, filters, path }) => {
  const classes = useStyles();
  const [table, tableComponent] = useFilesList();
  const [options, optionsComponent] = useFilesOptions();

  useEffect(() => {
    options(0);
  }, [options]);

  useEffect(() => {
    table({ param: ['', 'name', 'created at', 'download'], trashData: files });
  }, [files]);

  useEffect(() => {
    getFiles({ path: path, filters: filters });
  }, []);
  return (
    <Card plain>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Files</h4>
        <p className={classes.cardCategoryWhite}>
          Path: <FilesPath />
        </p>
      </CardHeader>
      {optionsComponent}
      {tableComponent}
    </Card>
  );
};

FilesTree.propTypes = {
  getFiles: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  files: state.file.tree.items,
  path: state.file.tree.path,
  filters: state.file.tree.filters,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFiles: (x) => dispatch(getUserFiles(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesTree);
