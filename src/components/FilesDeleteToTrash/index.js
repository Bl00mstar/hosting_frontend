import React from 'react';
import { Card, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export default function index() {
  return (
    <Card
      margin="normal"
      style={{
        justify: 'center',
        width: '95%',
        marginTop: '5px',
        textAlign: 'center',
      }}
    >
      <div style={{ marginTop: '5px', marginLeft: '5px', marginRight: '5px' }}>
        <Alert severity="info">
          Folders will be deleted, existed files will be moved into trash
          folder. If you want continue press confirm.
        </Alert>
      </div>

      <Button
        variant="outlined"
        size="small"
        style={{
          marginTop: '9px',
          marginRight: '7px',
          color: 'red',
          marginBottom: '11px',
        }}
      >
        Confirm
      </Button>
    </Card>
  );
}

// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { Button } from '@material-ui/core';
// import { itemSelected, deleteItem } from '@store/files/file.actions';

// const DeleteItem = ({ item, deleteItems, path }) => {
//   const [deleteButton, setDeleteButton] = useState(false);
//   useEffect(() => {
//     if (item.length > 0) {
//       setDeleteButton(true);
//     } else {
//       setDeleteButton(false);
//     }
//   }, [item]);

//   const handleDelete = () => {
//     if (
//       confirm(
//         'Are you sure? Files will be moved into trash folder, folders will be deleted.'
//       )
//     ) {
//       // Save it!
//       console.log('Delete!');
//       //files /folders /path
//       deleteItems({ items: item, path: path });
//     } else {
//       // Do nothing!
//       console.log('Nope');
//     }
//   };

//   return (
//     <>
//       {deleteButton ? (
//         <Button
//           variant="outlined"
//           style={{ marginRight: '5px', marginTop: '5px' }}
//           onClick={() => handleDelete()}
//         >
//           Delete
//         </Button>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };

// DeleteItem.propTypes = {
//   item: PropTypes.array.isRequired,
//   selected: PropTypes.func.isRequired,
//   deleteItems: PropTypes.func.isRequired,
//   path: PropTypes.string,
// };

// const mapStateToProps = (state) => ({
//   item: state.file.action.checked.items,
//   path: state.file.tree.path,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     selected: (x) => dispatch(itemSelected(x)),
//     deleteItems: (x) => dispatch(deleteItem(x)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(DeleteItem);
