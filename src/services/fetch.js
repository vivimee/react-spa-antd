import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:1337',
  timeout: 5000,
  transformRequest: [
    data => JSON.stringify(data),
  ],
  validateStatus: status => status < 500,
});

const fetch = async (config = {}) => {
  try {
    const response = await instance.request({
      ...config,
      headers: {
        Authorization: 'bearer adkjlfkjldkjeiw-fkdlfksjd-sdfjkdlsjdlks',
      },
    });
    return response.data;
  } catch (ex) {
    throw ex;
  }
};
export default fetch;
