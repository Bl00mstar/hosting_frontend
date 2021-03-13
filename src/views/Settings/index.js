import React from 'react';
// @material-ui/core components
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from '@components/Grid/GridItem.js';
import GridContainer from '@components/Grid/GridContainer.js';
import CustomInput from '@components/CustomInput/CustomInput.js';
import Button from '@components/CustomButtons/Button.js';
import Card from '@components/Card/Card.js';
import CardHeader from '@components/Card/CardHeader.js';
// import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from '@components/Card/CardBody.js';
import CardFooter from '@components/Card/CardFooter.js';
// import { Input } from '@material-ui/core';

// import avatar from 'assets/img/faces/marc.jpg';

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

const Settings = ({ userData }) => {
  console.log(userData);
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
              <GridContainer>
                <GridItem xs={12} sm={12} md={2}></GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="First name"
                    id="firstName"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: userData.firstName,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}></GridItem>
                <GridItem xs={12} sm={12} md={2}></GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="Last name"
                    id="lastName"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: userData.lastName,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}></GridItem>
                <GridItem xs={12} sm={12} md={2}></GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="E-mail"
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: userData.email,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}></GridItem>
                <GridItem xs={12} sm={12} md={2}></GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="New password"
                    id="newPassword"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: '',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Confirm new password"
                    id="confirmNewPassword"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: '',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}></GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

Settings.propTypes = {
  userData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userData: state.user.details.user,
});

const mapDispatchToProps = () => {
  return {
    // getFiles: (x) => dispatch(getUserFiles(x)),
    // selected: (x) => dispatch(handleSelected(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
