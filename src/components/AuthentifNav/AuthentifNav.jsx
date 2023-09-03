import { StyledNavLink } from 'App.styled';
import { NavPartStyledMenu } from 'components/Navigation/Navigation.styled';


export const AuthentifNav = () => {
  return (
    <NavPartStyledMenu>
      <StyledNavLink to="/login">Log In</StyledNavLink>
      <StyledNavLink to="/register">Register</StyledNavLink>
    </NavPartStyledMenu>
  );
};
