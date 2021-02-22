import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import TrashRestore from '@components/TrashRestore';
import TrashDelete from '@components/TrashDelete';

const TrashButton = ({ checkedTrash }) => {
  const [activeElement, setActiveElement] = useState({
    active: '',
    component: '',
  });

  useEffect(() => {
    if (checkedTrash.length === 0) {
      setActiveElement({
        active: '',
        component: '',
      });
    }
  }, [checkedTrash]);

  const handleActiveElement = (value, element) => {
    if (activeElement.active === value) {
      setActiveElement((activeElement) => ({
        ...activeElement,
        active: '',
        component: '',
      }));
    } else {
      setActiveElement((activeElement) => ({
        ...activeElement,
        active: value,
        component: element,
      }));
    }
  };

  const buttons = [
    {
      name: 'Restore',
      value: 'restore',
      type: ['oneOrMany'],
      element: <TrashRestore />,
    },
    {
      name: 'Delete',
      value: 'delete',
      type: ['oneOrMany'],
      element: <TrashDelete />,
    },
  ];

  const ButtonStyle = buttons.map(({ name, value, type, element }, idx) => {
    if (checkedTrash.length > 0) {
      if (type.includes('oneOrMany')) {
        return (
          <Button
            size="small"
            variant="outlined"
            value={value}
            key={idx}
            onClick={() => handleActiveElement(value, element)}
            style={{ margin: '1px', minWidth: '8px' }}
          >
            {name}
          </Button>
        );
      }
    }
  });

  return (
    <div>
      {ButtonStyle}
      {activeElement.active && activeElement.component}
    </div>
  );
};

TrashButton.propTypes = {
  buttons: PropTypes.array,
  checkedTrash: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  checkedTrash: state.file.trash.checked.items,
});

//   const mapDispatchToProps = (dispatch) => {
//     return {
//       handleCheck: (x) => dispatch(handleCheck(x)),
//       getFiles: (x) => dispatch(setDirectoryPath(x)),
//       setPath: (x) => dispatch(foldersPath(x)),
//     };
//   };

export default connect(mapStateToProps)(TrashButton);
