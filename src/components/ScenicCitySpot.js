import React, { useCallback } from 'react';
import get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';
import { Container, List, Loader } from 'semantic-ui-react'
import { getCityRequest } from '../actions';
import { COUNTS_PER_PAGE } from '../constants'
import { useScrollToBottomTrigger, usePrevious } from '../hooks';
import Spot from './Spot';

const ScenicCitySpot = ({
  cityName
}) => {
  const currentPage = useSelector(state => get(state, `cities.${cityName}.currentPage`, 0));
  const citySpots = useSelector(state => get(state, `cities.${cityName}.citySpots`, []));
  const isFetchingCitySpots = useSelector(state => get(state, `cities.${cityName}.isFetching`, false));
  const isFetchingDone = useSelector(state => get(state, `cities.${cityName}.isFetchingDone`, false));
  const preCityName = usePrevious(cityName);
  const dispatch = useDispatch();
  const handleGetCitySpots = useCallback(() => {
    dispatch(getCityRequest({
      cityName,
      totalNumber: COUNTS_PER_PAGE,
      skipNumber: currentPage * COUNTS_PER_PAGE,
    }))
  }, [cityName, currentPage, dispatch])
  const { bottomElementRef } = useScrollToBottomTrigger({
    triggerAtFirst: citySpots?.length === 0,
    triggerFunction: handleGetCitySpots,
    paramForTriggerFunction: null,
    otherTriggerConditions: [
      citySpots?.length > 0,
      !isFetchingCitySpots,
      !isFetchingDone,
    ],
    forceRetriggerCondition: [
      citySpots?.length === 0,
      preCityName !== cityName && !isFetchingDone,
    ]
  });
  return (
      <Container
        style={{
          marginTop: '100px'
        }}
      >
        <List>
        {citySpots.map(({
          ID,
          Name,
          Description,
          DescriptionDetail,
        }, index, that) => (
          <Spot
            key={ID}
            refsForLastItem={index === that.length - 1 ? bottomElementRef : null}
            Name={Name}
            Description={Description}
            DescriptionDetail={DescriptionDetail}
          />
        ))}
        </List>
        {isFetchingCitySpots && (
          <div style={{ height: 55 }}>
            <Loader active inline='centered' />
          </div>
        )}
      </Container>
  )
}

export default ScenicCitySpot;
