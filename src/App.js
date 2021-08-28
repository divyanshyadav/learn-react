import React from 'react';
import './App.css';
import { Wrapper } from './utils';
import Counter from './topics/hooks/Counter';
import LoginForm from './topics/hooks/LoginForm';
import BasicExample from './topics/react-router/BasicExample';
import NestedRouting from './topics/react-router/NestedRouting';
import URLParameters from './topics/react-router/URLParameters';
import AuthExample from './topics/react-router/AuthExample';
import CustomLink from './topics/react-router/CustomLink';
import PropChange from './topics/hooks/PropsChange';
import { FadeContainer } from './topics/animation/UsingTransition';
import { CSSFadeContainer } from './topics/animation/UsingCSSTransition';
import CustomPropTypes from './topics/customPropTypes';
import ApiCall from './topics/api-call';
import HookLifeCycle from './topics/hooks/HookLifeCycle';
import AuthAndUnAuthAppExample from './topics/authentication/App';
import StyledDiv from './topics/styled-components/StyledDiv';

function App() {
	return (
		<div className="App">
			<Wrapper>
				<Wrapper name="Styled Components Examples">
					<StyledDiv>Hello There!</StyledDiv>
				</Wrapper>
				<HookLifeCycle name="Hooks flow | see console" />
				<AuthAndUnAuthAppExample />
				<ApiCall />
				<Wrapper name="Animation using React Transition Group">
					<FadeContainer name="Fade using <Transition>">
						<div>Fade in</div>
					</FadeContainer>
					<CSSFadeContainer name="Fade using <CSSTransition>">
						<div>Fade in</div>
					</CSSFadeContainer>
				</Wrapper>
				<Counter />
				<LoginForm name="Login Form" />
				<Wrapper name="React Router Examples">
					<BasicExample />
					<NestedRouting />
					<URLParameters name="URL Parameters" />
					<AuthExample />
					<CustomLink />
				</Wrapper>
				<PropChange />
				<CustomPropTypes />
			</Wrapper>
		</div>
	);
}

export default App;
