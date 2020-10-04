import Form from '../lib/Form.js';

test('input', () => {
  const obj = {
    firstName: 'kolya',
  };
  const form = new Form(obj);
  const html = form.input('firstName');

  expect(html).toMatchSnapshot();
});
