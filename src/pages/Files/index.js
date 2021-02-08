import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Path from '@components/FilesPath';
// import Files from '@components/FilesList';
import Filter from '@components/FilesFilter';
import Button from '@components/FilesButton';

import usePathFiles from '@hooks/usePathFiles';

const Files = ({ path }) => {
  useEffect(() => {
    if (path) {
      updatePath(path);
    }
    // eslint-disable-next-line
  }, [path]);

  const [pathFiles, pathComponentUI] = usePathFiles();
  const updatePath = (selectedPath) => pathFiles(selectedPath);

  return (
    <div>
      {pathComponentUI}
      <Button />
      <Filter />
      {/* <Files /> */}
      <div>sad</div>
    </div>
  );
};

Files.propTypes = {
  path: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  path: state.file.tree.path,
});

export default connect(mapStateToProps)(Files);
