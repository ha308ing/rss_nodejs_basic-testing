import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';
import { AxiosInstance } from 'axios';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const axiosMock = jest.mocked(axios);
  const getSpy = jest.fn();
  const data = 'hello';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.advanceTimersByTime(THROTTLE_TIME);

    getSpy.mockResolvedValue({ data });

    axiosMock.create.mockImplementation(() => {
      return {
        get: getSpy,
      } as unknown as AxiosInstance;
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    expect.assertions(1);

    await throttledGetDataFromApi('');

    expect(axiosMock.create).toBeCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = 'relative-path';
    expect.assertions(1);

    await throttledGetDataFromApi(relativePath);

    expect(getSpy).toBeCalledWith(relativePath);
  });

  test('should return response data', async () => {
    expect.assertions(1);

    const response = await throttledGetDataFromApi('');

    expect(response).toBe(data);
  });
});
