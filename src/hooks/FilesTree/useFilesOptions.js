import React, { useState } from 'react';
import CustomTabs from '@components/FilesTree/CustomTabs';
import FilesCreate from '@components/FilesTree/CreateFolder';
import FilesUploadSingleFile from '@components/FilesTree/FilesUpload';
import FilesRename from '@components/FilesTree/FilesRename';
import FilesMove from '@components/FilesTree/FilesMove';
import FilesDeleteToTrash from '@components/FilesTree/FilesDelete';
import { Grid } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Publish from '@material-ui/icons/Publish';
import TextFields from '@material-ui/icons/TextFields';
import AssignmentReturn from '@material-ui/icons/AssignmentReturn';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
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
            tabIcon: Add,
            tabType: ['all'],
            tabContent: <FilesCreate />,
          },
          {
            tabName: 'Upload',
            tabIcon: Publish,
            tabType: ['all'],
            tabContent: <FilesUploadSingleFile />,
          },

          {
            tabName: 'Move',
            tabIcon: AssignmentReturn,
            tabType: ['checkMany', 'checkOne'],
            tabContent: <FilesMove />,
          },
          {
            tabName: 'Delete',
            tabIcon: DeleteOutline,
            tabType: ['checkMany', 'checkOne'],
            tabContent: <FilesDeleteToTrash />,
          },
          {
            tabName: 'Rename',
            tabIcon: TextFields,
            tabType: ['checkOne'],
            tabContent: <FilesRename />,
          },
        ]}
        number={number}
      />
    </Grid>,
  ];
};

export default useButtonFiles;
