import React, { useEffect, useState } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-node';
import HomePage from './pages/Home';
import AuthContext from './context/auth-context';

const { CLIENT_ID, CLIENT_SECRET } = process.env;

const spotifyWebAPI = new Spotify({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: 'http://localhost:8888/callback/',
});

interface IUserAuthState {
  loggedIn: boolean,
  accessToken: string,
}

const getHashParams = () => {
  const hashParams = {};
  let e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

const App: React.FC = () => {
  const [auth, setAuth] = useState<IUserAuthState>({
    loggedIn: false,
    accessToken: '',
  });
  const { loggedIn } = auth;
  const defaultValues = {
    auth,
    spotifyWebAPI,
  };

  useEffect(() => {
    const params = getHashParams();
    const ACCESS_TOKEN = params.access_token;
    if (ACCESS_TOKEN) {
      setAuth({ loggedIn: true, accessToken: ACCESS_TOKEN });
    }

    if (loggedIn) {
      spotifyWebAPI.setAccessToken(ACCESS_TOKEN);
    }
  }, []);

  return (
    <AuthContext.Provider value={defaultValues}>
      <HomePage />
    </AuthContext.Provider>
  );
};

export default App;
