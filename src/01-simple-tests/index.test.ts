import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 5, b: -5, action: Action.Add };

    const result = simpleCalculator(input);

    expect(result).toBe(0);
  });

  test('should subtract two numbers', () => {
    const input = { a: 5, b: -5, action: Action.Subtract };

    const result = simpleCalculator(input);

    expect(result).toBe(10);
  });

  test('should multiply two numbers', () => {
    const input = { a: 5, b: -5, action: Action.Multiply };

    const result = simpleCalculator(input);

    expect(result).toBe(-25);
  });

  test('should divide two numbers', () => {
    const input = { a: 5, b: 0, action: Action.Divide };

    const result = simpleCalculator(input);

    expect(result).toBe(Infinity);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 5, b: -5, action: Action.Exponentiate };

    const result = simpleCalculator(input);

    expect(result).toBeCloseTo(0.00032);
  });

  test('should return null for invalid action', () => {
    const input = { a: 5, b: -5, action: 'invalid-action' };

    const result = simpleCalculator(input);

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = { a: 5, b: undefined, action: Action.Add };

    const result = simpleCalculator(input);

    expect(result).toBeNull();
  });
});
