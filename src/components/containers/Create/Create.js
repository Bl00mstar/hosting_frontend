import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useStyles } from '@styles/DashboardStyle';
import { createNewFolder } from '@store/files/file.actions';
import { useForm } from 'react-hook-form';
import { Typography, Grid, FormControl } from '@material-ui/core';

const Create = ({ path, createFolder }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });

  const onSubmit = (data, e) => {
    e.target.reset();
    data.file_path = path;
    createFolder(data);
    console.log(data);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            Selected path:
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={4}>
              {' '}
              <input
                type="text"
                placeholder="Folder name"
                name="file_text"
                ref={register({
                  required: true,
                })}
                style={{
                  marginTop: '8px',
                  padding: '10px 26px 1px 12px',
                  marginRight: '8px',
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.formControl}>
                <select
                  name="file_type"
                  ref={register}
                  style={{ padding: '10px 26px 5px 12px', marginTop: '8px' }}
                >
                  <option value="new">new</option>
                  <option value="pattern">pattern</option>
                  <option value="random">random</option>
                </select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              {' '}
              <button
                type="submit"
                style={{ padding: '10px 16px 1px 12px', fontSize: '14px' }}
              >
                Create
              </button>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={4}>
          <h3>New Folder</h3>
          <br />
          Choosing this option you will create new folder in current directory.
        </Grid>
        <Grid item xs={4}>
          <h3>Pattern</h3>
          <br />
          Choosing this option you can create multiple folders with the same
          name.
          <br />
          Example: name_(1-20)
          <br />
          You will get multiple folders named (name_01,...name_20) in selected
          path.
        </Grid>
        <Grid item xs={4}>
          <h3>Random</h3>
          <br />
          Choosing this option in the field File Name you need to specify how
          many folders will be created. The files will be named using uuid.
        </Grid>
      </Grid>
    </div>
  );
};

Create.propTypes = {
  createFolder: PropTypes.func,
  path: PropTypes.string,
};

const mapStateToProps = (state) => ({
  path: state.file.tree.path,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createFolder: (x) => dispatch(createNewFolder(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
