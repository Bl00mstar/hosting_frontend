import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserFiles } from '@store/files/file.actions';
import PathNavigate from '@components/FilesPath';
import FilesList from '@components/FilesList';
import Filter from '@components/FilesFilter';
import NavigateButton from '@components/FilesButton';

import useButtonFiles from '@hooks/useButtonFiles';

const Files = ({ path, getFiles, checked }) => {
  const [filesOptions, filesOptionsComponent] = useButtonFiles();

  useEffect(() => {
    filesOptions(checked);
  }, [checked, filesOptions]);

  useEffect(() => {
    getFiles(path);
    // eslint-disable-next-line
  }, [path]);

  return (
    <>
      <PathNavigate />
      <NavigateButton />
      {filesOptionsComponent}
      <Filter />
      <FilesList />
    </>
  );
};

Files.propTypes = {
  path: PropTypes.string.isRequired,
  getFiles: PropTypes.func.isRequired,
  checked: PropTypes.array,
};

const mapStateToProps = (state) => ({
  checked: state.file.action.checked.items,
  path: state.file.tree.path,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFiles: (x) => dispatch(getUserFiles(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Files);
