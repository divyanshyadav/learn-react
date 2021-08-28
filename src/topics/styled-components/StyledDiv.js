import myStyled from './myStyled';

const backgroundColor = 'lightblue';
const textColor = 'yellow';

const StyledDiv = myStyled('div')`
  color: ${textColor};
  background: ${() => backgroundColor};
`;

export default StyledDiv;
