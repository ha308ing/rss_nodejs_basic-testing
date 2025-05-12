import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import type { BankAccount } from '.';
import lodash from 'lodash';

jest.mock('lodash');

describe('BankAccount', () => {
  const initialBalance = 500;
  const overBalance = initialBalance * 2;
  let bankAccount: InstanceType<typeof BankAccount>;
  let anotherAccount: InstanceType<typeof BankAccount>;

  beforeEach(() => {
    bankAccount = getBankAccount(initialBalance);
    anotherAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    const balance = bankAccount.getBalance();

    expect(balance).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(overBalance)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccount.transfer(overBalance, anotherAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(1, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const balance = bankAccount.getBalance();
    const deposit = 500;

    bankAccount.deposit(deposit);
    const newBalance = bankAccount.getBalance();

    expect(balance + deposit).toBe(newBalance);
  });

  test('should withdraw money', () => {
    const balance = bankAccount.getBalance();
    const withdraw = 1;

    bankAccount.withdraw(withdraw);
    const newBalance = bankAccount.getBalance();

    expect(balance - withdraw).toBe(newBalance);
  });

  test('should transfer money', () => {
    const amount = 1;
    const balance = bankAccount.getBalance();
    const anotherBalance = anotherAccount.getBalance();

    bankAccount.transfer(amount, anotherAccount);
    const balanceNew = bankAccount.getBalance();
    const anotherBalanceNew = anotherAccount.getBalance();

    expect(balanceNew).toBe(balance - amount);
    expect(anotherBalanceNew).toBe(anotherBalance + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    const balance = await bankAccount.fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchResult = 5;
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(fetchResult)
      .mockReturnValueOnce(1);

    const balance = bankAccount.getBalance();

    await bankAccount.synchronizeBalance();
    const balanceNew = bankAccount.getBalance();

    expect(balanceNew).not.toEqual(balance);
    expect(balanceNew).toBe(fetchResult);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(0);

    expect(() => bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
