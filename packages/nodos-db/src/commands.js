// import _ from 'lodash';

export default ({ container, done }) => ({
  command: 'db',
  describe: 'run db subcommands',
  builder: {},
  handler: async (argv) => {
    // const app = container.nodos(argv.projectRoot);
    done();
  },
});