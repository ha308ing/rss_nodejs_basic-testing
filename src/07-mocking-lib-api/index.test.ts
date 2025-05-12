import axios from 'axios';
import { throttledGetDataFromApi } from './index';
import { AxiosInstance } from 'axios';

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: jest.fn().mockImplementation((callback) => callback),
}));

describe('throttledGetDataFromApi', () => {
  const axiosMock = jest.mocked(axios);

  const getSpy = jest.fn();
  const data = 'hello';

  beforeEach(() => {
    getSpy.mockResolvedValue({ data });

    axiosMock.create.mockImplementation(() => {
      return {
        get: getSpy,
      } as unknown as AxiosInstance;
    });
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    await throttledGetDataFromApi('');

    expect(axiosMock.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = 'relative-path';

    await throttledGetDataFromApi(relativePath);

    expect(getSpy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi('');

    expect(response).toBe(data);
  });
});
