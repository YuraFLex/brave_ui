import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink)`
  display: flex;
  text-decoration: none;
  font-size: 18px;
  padding: 5px;
  color: inherit;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;

  &:hover {
    background-color: #0198f8;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.6);
  }

  &.active {
    background-color: #0198f8;
    box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.6);
  }

  
  @media screen and (max-width: 666px) {
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 920px) {
    
    font-size: 14px;
  }
`;
