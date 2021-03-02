import { useState } from 'react';
import React from 'react';
import Table from '@components/UploadFile/Table.js';
import GridContainer from '@components/Grid/GridContainer.js';
import GridItem from '@components/Grid/GridItem.js';

const useUploadList = () => {
  const [fileList, setFileList] = useState([]);

  const handleFiles = (e) => {
    console.log(e);
    setFileList([...fileList, e]);
  };
  return [
    (e) => handleFiles(e),
    fileList.length > 0 ? (
      <Table tableHeaderColor="primary" tableData={fileList}></Table>
    ) : (
      <GridContainer style={{ textAlign: 'center' }}>
        <GridItem xs={12} sm={12} md={12}>
          <p></p>
        </GridItem>
      </GridContainer>
    ),
  ];
};

export default useUploadList;
