import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { handleSelected } from '@store/files/file.actions';

const FilesButton = ({ buttons = [], checkedItems, selected }) => {
  const [activeElement, setActiveElement] = useState({
    active: '',
    component: '',
  });

  useEffect(() => {
    if (checkedItems.length === 0) {
      selected({ type: '', id: '', name: '' });
      setActiveElement({
        active: '',
        component: '',
      });
    } else if (checkedItems.length === 1) {
      selected({
        type: checkedItems[0].type,
        id: checkedItems[0].id,
        name: checkedItems[0].name,
      });
      setActiveElement({
        active: '',
        component: '',
      });
    } else if (checkedItems.length > 1) {
      selected({ type: '', id: '', name: '' });
      setActiveElement({
        active: '',
        component: '',
      });
    }
  }, [checkedItems, selected]);

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

  const Buttons = buttons.map(({ name, value, type, element }, idx) => {
    if (checkedItems.length === 0) {
      if (type.includes('all')) {
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
    } else if (checkedItems.length === 1) {
      if (type.includes('all') || type.includes('checkOne')) {
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
    } else if (checkedItems.length > 1) {
      if (type.includes('all') || type.includes('checkMany')) {
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
      {Buttons}
      {activeElement.active && activeElement.component}
    </div>
  );
};

FilesButton.propTypes = {
  buttons: PropTypes.array,
  selected: PropTypes.func.isRequired,
  checkedItems: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  files: state.file.tree.items,
  checkedItems: state.file.action.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    selected: (x) => dispatch(handleSelected(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesButton);
