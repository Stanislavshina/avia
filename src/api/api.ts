import axios, { AxiosResponse } from 'axios';

const api = 'https://aviasales-test-api.kata.academy';

const getID = async (): Promise<string> => {
  const response: AxiosResponse<{ searchId: string }, string> = await axios.get(`${api}/search`);
  const searchId = response.data.searchId;
  sessionStorage.setItem('id', searchId);
  return searchId;
};

export default getID;
