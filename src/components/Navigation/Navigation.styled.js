import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink)`
  display: flex;
  text-decoration: none;
  font-size: 18px;
  padding: 5px;
  color: inherit;
  width: 100%;

  &:hover {
    background-color: rgb(0 153 250 / 10%);
    border-radius: 4px;
    padding: 5px;
  }

  &.active {
    background-color: rgb(0 153 250 / 10%);
    border-radius: 10px;
    padding: 5px;
  }

  
  @media screen and (max-width: 666px) {
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 920px) {
    
    font-size: 14px;
  }
`;
