import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import SelectCity from './SelectCity';

const NavBar = () => {
  const { isExact, params } = useRouteMatch("/scenicSpot/:cityName") || {};
  return (
    <div
      style={{
        position: 'fixed',
        top: '-1rem',
        left: 0,
        width: '100%',
      }}
    >
      <Segment.Group horizontal>
        <Segment textAlign='center'>
          <NavLink
            to="/scenicSpot"
          >
            <div style={{ lineHeight: '38px' }}>首頁</div>
          </NavLink>
        </Segment>
        <Segment textAlign='center'>
          <SelectCity
            defaultCityName={isExact ? params?.cityName : null}
          />
        </Segment>
      </Segment.Group>
    </div>
  )
}

export default NavBar;
