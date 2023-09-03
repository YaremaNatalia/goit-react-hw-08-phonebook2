import { StyledNavLink } from 'App.styled';
import { useSelector } from 'react-redux';
import { selectAuthentificated } from 'redux/selectors';
import { NavPartStyledMenu } from './Navigation.styled';

export const Navigation = () => {
  const authentificated = useSelector(selectAuthentificated);

  return (
    <NavPartStyledMenu>
      <StyledNavLink to="/">Home</StyledNavLink>
      {authentificated && (
        <StyledNavLink to="/contacts">Contacts</StyledNavLink>
      )}
    </NavPartStyledMenu>
  );
};
