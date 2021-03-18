/*eslint-disable*/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Store from '@material-ui/icons/Store';
// core components
import CustomInput from '@components/CustomInput/CustomInput.js';
import Button from '@components/CustomButtons/Button.js';
import CardAvatar from '@components/Card/CardAvatar.js';
import GridItem from '@components/Grid/GridItem.js';
import GridContainer from '@components/Grid/GridContainer.js';
import Table from '@components/Table/Table.js';
import Tasks from '@components/Tasks/Tasks.js';
import CustomTabs from '@components/CustomTabs/CustomTabs.js';
// import Danger from '@components/Typography/Danger.js';
import Card from '@components/Card/Card.js';
import CardHeader from '@components/Card/CardHeader.js';
import CardIcon from '@components/Card/CardIcon.js';
import CardBody from '@components/Card/CardBody.js';
import CardFooter from '@components/Card/CardFooter.js';

import styles from '@assets/jss/material-dashboard-react/views/dashboardStyle.js';
import sidebarImage from '@assets/sidebarImage.svg';

import {
  getStorageStatics,
  getTrashStatics,
} from '@store/files/file.actions.js';
const useStyles = makeStyles(styles);

const Dashboard = ({ isAuthenticated, getStorageStatics, getTrashStatics }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    getStorageStatics();
    getTrashStatics();
  }, []);

  if (!isAuthenticated) {
    navigate('/account/login');
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>

                <p className={classes.cardCategory}>storage summary</p>
                <p className={classes.cardCategory}>Storage used space</p>
                <h3 className={classes.cardTitle}>
                  49/50 <small>GB</small>
                  <button onClick={() => getFilesStorage()}>asd</button>
                </h3>
                <p className={classes.cardCategory}>Currently files</p>
                <h3 className={classes.cardTitle}>
                  49/50 <small>GB</small>
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                trash summary
                <p className={classes.cardCategory}> trash summary</p>
                <p className={classes.cardCategory}>Trash used space</p>
                <h3 className={classes.cardTitle}>$34,245</h3>
                <p className={classes.cardCategory}>Currently files</p>
                <h3 className={classes.cardTitle}>
                  49/50 <small>GB</small>
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Last uploaded</h4>
              <p className={classes.cardCategoryWhite}>~~last five</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={['Name', 'date']}
                tableData={[
                  ['file', 'date...'],
                  // ['2', 'Minerva Hooper', '$23,789', 'Curaçao'],
                  // ['3', 'Sage Rodriguez', '$56,142', 'Netherlands'],
                  // ['4', 'Philip Chaney', '$38,735', 'Korea, South'],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridItem>
      <GridItem xs={12} sm={12} md={5}>
        <Card profile>
          <CardAvatar profile>
            <img
              style={{ width: '120px', backgroundColor: 'black' }}
              src={sidebarImage}
              alt="..."
            />
          </CardAvatar>
          <CardBody profile>
            <h6 className={classes.cardCategory}>Membership</h6>
            <h4 className={classes.cardTitle}>egname</h4>
            <p className={classes.description}> last logged</p>
            <p className={classes.description}>-</p>
            <p className={classes.description}>-</p>
            <p className={classes.description}>-</p>
            <Button color="primary" round>
              Follow
            </Button>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  getStorageStatics: PropTypes.func.isRequired,
  getTrashStatics: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.details.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFilesStorage: () => dispatch(getFilesStorage()),
    getStorageStatics: () => dispatch(getStorageStatics()),
    getTrashStatics: () => dispatch(getTrashStatics()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
