import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { getUserFiles } from '@store/files/file.actions';
import { Grid, Paper, Typography, Container } from '@material-ui/core';

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Container maxWidth="sm">
        <Grid container item xs={12} spacing={10}>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h5" component="h2">
              <Paper>item</Paper>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h5" component="h2">
              <Paper>item</Paper>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h5" component="h2">
              <Paper>item</Paper>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h5" component="h2">
              <Paper>item</Paper>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Dashboard;
