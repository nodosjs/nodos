import jest from 'jest';

export default (args = process.argv.slice(2)) => {
  jest.run(['--testPathPattern', '/__tests__/', ...args]);
};
