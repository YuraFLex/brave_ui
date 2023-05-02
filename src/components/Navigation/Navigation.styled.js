import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink)`
  display: inline-flex;
  text-decoration: none;
  font-size: 20px;
  padding: 10px 0;
  color: inherit;
  width: 100%;

  &.active {
    color: #000;
  }
`;
