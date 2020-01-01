import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {

  state = {
    values:[]
  }
  componentDidMount = () => {
    axios.get("http://localhost:5000/api/values")
      .then((response) => {
        console.log(response);
        this.setState({
          values:response.data
        })
      })
  }
  render(){
    return (
      <div className="App">
        <ul>
          {
            this.state.values.map((value:any) => (  // any prop comes from typescript
              <li>
                {
                  value.name
                }
              </li>
            ))
          }
        </ul>
      </div>
    ); 
  }
}

export default App;
