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

  const getCurrentPlaylist = () => {
    const songID = currentSong;
    spotifyWebAPI.getPlaylistTracks('22j362ix734nbwqdoqjnl3rri', '6RxCC9aUbbPzrsbMKO3k7o')
      .then((response: any) => {
        const results = response.body.items;
        const playlistTracks: any[] = [];
        let playlistTrack;
        let curr;
        // move loop to actual js file while passing object
        results.forEach((track: any) => {
          if (track.track.id === songID) {
            curr = true;
            playlistTrack = <PlayListRow isCurrentSong={curr} key={track.track.id} trackObject={track.track} />;
          } else {
            curr = false;
            playlistTrack = <PlayListRow isCurrentSong={curr} key={track.track.id} trackObject={track.track} />;
          }
          playlistTracks.push(playlistTrack);
        });
        setPlayListTracks(playListTracks);
      })
      .catch((error: string) => {
      // do whatever you want with the error and then...playListName:listName
        throw error;
      });
  };

  const getPlayListName = () => {
    spotifyWebAPI.getPlaylist('22j362ix734nbwqdoqjnl3rri', '6RxCC9aUbbPzrsbMKO3k7o')
      .then((response:any) => {
        setPlayList(response.body);
        getCurrentPlaylist();
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

  useEffect(() => {
    if (auth.loggedIn) {
      getPlayListName();
    }
    getCurrentSong();
  }, []);


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
        const results = response.body.tracks.items;
        const trackRows: any[] = [];
        results.forEach((track: any) => {
          const trackRow = <TrackRow key={track.id} trackObject={track} addSong={addSongtoPlaylist} />;
          trackRows.push(trackRow);
        });
        this.setState({ rows: trackRows });
      })
      .catch((error: string) => {
      // do whatever you want with the error and then...
        throw error;
      });
  };

  const handleSearchChange = (event: any) => {
    const searchTerm = event.target.value;
    searchSongs(searchTerm);
  };

  

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
            {this.state.rows}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;