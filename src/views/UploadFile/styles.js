const styles = {
  dropTargetStyle: {
    border: '3px dashed #009900',
    padding: 10,
    // backgroundColor: '#fefcea',
    cursor: 'pointer',
  },
  dropTargetActiveStyle: {
    backgroundColor: '#ccffcc',
  },
  placeHolderStyle: {
    paddingLeft: '20%',
    paddingRight: '20%',
    textAlign: 'center',
  },
  uploadButtonStyle: {
    width: '100%',
    marginTop: 10,
    height: 32,
    alignSelf: 'center',
    cursor: 'pointer',
    backgroundColor: '#fefcea',
    border: '1px solid #f2e745',
    fontSize: 14,
  },
  fileset: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  fileDetails: {
    paddingTop: 10,
    display: 'flex',
    alignItems: 'flex-start',
  },
  fileName: {
    marginTop: '3px',
    float: 'left',
    flexGrow: '2',
  },
  removeButton: {
    marginRight: 20,
  },
};

export default styles;
