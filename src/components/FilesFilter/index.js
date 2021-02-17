import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setFilters } from '@store/files/file.actions';

import { ListItem, ListItemIcon } from '@material-ui/core';

import Folder from '@material-ui/icons/Folder';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';

import TextRotateUp from '@material-ui/icons/TextRotateUp';
import TextRotationDown from '@material-ui/icons/TextRotationDown';

import Timer from '@material-ui/icons/Timer';
import Timelapse from '@material-ui/icons/Timelapse';
// { files, setFilters }
const FilesFilter = ({ filters }) => {
  // const [filter, setFilter] = useState({
  //   byFolder: { type: 'byFolders' }, //byFiles //byFolders //byDefault
  //   byAlpha: { active: true, type: 'byAlphaAsc' }, //byAlphaDesc //byAlphaAsc //byDefault
  //   byData: { active: false, type: 'byDefault' }, //byDataDesc //byDataAsc //byDefault
  // });

  // useEffect(() => {
  //   if (typeof files !== 'undefined' && files.length > 0) {
  //     console.log('asd');
  //     setFilters(['asd']);
  //   }
  // }, [filter]);

  // const handleSortEvent = (section, type, isActive) => {
  //   if (section === 'byAlpha' && type !== 'byDefault') {
  //     setFilter((filter) => ({
  //       ...filter,
  //       byData: { active: false, type: 'byDefault' },
  //       byAlpha: { active: isActive, type: type },
  //     }));
  //   } else if (section === 'byData' && type !== 'byDefault') {
  //     setFilter((filter) => ({
  //       ...filter,
  //       byAlpha: { active: false, type: 'byDefault' },
  //       byData: { active: isActive, type: type },
  //     }));
  //   } else {
  //     setFilter((filter) => ({
  //       ...filter,
  //       [section]: { type: type },
  //     }));
  //   }
  // };

  return (
    <ListItem style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <ListItemIcon style={{ cursor: 'pointer' }}>
        {filters.folder.type === 'byFolder' && (
          <Folder
          // onClick={() => handleSortEvent('byFolder', 'byFiles')}
          />
        )}
        {filters.folder.type === 'byFiles' && (
          <InsertDriveFile
          // onClick={() => handleSortEvent('byFolder', 'byFolders')}
          />
        )}
      </ListItemIcon>
      <ListItemIcon style={{ cursor: 'pointer' }}>
        {filters.alpha.active ? (
          <>
            {filters.alpha.type === 'byAlphaAsc' && (
              <TextRotateUp
              // onClick={() => handleSortEvent('byAlpha', 'byAlphaDesc', true)}
              />
            )}
            {filters.alpha.type === 'byAlphaDesc' && (
              <TextRotationDown
              // onClick={() => handleSortEvent('byAlpha', 'byAlphaAsc', false)}
              />
            )}
          </>
        ) : (
          <>nie</>
        )}
      </ListItemIcon>
      <ListItemIcon style={{ cursor: 'pointer' }}>
        {filters.date.active ? (
          <>
            {' '}
            {filters.date.type === 'byDataAsc' && (
              <Timer
              // onClick={() => handleSortEvent('byData', 'byDataDesc', true)}
              />
            )}
            {filters.date.type === 'byDataDesc' && (
              <Timelapse
              // onClick={() => handleSortEvent('byData', 'byDataDesc', false)}
              />
            )}
          </>
        ) : (
          <>nie</>
        )}
      </ListItemIcon>
    </ListItem>
  );
};

FilesFilter.propTypes = {
  files: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  files: state.file.tree.items,
  filters: state.file.tree.filters,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setFilters: (x) => dispatch(setFilters(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesFilter);
// export default FilesFilter;

// const [sortedOptions, setSortedOptions] = useState({
//   byAlpha: [],
//   byDate: false,
//   byFolder: true,
// });

// useEffect(() => {}, [sortedOptions, files]);

// const handleAZFilter = (data) => {
//   let arr = data.sort((a, b) => {
//     if (a.name < b.name) return -1;
//     if (a.name > b.name) return 1;
//     return 0;
//   });
//   console.log(arr);
// };

// const handleZAFilter = (data) => {
// let arr = data.sort((a, b) => {
//   if (a.name > b.name) return -1;
//   if (a.name < b.name) return 1;
//   return 0;
// });
//   console.log(arr);
// };

// const handleDateFilter = (data) => {
//   let arr = data.sort((a, b) => {
//     return new Date(b.date) - new Date(a.date);
//   });
//   console.log(arr);
// };
