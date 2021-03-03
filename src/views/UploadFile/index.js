import React from 'react';
import Card from '@components/UploadFile/Card';
import CardHeader from '@components/UploadFile/CardHeader';
import Upload from './Upload';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from '@assets/js/components/UploadFiles/uploadFiles';

const useStyles = makeStyles(styles);

const UploadFile = () => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader color="primary">
        <p>Upload</p>
      </CardHeader>
      <Divider className={classes.dividerStyle} />
      <Upload />
    </Card>
  );
};
export default UploadFile;
