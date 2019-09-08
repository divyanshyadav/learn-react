import React from 'react';
import './App.css';
import { Wrapper } from './utils'
import Counter from './topics/hooks/Counter'

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Counter />
      </Wrapper>
    </div>
  );
}

export default App;
