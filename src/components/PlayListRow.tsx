import React from 'react';

const PlayListRow = (props: any) => {
  const { trackObject, isCurrentSong } = props;
  return (
    <table className="playlist__search--results">
      <tbody>
        <tr>
          <td className="wrap__art">
            <img alt="poster" className="album__art" src={trackObject.album.images[0].url} />
          </td>
          <td>
            <p className={isCurrentSong ? 'current-song current-song__title' : 'track track__title'}>{trackObject.name}</p>
            <p className={isCurrentSong ? 'current-song current-song__artist' : 'track track__artist'}>{trackObject.artists[0].name}</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PlayListRow;
