import React from 'react'

class SearchBar extends React.Component{
    viewMovie(){
        const url= "https://www.themoviedb.org/movie/" + this.props.movie.id
        window.location.href= url
    }
    render(){
        return (
            <input className= "searchBar" placeholder="Search..."/> //onChange={this.searchChangeHandler.bind(this)} 
        );
    }
}

export default SearchBar;