import React, { useState, useEffect, useContext } from 'react';
import { useDebounce } from 'use-lodash-debounce';
import TrackRow from '../components/TrackRow';
import PlayList from '../components/PlayList';
import AuthContext from '../context/auth-context';

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const { auth, spotifyWebAPI } = authContext;
  const [currentSong, setCurrentSong] = useState('');
  const [trackRows, setTrackRows] = useState<any[]>([]);

  const getCurrentTrack = () => {
    spotifyWebAPI.getMyCurrentPlaybackState({
    })
      .then((data: any) => {
        setCurrentSong(data.body.item.id);
      }, (err: string) => {
        console.log('Something went wrong!', err);
      });
  };

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

  useEffect(() => {
    getCurrentTrack();
  }, []);

  return (
    <div className="App">
      <div className="center-login-button">
        <a href="http://localhost:8888">
          { auth.loggedIn ? null : <button type="button" className="button__primary">Login to Spotify</button> }
        </a>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-4 panel left-panel">
            <PlayList currentSong={currentSong} />
          </div>
          <div className="col-sm-4 panel right-panel">
            <input onChange={handleSearchChange} className="search-bar" placeholder="Search..." />
            {trackRows}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
