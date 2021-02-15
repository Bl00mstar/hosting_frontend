import React from 'react';
import { Card, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: {
    justify: 'center',
    width: '95%',
    marginTop: '5px',
    textAlign: 'center',
  },
  alert: {
    marginTop: '5px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  button: {
    marginTop: '9px',
    marginRight: '7px',
    color: 'red',
    marginBottom: '11px',
  },
}));

const TrashDelete = () => {
  const classes = useStyles();

  return (
    <Card margin="normal" className={classes.card}>
      <div className={classes.alert}>
        <Alert severity="info">Files will be deleted permanently.</Alert>
      </div>

      <Button className={classes.button} variant="outlined" size="small">
        Delete
      </Button>
    </Card>
  );
};

export default TrashDelete;
