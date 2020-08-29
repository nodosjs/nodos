module.exports = async (action, _request, response, { container }) => {
  const { connection } = container.db;
  const [, pendingMigraions] = await connection.migrate.list();
  if (pendingMigraions.length > 0) {
    const migrationsList = pendingMigraions.map((m) => `- ${m.file}`);
    const message = [
      'Here is a list of pending migrations:\n',
      ...migrationsList,
    ].join('\n');

    response.head(404, message);
  }

  await action();
};
