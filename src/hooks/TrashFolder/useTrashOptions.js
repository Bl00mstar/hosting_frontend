import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import CustomTabs from '@components/TrashFolder/CustomTabs';
import TrashDelete from '@components/TrashFolder/TrashDelete';
import TrashRestore from '@components/TrashFolder/TrashRestore';

const useTrashOptions = () => {
  const [number, setNumber] = useState(0);
  const trashOptions = (checked) => {
    setNumber(checked.length);
  };

  return [
    (e) => trashOptions(e),
    <Grid item xs={12} key={''}>
      <CustomTabs
        headerColor="warning"
        tabs={[
          {
            tabName: 'Restore',
            tabContent: <TrashRestore />,
          },
          {
            tabName: 'Delete',
            tabContent: <TrashDelete />,
          },
        ]}
        number={number}
      />
    </Grid>,
  ];
};
export default useTrashOptions;
