import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk } from 'redux/authentifServices';
import { selectUserData } from 'redux/selectors';

import { StyledNavLink } from 'App.styled';
import { NavPartStyledMenu } from 'components/Navigation/Navigation.styled';
import { User, UserName } from './UserMenu.styled';

const UserMenu = () => {
  const userName = useSelector(selectUserData);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logoutUserThunk());
  };
  return (
    <NavPartStyledMenu>
      <User>
        Welcome, <UserName>{userName.name}</UserName>
      </User>
      <StyledNavLink to="/" onClick={handleLogOut}>
        Log out
      </StyledNavLink>
    </NavPartStyledMenu>
  );
};

export default UserMenu;
