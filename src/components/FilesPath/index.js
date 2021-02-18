import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { setDirectoryPath, getUserFiles } from '@store/files/file.actions';

const FilesPath = ({ path, setPath, getFiles, filters }) => {
  const [selectPath, setSelectPath] = useState([]);
  useEffect(() => {
    getFiles({ path: path, filters: filters });
    console.log(path);
    let pathArray = path.replace(/\//g, '/ ').split(' ');
    pathArray.pop();
    setSelectPath(pathArray);
    console.log(pathArray);
  }, [path]);

  const selectDirectory = (e, el) => {
    e.preventDefault();
    console.log(path);
    console.log(el);
    console.log(path.split(path.split(el)[0] + el));
    setPath(path.split(el)[0] + el);
  };

  return (
    <>
      {selectPath.map((el, key) => (
        <Button
          margin="normal"
          size="small"
          onClick={(e) => selectDirectory(e, el)}
          key={key}
        >
          {el}
        </Button>
      ))}
    </>
  );
};

FilesPath.propTypes = {
  path: PropTypes.string.isRequired,
  setPath: PropTypes.func.isRequired,
  getFiles: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  path: state.file.tree.path,
  filters: state.file.tree.filters,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setPath: (x) => dispatch(setDirectoryPath(x)),
    getFiles: (x) => dispatch(getUserFiles(x)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilesPath);
