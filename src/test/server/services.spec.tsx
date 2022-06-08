import axios from "axios";
import { execute } from '../../server/services';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Test services', () => { 
  test('should run Api', async () => { 
    // await execute('get', '/users');
  });
})