import React from 'react';
import Upload from '../../views/UploadFile/Upload';

export default function FilesUpload() {
  return (
    <div>
      <Upload
        maxFiles={1}
        dropzoneLabel={'Choose file and upload to current path.'}
      />
    </div>
  );
}
