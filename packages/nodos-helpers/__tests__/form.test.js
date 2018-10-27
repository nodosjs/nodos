import { textFieldTag, labelTag } from '../src/form';

describe('text field tag', () => {
  test('default', () => {
    const actual = textFieldTag('title', 'Hello!');
    const expected = '<input id="title" name="title" type="text" value="Hello!">';
    expect(actual).toEqual(expected);
  });

  test('class string', () => {
    const actual = textFieldTag('title', 'Hello!', { class: 'admin' });
    const expected = '<input id="title" name="title" type="text" value="Hello!" class="admin">';
    expect(actual).toEqual(expected);
  });

  test('size number', () => {
    const actual = textFieldTag('title', 'Hello!', { size: 75 });
    const expected = '<input id="title" name="title" type="text" value="Hello!" size="75">';
    expect(actual).toEqual(expected);
  });

  test('maxlength string', () => {
    const actual = textFieldTag('title', 'Hello!', { maxlength: '75' });
    const expected = '<input id="title" name="title" type="text" value="Hello!" maxlength="75">';
    expect(actual).toEqual(expected);
  });

  test('disabled', () => {
    const actual = textFieldTag('title', 'Hello!', { disabled: true });
    const expected = '<input id="title" name="title" type="text" value="Hello!" disabled>';
    expect(actual).toEqual(expected);
  });

  test('with placeholder option', () => {
    const actual = textFieldTag('title', 'Hello!', { placeholder: 'Enter search term...' });
    const expected = '<input id="title" name="title" type="text" value="Hello!" placeholder="Enter search term...">';
    expect(actual).toEqual(expected);
  });

  test('with multiple options', () => {
    const actual = textFieldTag('title', 'Hello!', { size: 70, maxlength: 80 });
    const expected = '<input id="title" name="title" type="text" value="Hello!" size="70" maxlength="80">';
    expect(actual).toEqual(expected);
  });

  test('rewrite options', () => {
    const actual = textFieldTag('title', 'Hello!', { id: 'admin' });
    const expected = '<input id="admin" name="title" type="text" value="Hello!">';
    expect(actual).toEqual(expected);
  });

  test('data attribute', () => {
    const actual = textFieldTag('title', 'Hello!', { 'data-id': 1 });
    const expected = '<input id="title" name="title" type="text" value="Hello!" data-id="1">';
    expect(actual).toEqual(expected);
  });
});

describe('label tag', () => {
  test('without text', () => {
    const actual = labelTag();
    const expected = '<label for="title">Title</label>';
    expect(actual).toEqual(expected);
  });

  test('with text', () => {
    const actual = labelTag('title', 'My title');
    const expected = '<label for="title">My title</label>';
    expect(actual).toEqual(expected);
  });

  test('class option', () => {
    const actual = labelTag('title', 'My title', { class: 'small_label' });
    const expected = '<label for="title" class="small_label">My title</label>';
    expect(actual).toEqual(expected);
  });

  test('id option', () => {
    const actual = labelTag('title', 'My title', { id: 'label' });
    const expected = '<label for="title" id="label">My title</label>';
    expect(actual).toEqual(expected);
  });
});
