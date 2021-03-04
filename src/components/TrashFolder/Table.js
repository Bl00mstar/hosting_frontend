import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { ListItemIcon } from '@material-ui/core';
// core components
import styles from '@assets/jss/components/FilesTree/tableStyle.js';
import {
  setDirectoryPath,
  foldersPath,
  trashSelected,
} from '@store/files/file.actions';
import { handleCheck } from '@store/files/file.actions';
import { InsertDriveFile } from '@material-ui/icons';
const useStyles = makeStyles(styles);

const FilesTable = (props) => {
  const classes = useStyles();
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    setChecked,
    checkedItems,
  } = props;
  const [isChecked, setIsChecked] = useState({ values: [] });

  const handleCheckElement = (value) => {
    console.log(value);
    if (isChecked.values.includes(value.id)) {
      let filtered = isChecked.values.filter((el) => el !== value.id);
      setChecked(filtered);
      setIsChecked({
        values: filtered,
      });
    } else {
      setChecked([...checkedItems, value]);
      setIsChecked((isChecked) => ({
        ...isChecked,
        values: [...isChecked.values, value.id],
      }));
    }
  };

  return (
    <>
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
              <TableRow className={classes.tableHeadRow}>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={
                        classes.tableCell + ' ' + classes.tableHeadCell
                      }
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((prop, key) => {
              return (
                <TableRow key={key} className={classes.tableBodyRow}>
                  <TableCell
                    className={classes.tableCell}
                    style={{ width: '15px' }}
                  >
                    <Checkbox
                      value={prop.id}
                      checked={
                        isChecked.values.includes(prop.id) ? true : false
                      }
                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                      style={{ color: 'green' }}
                      onChange={() => {
                        handleCheckElement(prop);
                      }}
                    />
                  </TableCell>

                  <>
                    <TableCell
                      className={classes.tableCell}
                      style={{ width: '15px' }}
                    >
                      <ListItemIcon style={{ marginTop: '4px' }}>
                        <InsertDriveFile />
                      </ListItemIcon>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {prop.name}
                    </TableCell>
                  </>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

FilesTable.propTypes = {
  getFiles: PropTypes.func.isRequired,
  setPath: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  checkedItems: PropTypes.array.isRequired,
  handleCheck: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  setChecked: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  path: state.file.tree.path,
  files: state.file.tree.items,
  checkedItems: state.file.trash.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleCheck: (x) => dispatch(handleCheck(x)),
    getFiles: (x) => dispatch(setDirectoryPath(x)),
    setPath: (x) => dispatch(foldersPath(x)),
    setChecked: (x) => dispatch(trashSelected(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesTable);
