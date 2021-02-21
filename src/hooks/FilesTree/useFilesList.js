import React from 'react';
import { useState } from 'react';
import Table from '@components/FilesTree/Table.js';

const useFilesList = () => {
  const [trashList, setTrashList] = useState({
    tableData: {},
    tableHead: [],
  });

  const download = (e) => {
    let data = e.trashData.map((el) => {
      return { id: el.id, name: el.name, date: el.date, type: el.type };
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

export default useFilesList;
