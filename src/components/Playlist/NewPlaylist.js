import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@components/CustomButtons/Button.js';
import Input from '@material-ui/core/Input';

export default function NewPlaylist({ addPlaylist }) {
  const [playlistName, setPlaylistName] = useState('');

  const handleNewPlaylist = () => {
    addPlaylist({ playlistName: playlistName });
    setPlaylistName('');
  };

  return (
    <>
      <Input
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <Button color="primary" onClick={() => handleNewPlaylist()} round>
        Add playlist
      </Button>
    </>
  );
}

NewPlaylist.propTypes = {
  addPlaylist: PropTypes.func,
};
