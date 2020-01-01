import React from 'react';
import logo from './logo.svg';
import './App.css';
import { cars } from './demo'
import CartItem from './CartItem'

const App: React.FC = () => {
  return (
    <div className="App">
      <ul>
        {cars.map(car => 
          <CartItem car={car}/>
        )}
      </ul>
    </div>
  );
}

export default App;
