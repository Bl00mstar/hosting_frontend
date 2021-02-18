import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserFiles } from '@store/files/file.actions';
import PathNavigate from '@components/FilesPath';
import FilesList from '@components/FilesList';
import Filter from '@components/FilesFilter';
import NavigateButton from '@components/FilesButton';
import useButtonFiles from '@hooks/useButtonFiles';
import FilesAlert from '@components/FilesAlert';

const Files = ({ path, getFiles, checked, filters }) => {
  const [filesOptions, filesOptionsComponent] = useButtonFiles();

  useEffect(() => {
    filesOptions(checked);
  }, [checked, filesOptions]);

  useEffect(() => {
    getFiles({ path: path, filters: filters });
    // eslint-disable-next-line
  }, [path, filters]);

  return (
    <div style={{ height: '100%', overflow: 'hidden' }}>
      <FilesAlert />
      <PathNavigate />
      <NavigateButton />
      {filesOptionsComponent}
      <Filter />
      <FilesList />
    </div>
  );
};

Files.propTypes = {
  path: PropTypes.string.isRequired,
  getFiles: PropTypes.func.isRequired,
  checked: PropTypes.array,
  filters: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  checked: state.file.action.checked.items,
  path: state.file.tree.path,
  filters: state.file.tree.filters,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFiles: (x) => dispatch(getUserFiles(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Files);
