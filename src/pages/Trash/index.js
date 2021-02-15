import React from 'react';
import TrashList from '@components/TrashList';
import TrashAlert from '@components/TrashAlert';
// import useButtonTrash from '@hooks/useButtonTrash';

const Trash = () => {
  // const [trashOptions, trashOptionsComponent] = useButtonTrash();

  // useEffect(() => {
  //   trashOptions();
  // }, [trashOptions]);

  return (
    <>
      <TrashAlert />
      {/* {trashOptionsComponent} */}
      <TrashList />
    </>
  );
};

export default Trash;
