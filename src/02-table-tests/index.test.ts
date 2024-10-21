import { simpleCalculator, Action } from './index';

const testCases = [
  // add action
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: -2, action: Action.Add, expected: 0 },
  { a: null, b: 2, action: Action.Add, expected: null },
  { a: 2, b: '2', action: Action.Add, expected: null },

  // subtract action
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: -2, action: Action.Subtract, expected: 4 },
  { a: null, b: 2, action: Action.Subtract, expected: null },

  // multiply action
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: -2, action: Action.Multiply, expected: -4 },
  { a: 2, b: 0, action: Action.Multiply, expected: 0 },
  { a: null, b: '2', action: Action.Multiply, expected: null },

  // divide action
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 2, b: -2, action: Action.Divide, expected: -1 },
  { a: 2, b: 0, action: Action.Divide, expected: Infinity },
  { a: null, b: 2, action: Action.Divide, expected: null },

  // exponentiate action
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: -2, action: Action.Exponentiate, expected: 0.25 },
  { a: 2, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: null, b: 2, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b should be $expected',
    ({ expected, ...input }) => {
      const result = simpleCalculator(input);

      expect(result).toBe(expected);
    },
  );
});
