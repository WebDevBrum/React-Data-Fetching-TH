import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    };
  } 
  
  /*Axios method note this auto returns resonse in json*/


  componentDidMount() {
    this.performSearch();

  }

  
  /* Fetch API Method
  componentDidMount() {
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=VTMt6fDogEABkeK1Lt2NC6VD1fHo40EN&limit=25&rating=g')
      .then(response => response.json())
      .then(responseData => {
        this.setState({ gifs: responseData.data });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error)
      }); 
  }*/

  performSearch = (query = 'cats') => {
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=VTMt6fDogEABkeK1Lt2NC6VD1fHo40EN`)
    .then(response => {
      this.setState({
        gifs: response.data.data,
        loading: false
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() { 
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch} />      
          </div>   
        </div>    
        <div className="main-content">
          {
            (this.state.loading) 
            ? <p>Loading...</p>
            : <GifList data={this.state.gifs} />
          }
        </div>
      </div>
    );
  }
}
