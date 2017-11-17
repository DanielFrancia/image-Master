import React, { Component } from 'react';
import './App.css';
import {FormGroup,FormControl,InputGroup} from 'react-bootstrap';
import {Route,Switch,Link,NavLink} from 'react-router-dom'



class App extends Component {

  state={
    query:"",
    images:[],
    page:1
  }

  componentWillMount(){
    this.search()
  }
  

  search=()=>{
    fetch(`https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${this.state.query}&client_id=27dbf532ba7730f8b27896367c02d62252f7225bcb3fdbf0e1af66a4ed2a107e`)
      .then(data => data.json())
      .then(json => {
        this.state.images.push(...json)
        this.setState({ images: json.results, page: this.state.page + 1 })
      })
      
  }

  

  render() {
    if(!this.state.images){
      return (
        <div>
          LOADING
        </div>
      )
    }  
    
    return (
      
      <div className="App">
        <div className="app-title">Image Search Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search free high-resolution photos"
              value={this.state.query}
              onChange={event=>this.setState({query:event.target.value})}
              onKeyPress={event=>{
                if(event.key==='Enter'){
                  this.search()
                }
              }}
              />
             <InputGroup.Addon onClick={this.search}>
                <span className="glyphicon glyphicon-search"></span>
             </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <div className="display">
    <div>{this.state.images.map(url=><ul><li><img src={url.urls.small} /></li></ul>)}</div>
        </div>
      </div>
    );
  }
}



export default App;
