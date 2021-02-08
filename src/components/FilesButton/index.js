import React from 'react';
// import PropTypes from 'prop-types';

const FilesButton = () => {
  const buttons = [
    { name: 'Create file', value: 'newfile', type: 'component' },
    { name: 'Upload file', value: 'upload', type: 'component' },
    { name: 'Rename', value: 'rename', type: 'component' },
    { name: 'Move', value: 'move', type: 'component' },
    { name: 'Delete', value: 'delete', type: 'function' },
  ];

  const Buttons = buttons.map(({ name, value }, idx) => {
    return (
      <button value={value} key={idx}>
        {name}
      </button>
    );
  });

  return <div>{Buttons}</div>;
};

// FilesButton.propTypes = {
//   buttons: PropTypes.array.isRequired,
// };

export default FilesButton;

// import React from 'react';
// import FilesButton from '@components/FilesButton';

// const useButtonFiles = () => {
//   const [path, setPath] = useState(() => []);

//   const buttonFiles = (value) => {
//     let pathArray = value.replace(/\//g, '/ ').split(' ');
//     pathArray.pop();
//     setPath(pathArray);
//   };

//   return [
//     (e) => buttonFiles(e),
//     buttonValues.length > 0 ? <FilesButton buttons={buttonValues} /> : null,
//   ];
// };

// export default useButtonFiles;
// // const [buttonFiles, buttonComponentUI] = useButtonFiles();
// // const updateButton = (values) => buttonFiles(values);

// useEffect(() => {
//   updateButton(buttonValues);
// }, []);
