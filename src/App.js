import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import ScenicSpot from './components/ScenicSpot';
import ScenicCitySpot from './components/ScenicCitySpot';

function App() {
  const renderRouter = () => {
    return (
      <Switch>
        <Route
          exact
          path="/scenicSpot"
        >
          <ScenicSpot />
        </Route>
        <Route
          path="/scenicSpot/:cityName"
        >
          {({ match }) => {
            const { cityName } = match.params;
            return (
              <ScenicCitySpot
                cityName={cityName}
              />
            )
          }}
        </Route>
        <Route exact path="/" render={() => <Redirect to="/scenicSpot" />} />
      </Switch>
    )
  }
  return (
    <>
      <NavBar />
      {renderRouter()}
    </>
  );
}

export default App;
