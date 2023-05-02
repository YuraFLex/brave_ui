import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink)`
  display: inline-flex;
  text-decoration: none;
  font-size: 20px;
  padding: 10px 0;
  color: inherit;
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;

  &:hover {
    background-color: rgb(0 0 0 / 18%);
    border-radius: 4px;
    padding: 10px;
  }

  &.active {
    background-color: rgb(0 0 0 / 18%);
    border-radius: 4px;
    padding: 10px;
  }
`;
