import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const input = [1, 2, 3, 4];

  test('should generate linked list from values 1', () => {
    const expectedResult = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: null,
              next: null,
            },
          },
        },
      },
    };

    const result = generateLinkedList(input);

    expect(expectedResult).toStrictEqual(result);
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(input);

    expect(result).toMatchSnapshot();
  });
});
