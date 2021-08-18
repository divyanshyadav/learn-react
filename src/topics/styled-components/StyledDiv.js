import myStyled from "./myStyled";

const StyledDiv = myStyled('div')`
  color: yellow;
  background: ${() => 'green'};
`;

export default StyledDiv;