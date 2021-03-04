import React from 'react';

const VideoPlayer = () => {
  const showVideo = () => {
    return (
      <video width="1020" controls controlsList="nodownload">
        <source
          // src={`${LiveURL}/watch/movie/${vid}`}
          src={`http://192.168.55.100:9000/stream/movie/1`}
          onContextMenu="return false;"
          onCanPlay={true}
          //   type="video/x-matroska;"
        />
      </video>
    );
  };

  return (
    <div>
      <div width="200" hight="400">
        {/* Here {videos.length} */}
      </div>
      {showVideo()}
    </div>
  );
};

export default VideoPlayer;
