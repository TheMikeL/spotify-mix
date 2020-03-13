import React from 'react';

const TrackRow = (props: any) => {
  const { trackObject, addSong } = props;
  // Could use of e.target.elements.track.URI
  const addSongToPlaylist = (uri: string) => {
    addSong(uri);
  };
  return (
    <table className="search__results" key={trackObject.id}>
      <tbody>
        <tr>
          <td>
            <img alt="poster" className="album__art" src={trackObject.album.images[0].url} />
          </td>
          <td className="col-sm-11 track__align">
            <p className="track track__title">{trackObject.name}</p>
            <p className="track track__artist">{trackObject.artists[0].name}</p>
          </td>
          <td className="col-sm-1">
            <button type="button" className="button__add" onClick={() => { addSongToPlaylist(trackObject.uri); }}> + </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TrackRow;
