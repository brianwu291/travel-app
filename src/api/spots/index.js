import baseApi from '../baseApi';

export async function getSpotsRequest({
  totalNumber = 30,
  skipNumber = 0,
}) {
  const response = await baseApi({
    path: `/ScenicSpot/?$top=${totalNumber}&$skip=${skipNumber}&$format=JSON`,
    method: 'GET',
  });
  const { data } = response;
  return ({
    spots: data,
    newTotal: totalNumber,
    newSkip: skipNumber + totalNumber,
  });
}

