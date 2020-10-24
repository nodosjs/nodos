module.exports = async (action, _request, response, app) => {
  const { connection } = app.container.db;
  const [, pendingMigraions] = await connection.migrate.list();
  if (pendingMigraions.length > 0) {
    if (app.isTest()) {
      throw new Error(`Pending migrations have been found: ${pendingMigraions.length}`);
    }
    const migrationsList = pendingMigraions.map((m) => `- ${m.file}`);
    const message = [
      'Here is a list of pending migrations:\n',
      ...migrationsList,
    ].join('\n');

    response.head(404, message);
    return;
  }

  await action();
};
