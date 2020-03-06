import React, { Component } from 'react';
import './App.css';
import Spotify from "spotify-web-api-node";
import TrackRow from './TrackRow.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PlayListRow from './PlayListRow.js';
// import $ from 'jquery';

const spotifyWebAPI = new Spotify({
  clientId: '65acbcaaa60f4757b0dfcf39305f4239',
  clientSecret: 'e722cc9708d343d8b264856949ce61c0',
  redirectUri: 'http://localhost:8888/callback/'
});

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const ACCESS_TOKEN = params.access_token;


    this.state = {
      loggedIn: ACCESS_TOKEN ? true : false
    } 
    if (ACCESS_TOKEN){
      spotifyWebAPI.setAccessToken(ACCESS_TOKEN);
    }
    if (ACCESS_TOKEN){
      this.getPlayListName();
    }
    
    this.getCurrentSong();
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getCurrentSong(){
    spotifyWebAPI.getMyCurrentPlaybackState({
    })
    .then((data) => {
      this.setState({ currSong: data.body.item.id });
    }, function(err) {
      console.log('Something went wrong!', err);
    });
    
  }


  
  getCurrentPlaylist(){
    var songID = this.state.currSong;
    spotifyWebAPI.getPlaylistTracks("22j362ix734nbwqdoqjnl3rri","6RxCC9aUbbPzrsbMKO3k7o")
    .then((response) =>{
      const results = response.body.items;
      var playlistTracks = []
      var playlistTrackRow;
      var curr;
      //move loop to actual js file while passing object
        results.forEach((track)=>{
          if (track.track.id === songID){
            curr = true;
            playlistTrackRow = <PlayListRow current = {curr} key = {track.track.id} trackObject={track.track}/>
          }else{
            curr = false;
            playlistTrackRow = <PlayListRow current= {curr} key = {track.track.id} trackObject={track.track}/>
          }
          playlistTracks.push(playlistTrackRow)
        })
        this.setState({playlistRows: playlistTracks});
    })
    .catch(error => {
      // do whatever you want with the error and then...playListName:listName
      throw error;
    })
  }

  getPlayListName(){
    spotifyWebAPI.getPlaylist("22j362ix734nbwqdoqjnl3rri","6RxCC9aUbbPzrsbMKO3k7o")
    .then((response) => {
      this.setState({playListName: response.body.name});
      this.getCurrentPlaylist();
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  }
  //potential use of e.target.elements.track.URI
  addtoPlaylist(trackURI){
    var newTracks = [];
    newTracks.push(trackURI);
    spotifyWebAPI.addTracksToPlaylist('22j362ix734nbwqdoqjnl3rri', '6RxCC9aUbbPzrsbMKO3k7o', newTracks)
    .then((response) => {

    }, function(err) {
      console.log('Something went wrong!', err);
    });
  }

  searchChangeHandler(event){
    const searchTerm = event.target.value;
    this.performSearch(searchTerm);
  }

  performSearch(searchTerm){
    spotifyWebAPI.search(searchTerm,['track','artist'])
    .then((response) =>{
      const results = response.body.tracks.items;
      var trackRows = []
        results.forEach((track)=>{
          const trackRow = <TrackRow key={track.id} trackObject={track} addSong={this.addtoPlaylist}/>
          trackRows.push(trackRow)
        })
        this.setState({rows: trackRows})
    })
    .catch(error => {
      // do whatever you want with the error and then...
      throw error;
    })
  }
 

    
  render() {
    return (
      <div className="App">
        <div className="center-login-button">
          <a href="http://localhost:8888">
              { this.state.loggedIn ? null: <button className = "nicer-button">Login to Spotify</button> }
            </a>
        </div>
        
        <div className = "container-fluid">
          <div className ="row">
            <div className="col-sm-2"></div>
            <div className = "col-sm-4 panel left-panel">
              <h2 className = "playlist-title">{this.state.playListName}</h2>
              <div className = "playlist-tracks">{this.state.playlistRows}</div>
            </div>
            <div className = "col-sm-4 panel right-panel">
              <input onChange={this.searchChangeHandler.bind(this)} className= "search-bar" placeholder="Search..."/>
              {this.state.rows}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
