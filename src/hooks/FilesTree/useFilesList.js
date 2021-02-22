import React from 'react';
import { useState } from 'react';
import Table from '@components/FilesTree/Table.js';
import GridContainer from '@components/Grid/GridContainer.js';
import GridItem from '@components/Grid/GridItem.js';

const useFilesList = () => {
  const [fileList, setFileList] = useState({
    tableData: {},
    tableHead: [],
  });

  const handleFiles = (e) => {
    let data = e.trashData.map((el) => {
      return { id: el.id, name: el.name, date: el.date, type: el.type };
    });

    setFileList((fileList) => ({
      ...fileList,
      tableHead: e.param,
    }));
    setFileList((fileList) => ({
      ...fileList,
      tableData: data,
    }));
  };

  return [
    (e) => handleFiles(e),
    fileList.tableData.length > 0 ? (
      <Table
        tableHeaderColor="primary"
        tableHead={fileList.tableHead}
        tableData={fileList.tableData}
      ></Table>
    ) : (
      <GridContainer style={{ textAlign: 'center' }}>
        <GridItem xs={12} sm={12} md={12}>
          <p>There are no files in this directory.</p>
        </GridItem>
      </GridContainer>
    ),
  ];
};

export default useFilesList;
