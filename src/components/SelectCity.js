import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Select } from 'semantic-ui-react'
import { CITY_NAME_MAPS } from '../constants'

const cityOptions = Object.keys(CITY_NAME_MAPS).map(cityChineseName => {
  const cityValue = CITY_NAME_MAPS[cityChineseName];
  return ({
    key: cityValue,
    value: cityValue,
    text: cityChineseName,
  });
});

const SelectCity = ({ defaultCityName }) => {
  const history = useHistory();
  const [selectCityName, setSelectCityName] = useState(defaultCityName || '');
  const handlePushToCityPage = (_, selectData) => {
    setSelectCityName(selectData.value);
    history.push(`/scenicSpot/${selectData.value}`);
  }
  useEffect(() => {
    if (defaultCityName === null) {
      setSelectCityName('');
    }
  }, [defaultCityName]);
  return (
    <Select
      placeholder='選擇你的城市'
      options={cityOptions}
      onChange={handlePushToCityPage}
      value={selectCityName}
    />
  )
}

export default SelectCity;
