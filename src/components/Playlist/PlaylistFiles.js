import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

const PlaylistFiles = ({ chosenList, file, playFile }) => {
  return (
    <>
      {chosenList.list.name}
      <Table size={'small'}>
        <TableBody style={{ cursor: 'pointer' }}>
          {chosenList.files.map((el, idx) => (
            <TableRow key={idx} hover={true}>
              {file === el.id ? (
                <TableCell style={{ color: 'red' }}>{el.name}</TableCell>
              ) : (
                <TableCell onClick={() => playFile(el.selector)}>
                  {el.name}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

PlaylistFiles.propTypes = {
  chosenList: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired,
  playFile: PropTypes.func.isRequired,
};

export default PlaylistFiles;
