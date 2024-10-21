import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

describe('doStuffByTimeout', () => {
  let timeoutSpy: jest.SpyInstance;
  const callback = jest.fn();
  const timeout = 10;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    timeoutSpy = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, timeout);

    expect(timeoutSpy).toBeCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);
    jest.runAllTimers();

    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  let intervalSpy: jest.SpyInstance;
  const callback = jest.fn();
  const interval = 10;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  beforeEach(() => {
    intervalSpy = jest.spyOn(global, 'setInterval');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, interval);

    expect(intervalSpy).toBeCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const count = 5;

    doStuffByInterval(callback, interval);
    jest.advanceTimersToNextTimer(count);

    expect(callback).toBeCalledTimes(count);
  });
});

describe('readFileAsynchronously', () => {
  let existSyncSpy: jest.SpyInstance;
  let readFileSpy: jest.SpyInstance;
  let joinSpy: jest.SpyInstance;

  beforeEach(() => {
    existSyncSpy = jest.spyOn(fs, 'existsSync');
    readFileSpy = jest.spyOn(fsPromises, 'readFile');
    joinSpy = jest.spyOn(path, 'join');
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'path';

    await readFileAsynchronously(pathToFile);

    expect(joinSpy.mock.calls[0]).toContain(pathToFile);
  });

  test('should return null if file does not exist', async () => {
    existSyncSpy.mockReturnValueOnce(false);

    const result = await readFileAsynchronously('');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'content';
    existSyncSpy.mockReturnValueOnce(true);
    readFileSpy.mockReturnValueOnce(content);

    const result = await readFileAsynchronously('');

    expect(result).toBe(content);
  });
});
