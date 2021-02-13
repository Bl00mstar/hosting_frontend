import React from 'react';

export default function index() {
  return <div>delete</div>;
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
