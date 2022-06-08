import {transformNumber} from '../../helpers/utils';

describe('Test utils', () => { 
  test('should return a number', () => { 
    expect(transformNumber('123,4566')).toBe(123.46);
  });  
})