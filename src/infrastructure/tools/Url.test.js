import { paramsToUrlString } from './Url';

describe('paramsToUrlString', () => {
  it('should return an empty string for an empty object', () => {
    expect(paramsToUrlString({})).toBe('');
  });

  it('should return a string representation of an object with a single key', () => {
    expect(paramsToUrlString({ key: 'value' })).toBe('key=value');
  });

  it('should return a string representation of an object with multiple keys', () => {
    expect(paramsToUrlString({ key1: 'value1', key2: 'value2' })).toBe('key1=value1&key2=value2');
  });

  it('should return a string representation of an object with nested objects', () => {
    expect(paramsToUrlString({ key: { nestedKey: 'nestedValue' } })).toBe('key[nestedKey]=nestedValue');
  });

  it('should return a string representation of an object with arrays', () => {
    expect(paramsToUrlString({ key: ['value1', 'value2'] })).toBe('key=value1&key=value2');
  });
});
