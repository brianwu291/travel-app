import React, { useCallback } from 'react';
import get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';
import { Container, List, Loader } from 'semantic-ui-react'
import { getSpotsRequest } from '../actions';
import { COUNTS_PER_PAGE } from '../constants'
import { useScrollToBottomTrigger } from '../hooks';
import Spot from './Spot';

const ScenicSpot = () => {
  const currentPage = useSelector(state => get(state, 'spots.currentPage', 0));
  const spots = useSelector(state => get(state, 'spots.spots', []));
  const isFetchingSpots = useSelector(state => get(state, 'spots.isFetching', false));
  const isFetchingDone = useSelector(state => get(state, 'spots.isFetchingDone', false));
  const dispatch = useDispatch();
  const handleGetSpots = useCallback(() => {
    dispatch(getSpotsRequest({
      totalNumber: COUNTS_PER_PAGE,
      skipNumber: currentPage * COUNTS_PER_PAGE,
    }))
  }, [currentPage, dispatch])
  const { bottomElementRef } = useScrollToBottomTrigger({
    triggerAtFirst: spots?.length === 0,
    triggerFunction: handleGetSpots,
    paramForTriggerFunction: null,
    otherTriggerConditions: [
      spots?.length > 0,
      !isFetchingSpots,
      !isFetchingDone,
    ]
  });
  return (
      <Container
        style={{
          marginTop: '100px'
        }}
      >
        <List>
        {spots.map(({
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
        {isFetchingSpots && (
          <div style={{ height: 55 }}>
            <Loader active inline='centered' />
          </div>
        )}
      </Container>
  )
}

export default ScenicSpot;
