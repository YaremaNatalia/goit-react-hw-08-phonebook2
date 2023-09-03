import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  background-color: #ddd8d8;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  padding: 50px;
  /* background-image: url('./wallpaper.jpg');
  background-size: cover;
  background-position: center; */
`;

export const AppNav = styled.nav`
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  position: fixed;
  z-index: 1000;
  top: 0px;
  left: auto;
  right: 0px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  background-color: #1677ff;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  /* border-bottom: 1px solid #000; */
`;

export const StyledNavLink = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  padding: 12px;
  font-weight: 700;
  color: #000;

  font-size: 20px;

  transition: all 0.3s;

  &.active {
    color: #fff;
  }
`;
