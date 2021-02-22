/*eslint-disable*/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@components/FilesTree/Card.js';
import CardHeader from '@components/FilesTree/CardHeader.js';
import FilesPath from '@components/FilesTree/FilesPath';
import FilesAlerts from '@components/FilesTree/FilesAlerts';
import useFilesList from '@hooks/FilesTree/useFilesList.js';
import useFilesOptions from '@hooks/FilesTree/useFilesOptions.js';

import { getUserFiles, handleSelected } from '@store/files/file.actions';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '18px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontSize: '17px',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '2px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '55%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

const useStyles = makeStyles(styles);

const FilesTree = ({ files, getFiles, filters, path, checked, selected }) => {
  const classes = useStyles();
  const [table, tableComponent] = useFilesList();
  const [options, optionsComponent] = useFilesOptions();

  useEffect(() => {
    options(checked.length);
    if (checked.length === 1) {
      selected(checked[0]);
    } else {
      selected({ type: '', id: '', name: '' });
    }
  }, [options, checked]);

  useEffect(() => {
    table({ param: ['', '', 'Name', '', 'Created at'], trashData: files });
  }, [files]);

  useEffect(() => {
    getFiles({ path: path, filters: filters });
  }, [filters]);
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Current path:</h4>

        <p className={classes.cardCategoryWhite}>
          <FilesPath />
        </p>
      </CardHeader>
      {optionsComponent}
      {tableComponent}
      <FilesAlerts />
    </Card>
  );
};

FilesTree.propTypes = {
  getFiles: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
  checked: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  files: state.file.tree.items,
  path: state.file.tree.path,
  filters: state.file.tree.filters,
  checked: state.file.action.checked.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFiles: (x) => dispatch(getUserFiles(x)),
    selected: (x) => dispatch(handleSelected(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesTree);
