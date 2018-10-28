import jest from 'jest';

process.env.NODOS_ENV = 'test';

export default (args = process.argv.slice(2)) => {
  jest.run(['--testPathPattern', '/__tests__/', ...args]);
};
