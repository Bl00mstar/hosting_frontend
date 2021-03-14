import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GridItem from '@components/Grid/GridItem.js';
import GridContainer from '@components/Grid/GridContainer.js';

import Card from '@components/Card/Card.js';
import CardHeader from '@components/Card/CardHeader.js';
import CardBody from '@components/Card/CardBody.js';

// import styles from '@assets/jss/material-dashboard-react/views/dashboardStyle.js';

// const useStyles = makeStyles(styles);
const Home = ({ isAuthenticated }) => {
  // const classes = useStyles();
  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate('/user/dashboard');
  }
  return (
    <>
      <GridContainer
        direction="row-reverse"
        style={{
          height: '400px',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <GridItem
          xs={12}
          sm={12}
          md={5}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <svg
            id="e7518008-444d-481c-8895-28f7a8311917"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: '250px',
              height: '350px',
            }}
            viewBox="0 0 1000 800"
          >
            <polygon
              points="100.636 576.086 112.895 576.086 118.728 528.798 100.633 528.799 100.636 576.086"
              fill="#ffb8b8"
            />
            <path
              d="M314.57536,726.37911l24.1438-.001h.001a15.38605,15.38605,0,0,1,15.38648,15.38623v.5l-39.53052.00147Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#2f2e41"
            />
            <polygon
              points="50.636 576.086 62.895 576.086 68.728 528.798 50.633 528.799 50.636 576.086"
              fill="#ffb8b8"
            />
            <path
              d="M264.57536,726.37911l24.1438-.001h.001a15.38605,15.38605,0,0,1,15.38648,15.38623v.5l-39.53052.00147Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#2f2e41"
            />
            <path
              d="M270.06093,710.07857a4.50466,4.50466,0,0,1-4.48437-4.22754L254.70864,528.12447l73.13794,7.8916,10.7854,159.3125a4.51612,4.51612,0,0,1-3.58179,4.71191l-14.51147,2.98926a4.50035,4.50035,0,0,1-5.33472-3.59961l-17.731-97.19922a.46935.46935,0,0,0-.5105-.40918.47985.47985,0,0,0-.47851.44727L285.89809,702.59517a4.49323,4.49323,0,0,1-3.16577,3.833l-11.35449,3.4541A4.52613,4.52613,0,0,1,270.06093,710.07857Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#2f2e41"
            />
            <circle cx="54.38035" cy="218.4236" r="24.56103" fill="#ffb8b8" />
            <path
              d="M254.08559,539.13521l-16.59106-89.17187a37.7432,37.7432,0,0,1,26.60107-43.26221h0A37.85747,37.85747,0,0,1,312.101,437.10054l15.85816,99.85108Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#4caf50"
            />
            <path
              d="M264.66678,554.81758a10.05577,10.05577,0,0,1-1.747-15.32l-16.39619-31.75128,18.46486,1.97048,12.73924,29.84946a10.11027,10.11027,0,0,1-13.06089,15.25138Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#ffb8b8"
            />
            <path
              d="M260.10538,533.92128a4.505,4.505,0,0,1-3.19513-1.80386L237.3582,505.6851a46.37346,46.37346,0,0,1-8.9377-31.39684l3.041-36.91225a14.49652,14.49652,0,1,1,28.727-3.91856l-1.7786,58.71981,12.53746,29.71816a4.51468,4.51468,0,0,1-1.09178,5.05417l-6.27324,5.79662a4.50563,4.50563,0,0,1-2.4265,1.15083A4.45452,4.45452,0,0,1,260.10538,533.92128Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#4caf50"
            />
            <path
              d="M412.88665,359.33709a10.05581,10.05581,0,0,1-13.42647,7.58193l-22.84575,27.47819-5.38477-17.77183,22.52026-23.36914a10.11027,10.11027,0,0,1,19.13673,6.08085Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#ffb8b8"
            />
            <path
              d="M395.42253,371.68481a4.50493,4.50493,0,0,1-.41535,3.64558l-16.71727,28.31048a46.37349,46.37349,0,0,1-25.42736,20.47176l-35.17668,11.59152A14.49652,14.49652,0,1,1,302.877,410.77842l54.76621-21.25658,22.478-23.13213a4.51471,4.51471,0,0,1,5.07987-.96522l7.78376,3.51672a4.50564,4.50564,0,0,1,2.00584,1.78578A4.45435,4.45435,0,0,1,395.42253,371.68481Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#4caf50"
            />
            <polygon
              points="34.459 303.589 35.459 335.589 53.88 367.6 38.498 331.926 34.459 303.589"
              opacity="0.1"
            />
            <path
              d="M274.26126,377.33461a6.4229,6.4229,0,0,0,7.03053-4.70223,9.76432,9.76432,0,0,1,6.95075-7.2736c4.5055-1.0295,10.01214,1.09128,13.31351-2.32232a6.6375,6.6375,0,0,0,1.57539-5.84234c-.60807-3.31718-2.981-5.8232-5.56326-7.82751a34.06232,34.06232,0,0,0-18.86609-7.05066,67.6767,67.6767,0,0,0-10.62085.52837,47.0089,47.0089,0,0,0-10.86368,1.98538,25.57605,25.57605,0,0,0-16.00171,18.68024,29.528,29.528,0,0,0,6.05709,24.13034,31.70212,31.70212,0,0,0,12.1606,9.25871,4.74417,4.74417,0,0,0,3.6062.18291c2.95734-1.17582,2.47409-4.83917,1.12569-7.28252-1.443-2.61478-3.66335-5.14641-2.50287-8.32859a6.302,6.302,0,0,1,3.12714-3.3662c2.93992-1.49928,6.22821-1.14456,9.38876-.77957Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#2f2e41"
            />
            <path
              d="M965.93307,718.29528h-437a17.01917,17.01917,0,0,1-17-17v-530a17.01916,17.01916,0,0,1,17-17h437a17.01916,17.01916,0,0,1,17,17v530A17.01917,17.01917,0,0,1,965.93307,718.29528Zm-437-562a15.017,15.017,0,0,0-15,15v530a15.017,15.017,0,0,0,15,15h437a15.017,15.017,0,0,0,15-15v-530a15.017,15.017,0,0,0-15-15Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#3f3d56"
            />
            <rect
              x="295.86614"
              y="41.59033"
              width="469"
              height="2"
              fill="#3f3d56"
            />
            <circle cx="318.86614" cy="22" r="8" fill="#4caf50" />
            <circle cx="343.86614" cy="22" r="8" fill="#4caf50" />
            <circle cx="368.86614" cy="22" r="8" fill="#4caf50" />
            <path
              d="M898.19291,269.29528h-312a13,13,0,0,1,0-26h312a13,13,0,0,1,0,26Zm-312-24a11,11,0,0,0,0,22h312a11,11,0,0,0,0-22Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#3f3d56"
            />
            <path
              d="M893.22852,417.20459h-304a16.51867,16.51867,0,0,1-16.5-16.5v-65a16.51867,16.51867,0,0,1,16.5-16.5h304a16.519,16.519,0,0,1,16.5,16.5v65A16.519,16.519,0,0,1,893.22852,417.20459Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#e6e6e6"
            />
            <path
              d="M893.22852,543.20508h-304a16.519,16.519,0,0,1-16.5-16.5v-65a16.51877,16.51877,0,0,1,16.5-16.50049h304a16.51909,16.51909,0,0,1,16.5,16.50049v65A16.51931,16.51931,0,0,1,893.22852,543.20508Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#e6e6e6"
            />
            <path
              d="M893.22852,669.20508h-304a16.519,16.519,0,0,1-16.5-16.5v-65a16.519,16.519,0,0,1,16.5-16.5h304a16.5193,16.5193,0,0,1,16.5,16.5v65A16.51931,16.51931,0,0,1,893.22852,669.20508Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#e6e6e6"
            />
            <path
              d="M719.22852,409.20459h-304a16.51867,16.51867,0,0,1-16.5-16.5v-65a16.51867,16.51867,0,0,1,16.5-16.5h304a16.519,16.519,0,0,1,16.5,16.5v65A16.519,16.519,0,0,1,719.22852,409.20459Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#fff"
            />
            <path
              d="M719.22835,409.70472h-304a17.01916,17.01916,0,0,1-17-17v-65a17.01917,17.01917,0,0,1,17-17h304a17.01917,17.01917,0,0,1,17,17v65A17.01916,17.01916,0,0,1,719.22835,409.70472Zm-304-97a15.017,15.017,0,0,0-15,15v65a15.017,15.017,0,0,0,15,15h304a15.017,15.017,0,0,0,15-15v-65a15.017,15.017,0,0,0-15-15Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#3f3d56"
            />
            <path
              d="M682.22835,393.20472h-230a16.51866,16.51866,0,0,1-16.5-16.5v-34a16.51867,16.51867,0,0,1,16.5-16.5h230a16.51868,16.51868,0,0,1,16.5,16.5v34A16.51867,16.51867,0,0,1,682.22835,393.20472Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#f2f2f2"
            />
            <circle cx="284.65637" cy="200.85151" r="19.73228" fill="#4caf50" />
            <path
              d="M667.93535,391.21339l-27.85254-23.35968-27.37158-22.95636a4.00031,4.00031,0,0,0-5.15283.01L580.2752,367.969l-6.66407,5.6333-10.04834-8.42737L533.02568,339.564a3.99964,3.99964,0,0,0-5.15234.00989l-30.438,25.72833-30.917,26.13348a1,1,0,0,0,.64746,1.76374l63.38672-.12214,20.064-.03863-.19629.166,59.80761-.11523,57.0669-.10992A.99989.99989,0,0,0,667.93535,391.21339Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#3f3d56"
            />
            <path
              d="M410.06693,743.70472h-192a1,1,0,1,1,0-2h192a1,1,0,0,1,0,2Z"
              transform="translate(-217.06693 -154.29528)"
              fill="#3f3d56"
            />
          </svg>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <h1
            style={{
              fontFamily: 'open sans',
              fontWeight: '300',
              fontSize: '3em',
              lineHeight: '1em',
            }}
          >
            Upload, share and manage your files.
          </h1>
        </GridItem>
      </GridContainer>
      <GridContainer
        style={{
          height: '500px',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: '#F8F8FF',
          borderBottom: '1px solid #F5F5F5',
          borderTop: '1px solid #F5F5F5',
        }}
      >
        <GridItem xs={12} sm={12} md={3}></GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <h2
            style={{
              fontWeight: '400',
              fontSize: '2.35714286em',
              lineHeight: '1.36363636em',
              fontFamily: 'Open Sans',
            }}
          >
            Store and manage all your files!
          </h2>
          <p
            style={{
              fontWeight: '400',
              fontSize: '1.3em',
              lineHeight: '1.36363636em',
              fontFamily: 'Open Sans',
            }}
          >
            Upload multiple files at once and keep them forever on this site.
            You can simply drag & drop your files to begin uploading.
          </p>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}></GridItem>
      </GridContainer>
      <GridContainer
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <GridItem xs={12} sm={12} md={4}>
          <Card style={{ height: '300px' }}>
            <CardHeader>
              <h3
                style={{
                  fontWeight: '300',
                  fontSize: '1.75em',
                  lineHeight: '1.60em',
                  color: '#252525',
                }}
              >
                Fast and instant downloading!
              </h3>
            </CardHeader>
            <CardBody>
              <p
                style={{
                  fontWeight: '400',
                  fontSize: '1.35em',
                  lineHeight: '1.60em',
                  color: '#808080',
                }}
              >
                Our premium members benefit from no waiting time and direct
                downloads for all of their files. Unlike other file hosts we
                dont limit the transfer speed of our downloads.
              </p>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card style={{ height: '300px' }}>
            <CardHeader>
              <h3
                style={{
                  fontWeight: '300',
                  fontSize: '1.75em',
                  lineHeight: '1.60em',
                  color: '#252525',
                }}
              >
                Safe and Secure
              </h3>
            </CardHeader>
            <CardBody>
              <p
                style={{
                  fontWeight: '400',
                  fontSize: '1.35em',
                  lineHeight: '1.60em',
                  color: '#808080',
                }}
              >
                Safely store and backup all your essential files. From family
                photos & videos to important documents, you can rely on us to
                store all your media securely and forever.
              </p>
            </CardBody>
          </Card>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={1}></GridItem> */}
      </GridContainer>
      <GridContainer
        style={{
          height: '400px',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: '#F8F8FF',
          borderBottom: '1px solid #F5F5F5',
          borderTop: '1px solid #F5F5F5',
        }}
      >
        <GridItem xs={12} sm={12} md={12}>
          <h1
            style={{
              fontFamily: 'open sans',
              fontWeight: '300',
              fontSize: '2em',
              lineHeight: '1em',
            }}
          >
            What are you waiting for?
          </h1>
        </GridItem>
      </GridContainer>
    </>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.details.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
