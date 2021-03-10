/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Video from './Video';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

const PlaylistStream = ({ file }) => {
  const classes = useStyles();
  const [activeFile, setActiveFile] = useState({});

  useEffect(() => {
    if (file.file._id) {
      setActiveFile(file.file);
    }
  }, [file]);

  return (
    <>
      <h4 className={classes.cardTitle}>{activeFile.name}</h4>
      <Video file={file.file} />
    </>
  );
};

PlaylistStream.propTypes = {
  file: PropTypes.object.isRequired,
};

export default connect()(PlaylistStream);
