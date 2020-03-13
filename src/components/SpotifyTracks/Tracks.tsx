import React, { useState, useContext } from 'react';
import { useDebounce } from 'use-lodash-debounce';
import AuthContext from '../../context/auth-context';
import TrackRow from './TrackRow';

const Tracks = () => {
  const authContext = useContext(AuthContext);
  const [trackRows, setTrackRows] = useState<any[]>([]);
  const { spotifyWebAPI } = authContext;

  // potential use of e.target.elements.track.URI
  const addTracktoPlaylist = (trackURI:string) => {
    const newTracks = [];
    newTracks.push(trackURI);
    spotifyWebAPI.addTracksToPlaylist('22j362ix734nbwqdoqjnl3rri', '6RxCC9aUbbPzrsbMKO3k7o', newTracks)
      .then((response: any) => {
        console.log('Success!', response);
      }, (err: string) => {
        console.log('Something went wrong!', err);
      });
  };

  const searchTracks = (searchTerm: string) => {
    spotifyWebAPI.search(searchTerm, ['track', 'artist'])
      .then((response: any) => {
        const tracks = response.body.tracks.items;
        const results = tracks.map((track: any) => (
          <TrackRow key={track.id} track={track} addSong={addTracktoPlaylist} />
        ));
        setTrackRows(results);
      })
      .catch((error: string) => {
        throw error;
      });
  };

  const handleSearchChange = (event: any) => {
    const searchTerm = useDebounce(event.target.value, 500);
    searchTracks(searchTerm);
  };

  return (
    <>
      <input onChange={handleSearchChange} className="search-bar" placeholder="Search..." />
      {trackRows}
    </>
  );
};

export default Tracks;
