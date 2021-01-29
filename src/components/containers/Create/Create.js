import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { createNewFolder } from '@store/files/file.actions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const Create = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });
  const onSubmit = (data, e) => {
    e.target.reset();
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            Selected path:
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="File name"
              name="file_text"
              ref={register({
                required: true,
              })}
            />
            <select>
              <option value="new">New Folder</option>
              <option value="pattern">Pattern</option>
              <option value="random">Random</option>
            </select>
            <button>Create</button>
          </form>
        </Grid>
        <Grid item xs={4}>
          New Folder
          <br />
          Choosing this option you will create new folder in current directory.
        </Grid>
        <Grid item xs={4}>
          Pattern
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
          Random
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
