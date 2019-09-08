import React from 'react';
import './App.css';
import { Wrapper } from './utils'
import Counter from './topics/hooks/Counter'
import LoginForm from './topics/hooks/LoginForm'

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Counter />
        <LoginForm />
      </Wrapper>
    </div>
  );
}

export default App;
