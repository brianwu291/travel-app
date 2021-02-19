import baseApi from '../baseApi';

export async function getCityRequest({
  cityName = '',
  totalNumber = 30,
  skipNumber = 0,
}) {
  const response = await baseApi({
    path: `/ScenicSpot/${cityName}?$top=${totalNumber}&$skip=${skipNumber}&$format=JSON`,
    method: 'GET',
  });
  const { data } = response;
  return ({
    citySpots: data,
    newTotal: totalNumber,
    newSkip: skipNumber + totalNumber,
  });
}

