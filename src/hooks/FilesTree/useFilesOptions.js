import React, { useState } from 'react';
import CustomTabs from '@components/FilesTree/CustomTabs';
import FilesCreate from '@components/FilesTree/FilesCreate';
import FilesUploadSingleFile from '@components/FilesTree/FilesUploadSingleFile';
import FilesRename from '@components/FilesTree/FilesRename';
import FilesMove from '@components/FilesTree/FilesMove';
import FilesDeleteToTrash from '@components/FilesTree/FilesDeleteToTrash';
import { Grid } from '@material-ui/core';
import { BugReport, Code, Cloud } from '@material-ui/icons';

const useButtonFiles = () => {
  const [number, setNumber] = useState(0);

  const filesOptions = (checked) => {
    setNumber(checked.length);
  };

  return [
    (e) => filesOptions(e),
    <Grid item xs={12} key={''}>
      <CustomTabs
        headerColor="warning"
        tabs={[
          {
            tabName: 'Create',
            tabIcon: BugReport,
            tabType: ['all'],
            tabContent: <FilesCreate />,
          },
          {
            tabName: 'Upload',
            tabIcon: Code,
            tabType: ['all'],
            tabContent: <FilesUploadSingleFile />,
          },
          {
            tabName: 'Rename',
            tabIcon: Cloud,
            tabType: ['checkOne'],
            tabContent: <FilesRename />,
          },
          {
            tabName: 'Move',
            tabIcon: Cloud,
            tabType: ['checkMany', 'checkOne'],
            tabContent: <FilesMove />,
          },
          {
            tabName: 'Delete',
            tabIcon: Cloud,
            tabType: ['checkMany', 'checkOne'],
            tabContent: <FilesDeleteToTrash />,
          },
        ]}
        number={number}
      />
    </Grid>,
  ];
};

export default useButtonFiles;

// const tabs = [
//   {
//     tabName: 'Create',
//     tabIcon: BugReport,
//     tabType: ['all'],
//     tabContent: <FilesCreate />,
//   },
//   {
//     tabName: 'Upload',
//     tabIcon: Code,
//     tabType: ['all'],
//     tabContent: <FilesUploadSingleFile />,
//   },
//   {
//     tabName: 'Rename',
//     tabIcon: Cloud,
//     tabType: ['checkOne'],
//     tabContent: <FilesRename />,
//   },
//   {
//     tabName: 'Move',
//     tabIcon: Cloud,
//     tabType: ['checkMany', 'checkOne'],
//     tabContent: <FilesMove />,
//   },
//   {
//     tabName: 'Delete',
//     tabIcon: Cloud,
//     tabType: ['checkMany', 'checkOne'],
//     tabContent: <FilesDeleteToTrash />,
//   },
// ];
