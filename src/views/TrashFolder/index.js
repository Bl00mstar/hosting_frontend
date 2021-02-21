import React, { useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// core components
import GridItem from '@components/Grid/GridItem.js';
import GridContainer from '@components/Grid/GridContainer.js';
import Card from '@components/Card/Card.js';
import CardHeader from '@components/Card/CardHeader.js';
import CardBody from '@components/Card/CardBody.js';
import { getUserTrash } from '@store/files/file.actions';
import useTrashList from '@hooks/useTrashList.js';
const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
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
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

const useStyles = makeStyles(styles);

const TrashFolder = ({ getTrashList, trashData }) => {
  const [table, tableComponent] = useTrashList();

  const classes = useStyles();

  useEffect(() => {
    table({ param: ['name', 'date'], trashData: trashData });
  }, [trashData]);

  useEffect(() => {
    getTrashList();
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Trash files</h4>
            <p className={classes.cardCategoryWhite}>
              The list includes files that have been deleted. You can recover or
              remove them permanently.
            </p>
          </CardHeader>
          <CardBody>{tableComponent}</CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

TrashFolder.propTypes = {
  getTrashList: PropTypes.func.isRequired,
  trashData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  trashData: state.file.trash.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getTrashList: (x) => dispatch(getUserTrash(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrashFolder);
