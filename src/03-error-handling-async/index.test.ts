import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect.assertions(1);
    const input = 5;

    const result = await resolveValue(input);

    expect(result).toBe(5);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Error message';

    expect(() => throwError(errorMessage)).toThrow(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultErrorMessage = 'Oops!';

    expect(() => throwError()).toThrow(defaultErrorMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
