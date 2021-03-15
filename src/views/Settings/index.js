/*eslint-disable*/
import React, { useEffect, useState } from 'react';
// @material-ui/core components
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
// core components
import GridItem from '@components/Grid/GridItem.js';
import GridContainer from '@components/Grid/GridContainer.js';
import Button from '@components/CustomButtons/Button.js';
import Card from '@components/Card/Card.js';
import CardHeader from '@components/Card/CardHeader.js';
// import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from '@components/Card/CardBody.js';
import CardFooter from '@components/Card/CardFooter.js';
// import { Input } from '@material-ui/core';
import { changeUserData } from '@store/user/user.actions';
import { setMessage } from '@store/alerts/alert.actions';
import { TextField } from '@material-ui/core';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

const Settings = ({ userData, setMessage, changeUserData }) => {
  const [credentials, setCredentials] = useState({});

  useEffect(() => {
    setCredentials(userData);
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials === userData) {
      setMessage({ message: 'Settings are the same.', type: 'info' });
    } else {
      changeUserData(credentials);
      console.log(userData);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit your details</h4>
              <p className={classes.cardCategoryWhite}>Change credentials</p>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <GridContainer justify={'center'}>
                  <GridItem xs={12} sm={12} md={10} lg={8}>
                    <GridContainer>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={12}
                        style={{ marginTop: '20px' }}
                      >
                        <TextField
                          label="First name"
                          name="firstName"
                          fullWidth
                          value={credentials.firstName}
                          onChange={(e) => handleChange(e)}
                          InputLabelProps={{ shrink: true }}
                        />
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={12}
                        style={{ marginTop: '20px' }}
                      >
                        <TextField
                          label="Last name"
                          name="lastName"
                          fullWidth
                          value={credentials.lastName}
                          onChange={(e) => handleChange(e)}
                          InputLabelProps={{ shrink: true }}
                        />
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={12}
                        style={{ marginTop: '20px' }}
                      >
                        <TextField
                          label="E-mail"
                          name="email"
                          fullWidth
                          value={credentials.email}
                          onChange={(e) => handleChange(e)}
                          InputLabelProps={{ shrink: true }}
                        />
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
                <GridContainer justify={'center'}>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={10}
                    lg={8}
                    style={{ marginTop: '20px' }}
                  >
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          label="New password"
                          name="newPassword"
                          onChange={(e) => handleChange(e)}
                          fullWidth
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          label="Confirm new password"
                          name="confirmNewPassword"
                          onChange={(e) => handleChange(e)}
                          fullWidth
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer justify={'center'}>
                      <Button
                        type="submit"
                        color="primary"
                        style={{ marginTop: '20px' }}
                      >
                        Update
                      </Button>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

Settings.propTypes = {
  userData: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  changeUserData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.user.details.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeUserData: (x) => dispatch(changeUserData(x)),
    setMessage: (x) => dispatch(setMessage(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
