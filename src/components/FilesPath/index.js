import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FilesPath = ({ path }) => {
  // const [localPath, setLocalPath] = useState([]);

  useEffect(() => {
    let pathArray = path.replace(/\//g, '/ ').split(' ');
    console.log(pathArray);
    console.log(path);
  }, [path]);

  return (
    <>
      <button>a</button>
    </>
  );
};

FilesPath.propTypes = {
  path: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  path: state.file.action.path,
});

export default connect(mapStateToProps)(FilesPath);
