// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { Button, Menu, MenuItem, Typography } from '@material-ui/core';
// import NestedMenuItem from 'material-ui-nested-menu-item';
// import { getFolders } from '@store/files/file.actions';

// export const MoveItem = ({ getFolders }) => {
//   const [menuPosition, setMenuPosition] = useState(null);

//   const handleClick = (event) => {
//     getFolders();
//     if (menuPosition) {
//       return;
//     }
//     event.preventDefault();
//     setMenuPosition({
//       top: event.pageY,
//       left: event.pageX,
//     });
//   };

//   const handleItemClick = () => {
//     setMenuPosition(null);
//   };

//   return (
//     <div onClick={handleClick}>
//       <Typography>
//         <Button variant="outlined">asd</Button>
//       </Typography>
//       <Menu
//         open={!!menuPosition}
//         onClose={() => setMenuPosition(null)}
//         anchorReference="anchorPosition"
//         anchorPosition={menuPosition}
//       >
//         <NestedMenuItem
//           label="/"
//           parentMenuOpen={!!menuPosition}
//           onClick={handleItemClick}
//         >

//             <NestedMenuItem
//               label="/"
//               parentMenuOpen={!!menuPosition}
//               onClick={handleItemClick}
//             >
//               <NestedMenuItem
//                 label="Sub-Button 3"
//                 parentMenuOpen={!!menuPosition}
//                 onClick={handleItemClick}
//               >
//                 <MenuItem onClick={handleItemClick}>Sub-Sub-Button 1</MenuItem>
//                 <MenuItem onClick={handleItemClick}>Sub-Sub-Button 2</MenuItem>
//               </NestedMenuItem>
//             </NestedMenuItem>
//             <MenuItem onClick={handleItemClick}>Sub-Sub-Button 2</MenuItem>
//           </NestedMenuItem>
//         </NestedMenuItem>
//       </Menu>
//     </div>
//   );
// };

// MoveItem.propTypes = {
//   getFolders: PropTypes.func.isRequired,
//   folders: PropTypes.array,
// };

// const mapStateToProps = (state) => ({
//   folders: state.file.action.folders,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getFolders: (x) => dispatch(getFolders(x)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MoveItem);

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Menu, Typography } from '@material-ui/core';
import NestedMenuItem from 'material-ui-nested-menu-item';
import { getFolders } from '@store/files/file.actions';

export const MoveItem = ({ folders }) => {
  const [menuPosition, setMenuPosition] = useState(null);

  useEffect(() => {
    console.log(folders);
    folders.map((el) => console.log(el));
  }, [folders]);

  const handleClick = (event) => {
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    setMenuPosition({
      top: event.pageY,
      left: event.pageX,
    });
  };

  const handleItemClick = () => {
    setMenuPosition(null);
  };

  return (
    <div onClick={handleClick}>
      <Typography>
        <Button variant="outlined">asd</Button>
      </Typography>
      <Menu
        open={!!menuPosition}
        onClose={() => setMenuPosition(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
      >
        <NestedMenuItem
          label="/"
          parentMenuOpen={!!menuPosition}
          onClick={handleItemClick}
        ></NestedMenuItem>
      </Menu>
    </div>
  );
};

MoveItem.propTypes = {
  getFolders: PropTypes.func.isRequired,
  folders: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  folders: state.file.action.folders,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFolders: (x) => dispatch(getFolders(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveItem);
