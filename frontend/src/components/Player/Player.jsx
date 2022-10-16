/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

function Player({ src, onEndPlay }) {
  return (
    <audio
      className="player"
      controls
      autoPlay
      onEnded={onEndPlay}
      src={src}
    />
  );
}

export default Player;
