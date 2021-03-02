import React from 'react';
import Card from '@components/UploadFile/Card';
import CardHeader from '@components/UploadFile/CardHeader';
import Upload from './Upload';

export default function index() {
  return (
    <Card>
      <CardHeader color="primary">
        <p>Upload</p>
      </CardHeader>
      <Upload />
    </Card>
  );
}
