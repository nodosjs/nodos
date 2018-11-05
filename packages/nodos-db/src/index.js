import commandBuilder from './commands';
// import generators from './generators';

export default (context) => {
  context.commandBuilders.push(commandBuilder);
};
