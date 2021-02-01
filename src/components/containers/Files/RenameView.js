import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input, Button } from '@material-ui/core';

const RenameView = ({ item }) => {
  const { register, handleSubmit } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });
  const [name, setName] = useState('');
  useEffect(() => {
    if (item.type === 'file') {
      setName(item.item.name);
    } else if (item.type === 'folder') {
      setName(item.item.split('/')[0]);
    }
  }, [item]);

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          value={name}
          name="changeText"
          onChange={(e) => setName(e.target.value)}
          ref={register({
            required: true,
          })}
        />
        <Button variant="outlined">Change</Button>
      </form>
      {/* <Input value={name} onChange={(e) => setName(e.target.value)}></Input> */}
    </>
  );
};

RenameView.propTypes = {
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.file.items.selected,
});

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RenameView);

// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// import {
//   createNewFolder,
//   getUserFiles,
//   clearFolderAlerts,
// } from '@store/files/file.actions';
// import { useStyles } from '@styles/DashboardStyle';

// const CreateFolder = ({
//   path,
//   createFolder,
//   getFiles,
//   clearAlerts,
//   success,
//   error,
// }) => {
//   const classes = useStyles();
//   const [showAlerts, setShowAlerts] = useState(false);

//   useEffect(() => {
//     if (error || success) {
//       console.log(error);
//       setShowAlerts(true);
//       setTimeout(() => {
//         clearAlerts();
//         setShowAlerts(false);
//       }, 3000);
//     }
//   }, [error, clearAlerts, success]);

//   return (
//     <div className={classes.demo}>

//       <div>
//         <br />
//       </div>
//       {showAlerts ? (
//         <div>
//           {error && <div>{error}</div>}
//           {success && <div>{success}</div>}
//         </div>
//       ) : (
//         <></>
//       )}
//     </div>
