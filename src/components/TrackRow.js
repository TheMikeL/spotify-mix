import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class TrackRow extends React.Component{
    //potential use of e.target.elements.track.URI
    addSongToPlaylist(uri){
      this.props.addSong(uri);
    }
    render(){
        return <table className="search-results" key={this.props.trackObject.id}>
        <tbody>
          <tr>
            <td>
              <img alt="poster" className = "album-art" src={this.props.trackObject.album.images[0].url}/>
            </td>
            <td className = "col-sm-11 track-align">
              <p className = "track track-title">{this.props.trackObject.name}</p>
              <p className = "track track-artist">{this.props.trackObject.artists[0].name}</p>              
            </td>
            <td className="col-sm-1">
              <button className = "add-button" onClick={() => {this.addSongToPlaylist(this.props.trackObject.uri) }} > + </button>
            </td>
          </tr>
        </tbody>
      </table>
    }
}

export default TrackRow

// /$.ajax({
//   dataType: 'text',
//   type: 'POST',
//   url: `https://api.spotify.com/v1/users/22j362ix734nbwqdoqjnl3rri/playlists/6RxCC9aUbbPzrsbMKO3k7o?si=RWOe74coSquONZj3J6jubQ/tracks?uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh`,
//   headers: {
//     Authorization: "Bearer " + "BQDRe5qm8EExYg_Dnd6FoB3_YO2OZwVtIHF7xcoyHOXnN1mxO0ZF3GkqiEe0nKpNF6w5Br9OpCMIu2yXbQMKvTUcQdl5dY1xt1DlktksKv7QGN5EIHZDULwS7Raw5QrUQAxyu86WEhRDPha6i7_YDWFUVoGPDCwOQcnRBdlOLCnLiDRlSAUrfH8ZwsapwrCvsomXN-s-lEj2-WTFCTbl3TBoo2rw43vaatZA6HP-J5BvM9Kk",
//   },success: function (response) {
//     alert(response);
//   }

// });        spotifyWebAPI.addTracksToPlaylist("22j362ix734nbwqdoqjnl3rri","6RxCC9aUbbPzrsbMKO3k7o?si=RWOe74coSquONZj3J6jubQ",{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"]});


//   fetch(`https://api.spotify.com/v1/users/22j362ix734nbwqdoqjnl3rri/playlists/6RxCC9aUbbPzrsbMKO3k7o?si=RWOe74coSquONZj3J6jubQ/tracks?`, {
//     contentType: 'application/json',
//     type: 'PUT',
//     headers: {
//         Authorization: `Bearer BQDRe5qm8EExYg_Dnd6FoB3_YO2OZwVtIHF7xcoyHOXnN1mxO0ZF3GkqiEe0nKpNF6w5Br9OpCMIu2yXbQMKvTUcQdl5dY1xt1DlktksKv7QGN5EIHZDULwS7Raw5QrUQAxyu86WEhRDPha6i7_YDWFUVoGPDCwOQcnRBdlOLCnLiDRlSAUrfH8ZwsapwrCvsomXN-s-lEj2-WTFCTbl3TBoo2rw43vaatZA6HP-J5BvM9Kk` 
//     },
//     body: {
//       "uris": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh"
//     } 
//   })  
// }
