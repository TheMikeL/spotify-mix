import React from 'react'

class PlayListRow extends React.Component{

    render(){
        return <table className="playlist-search-results">
        <tbody>
          <tr>
            <td className="wrap-art">
              <img alt="poster" className = "album-art" src={this.props.trackObject.album.images[0].url}/>
            </td>
            <td>
              <p className = {this.props.current ? 'current-song title' : 'track track-title'} >{this.props.trackObject.name}</p>
              <p className = {this.props.current ? 'current-song artist' : 'track track-artist'} >{this.props.trackObject.artists[0].name}</p>              
            </td>
          </tr>
        </tbody>
      </table>
    }
}

export default PlayListRow