import React from 'react';

interface IAuthContext {
  auth:{
    loggedIn: boolean,
    accessToken: string,
  },
  spotifyWebAPI: {},
}

export default React.createContext<IAuthContext>({
  auth: { loggedIn: false, accessToken: '' },
  spotifyWebAPI: {},
});
