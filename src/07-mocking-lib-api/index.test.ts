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
