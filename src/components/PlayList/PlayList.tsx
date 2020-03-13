import React, { useState, useEffect, useContext } from 'react';
import PlayListRow from './PlayListRow';
import AuthContext from '../../context/auth-context';

const PlayList = (props: {currentSong: string}) => {
  const { currentSong } = props;
  const authContext = useContext(AuthContext);
  const { auth, spotifyWebAPI } = authContext;
  const [playList, setPlayList] = useState({});
  const [playListTracks, setPlayListTracks] = useState([]);

  const getCurrentPlaylist = () => {
    spotifyWebAPI.getPlaylistTracks('22j362ix734nbwqdoqjnl3rri', '6RxCC9aUbbPzrsbMKO3k7o')
      .then((response: any) => {
        const tracks = response.body.items;
        const currentPlayList = tracks.map((item: any) => {
          if (item.track.id === currentSong) {
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

  useEffect(() => {
    if (auth.loggedIn) {
      getPlayList();
      getCurrentPlaylist();
    }
  }, []);

  return (
    <>
      <h2 className="playlist__title">{playList.name}</h2>
      <div className="playlist__tracks">{playListTracks}</div>
    </>
  );
};

export default PlayList;
