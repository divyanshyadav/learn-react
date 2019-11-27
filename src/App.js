import React from 'react';
import './App.css';
import { Wrapper } from './utils'
import Counter from './topics/hooks/Counter'
import LoginForm from './topics/hooks/LoginForm'
import BasicExample from './topics/react-router/BasicExample'
import NestedRouting from './topics/react-router/NestedRouting'
import AuthExample from './topics/react-router/AuthExample'
import CustomLink from './topics/react-router/CustomLink'
import PropChange from './topics/hooks/PropsChange'

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Counter />
        <LoginForm name="Login Form"/>
        <Wrapper name="React Router Examples">
          <BasicExample />
          <NestedRouting />
          <AuthExample />
          <CustomLink />
        </Wrapper>
        <PropChange />
      </Wrapper>
    </div>
  );
}

export default App;
