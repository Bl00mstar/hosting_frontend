import React from 'react';
import { useState } from 'react';
import Table from '@components/Table/Table.js';

const useTrashList = () => {
  const [trashList, setTrashList] = useState({
    tableData: [],
    tableHead: [],
  });

  const download = (e) => {
    let data = e.trashData.map((el) => {
      return [el.name, el.date];
    });

    setTrashList((trashList) => ({
      ...trashList,
      tableHead: e.param,
    }));
    setTrashList((trashList) => ({
      ...trashList,
      tableData: data,
    }));
    console.log(e);
  };

  return [
    (e) => download(e),
    trashList.tableData.length > 0 && (
      <Table
        tableHeaderColor="primary"
        tableHead={trashList.tableHead}
        tableData={trashList.tableData}
      ></Table>
    ),
  ];
};

export default useTrashList;

// const [filesOptions, filesOptionsComponent] = useButtonFiles();

// useEffect(() => {
//   filesOptions(checked);
// }, [checked, filesOptions]);

// useEffect(() => {
//   getFiles({ path: path, filters: filters });
//   // eslint-disable-next-line
// // }, [path, filters]);
// import React, { useState } from 'react';
// import FilesButton from '@components/FilesButton';
// import FilesCreate from '@components/FilesCreate';
// import FilesUploadSingleFile from '@components/FilesUploadSingleFile';
// import FilesRename from '@components/FilesRename';
// import FilesMove from '@components/FilesMove';
// import FilesDeleteToTrash from '@components/FilesDeleteToTrash';
// import { Grid } from '@material-ui/core';

// const useButtonFiles = () => {
//   const [number, setNumber] = useState(0);

//   const filesOptions = (checked) => {
//     setNumber(checked.length);
//   };

//   return [
//     (e) => filesOptions(e),
//     <Grid item xs={12} key={''}>
//       <FilesButton buttons={buttons} number={number} />
//     </Grid>,
//   ];
// };

// export default useButtonFiles;

// const buttons = [
//   {
//     name: 'Create',
//     value: 'newfile',
//     type: ['all'],
//     element: <FilesCreate />,
//   },
