import React, { useState, useEffect, useContext } from 'react';
import PlayListRow from '../components/PlayListRow';
import TrackRow from '../components/TrackRow';
import AuthContext from '../context/auth-context';

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const { auth, spotifyWebAPI } = authContext;
  const [currentSong, setCurrentSong] = useState('');
  const [playList, setPlayList] = useState({});
  const [playListTracks, setPlayListTracks] = useState([]);
  const [trackRows, setTrackRows] = useState<any[]>([]);

  const getCurrentPlaylist = () => {
    const songID = currentSong;
    spotifyWebAPI.getPlaylistTracks('22j362ix734nbwqdoqjnl3rri', '6RxCC9aUbbPzrsbMKO3k7o')
      .then((response: any) => {
        const tracks = response.body.items;
        const currentPlayList = tracks.map((item: any) => {
          if (item.track.id === songID) {
            return <PlayListRow isCurrentSong key={item.track.id} trackObject={item.track} />;
          }
          return <PlayListRow isCurrentSong={false} key={item.track.id} trackObject={item.track} />;
        });
        setPlayListTracks(currentPlayList);
      })
      .catch((error: string) => {
        throw error;
      });
  };

  const getPlayList = () => {
    spotifyWebAPI.getPlaylist('22j362ix734nbwqdoqjnl3rri', '6RxCC9aUbbPzrsbMKO3k7o')
      .then((response:any) => {
        setPlayList(response.body);
      }, (err: string) => {
        console.log('Something went wrong!', err);
      });
  };

  const getCurrentSong = () => {
    spotifyWebAPI.getMyCurrentPlaybackState({
    })
      .then((data: any) => {
        setCurrentSong(data.body.item.id);
      }, (err: string) => {
        console.log('Something went wrong!', err);
      });
  };

  // potential use of e.target.elements.track.URI
  const addSongtoPlaylist = (trackURI:string) => {
    const newTracks = [];
    newTracks.push(trackURI);
    spotifyWebAPI.addTracksToPlaylist('22j362ix734nbwqdoqjnl3rri', '6RxCC9aUbbPzrsbMKO3k7o', newTracks)
      .then((response: any) => {
        console.log('Success!', response);
      }, (err: string) => {
        console.log('Something went wrong!', err);
      });
  };

  const searchSongs = (searchTerm: string) => {
    spotifyWebAPI.search(searchTerm, ['track', 'artist'])
      .then((response: any) => {
        const tracks = response.body.tracks.items;
        const results = tracks.map((track: any) => (
          <TrackRow key={track.id} track={track} addSong={addSongtoPlaylist} />
        ));
        setTrackRows(results);
      })
      .catch((error: string) => {
        throw error;
      });
  };

  const handleSearchChange = (event: any) => {
    const searchTerm = event.target.value;
    searchSongs(searchTerm);
  };

  useEffect(() => {
    if (auth.loggedIn) {
      getPlayList();
      getCurrentPlaylist();
    }
    getCurrentSong();
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
            <h2 className="playlist__title">{playList.name}</h2>
            <div className="playlist-tracks">{playListTracks}</div>
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
