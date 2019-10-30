import React from 'react';
import './App.css';
import { Wrapper } from './utils'
import Counter from './topics/hooks/Counter'
import LoginForm from './topics/hooks/LoginForm'
import BasicExample from './topics/react-router/BasicExample'
import NestedRouting from './topics/react-router/NestedRouting'

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Counter />
        <LoginForm name="Login Form"/>
        <Wrapper name="React Router Examples">
          <BasicExample />
          <NestedRouting />
        </Wrapper>
      </Wrapper>
    </div>
  );
}

export default App;
