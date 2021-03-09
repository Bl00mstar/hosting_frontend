/*eslint-disable*/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@components/CustomButtons/Button.js';
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
export default function PlaylistStream() {
  const classes = useStyles();
  const showVideo = () => {
    return (
      <video
        style={{ width: '100%', height: 'auto' }}
        controls
        controlsList="nodownload"
      >
        <source
          // src={`${LiveURL}/watch/movie/${vid}`}
          src={`http://192.168.55.100:9000/stream/movie/3`}
          onContextMenu="return false;"
          onCanPlay={true}
          //   type="video/x-matroska;"
        />
      </video>
    );
  };
  return (
    <>
      {/* <h6 className={classes.cardCategory}>playlist</h6> */}
      <h3 className={classes.cardTitle}>active name</h3>
      {showVideo()}
    </>
  );
}
