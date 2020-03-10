import React from 'react';

const PlayListRow = (props: any) => {
  const { track, isCurrentSong } = props;
  return (
    <table className="playlist__search--results">
      <tbody>
        <tr>
          <td className="wrap__art">
            <img alt="poster" className="album__art" src={track.album.images[0].url} />
          </td>
          <td>
            <p className={isCurrentSong ? 'current-song current-song__title' : 'track track__title'}>{track.name}</p>
            <p className={isCurrentSong ? 'current-song current-song__artist' : 'track track__artist'}>{track.artists[0].name}</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PlayListRow;
