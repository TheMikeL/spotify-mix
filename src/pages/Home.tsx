import React, { useState, useEffect, useContext } from 'react';
import PlayList from '../components/PlayList/PlayList';
import AuthContext from '../context/auth-context';
import Tracks from '../components/SpotifyTracks/Tracks';

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const [currentSong, setCurrentSong] = useState<string>('');
  const { auth, spotifyWebAPI } = authContext;

  const getCurrentTrack = () => {
    spotifyWebAPI.getMyCurrentPlaybackState({
    })
      .then((data: any) => {
        setCurrentSong(data.body.item.id);
      }, (err: string) => {
        console.log('Something went wrong!', err);
      });
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
            <Tracks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
