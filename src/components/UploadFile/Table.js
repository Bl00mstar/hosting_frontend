import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// core components
import styles from '@assets/jss/components/FilesTree/tableStyle.js';
import { setDirectoryPath, foldersPath } from '@store/files/file.actions';
import { handleCheck } from '@store/files/file.actions';

const useStyles = makeStyles(styles);

const FilesTable = (props) => {
  const classes = useStyles();
  const { tableData } = props;

  return (
    <>
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          <TableBody>
            {tableData.map((prop, key) => {
              console.log(prop[0].name);
              return (
                <TableRow key={key} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell}>
                    <p>{prop[0].name}</p>
                  </TableCell>
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
};

const mapStateToProps = (state) => ({
  path: state.file.tree.path,
  files: state.file.tree.items,
  checkedItems: state.file.action.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleCheck: (x) => dispatch(handleCheck(x)),
    getFiles: (x) => dispatch(setDirectoryPath(x)),
    setPath: (x) => dispatch(foldersPath(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesTable);
