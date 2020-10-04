import {
  textFieldTag, labelTag, submitTag, form, Form,
} from '../../lib/helpers/form.js';

describe('text field tag', () => {
  test('default', () => {
    const actual = textFieldTag('title', 'Hello!');
    const expected = '<input id="title" name="title" type="text" value="Hello!">';
    expect(actual).toEqual(expected);
  });

  test('without value', () => {
    const actual = textFieldTag('title');
    const expected = '<input id="title" name="title" type="text" value="">';
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
    expect(actual).toMatchSnapshot();
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

describe('submit tag', () => {
  test('empty', () => {
    const actual = submitTag();
    const expected = '<input name="commit" type="submit" value="Save changes">';
    expect(actual).toEqual(expected);
  });

  test('having data disable with string', () => {
    const actual = submitTag('Save', { 'data-disable-with': 'Processing...', 'data-confirm': 'Are you sure?' });
    expect(actual).toMatchSnapshot();
  });

  test('having data disable with boolean', () => {
    const actual = submitTag('Save', { 'data-disable-with': false, 'data-confirm': 'Are you sure?' });
    const expected = '<input name="commit" type="submit" value="Save" data-confirm="Are you sure?">';
    expect(actual).toEqual(expected);
  });

  test('having data hash disable with boolean', () => {
    const actual = submitTag('Save', { data: { confirm: 'Are you sure?', disable_with: false } });
    const expected = '<input name="commit" type="submit" value="Save" data-confirm="Are you sure?">';
    expect(actual).toEqual(expected);
  });
});

describe('form function', () => {
  test('default', () => {
    const actual = form({ url: '/search' });
    const expected = '<form accept-charset="UTF-8" action="/search" data-remote="true" method="post"></form>';
    expect(actual).toEqual(expected);
  });
  test('with params', () => {
    const actual = form({ url: '/search', method: 'get' });
    const expected = '<form accept-charset="UTF-8" action="/search" data-remote="true" method="get"></form>';
    expect(actual).toEqual(expected);
  });
  test('with class', () => {
    const actual = form({ url: '/search', class: 'admin' });
    expect(actual).toMatchSnapshot();
  });
  test('with html', () => {
    const actual = form({
      url: '/search',
      method: 'get',
      html: `<p>${labelTag('q', 'Search for:')}${textFieldTag('q')}</p><p>${submitTag('Search')}</p>`,
    });
    expect(actual).toMatchSnapshot();
  });
  test('html with class', () => {
    const label = labelTag('q', 'Search for:', { class: 'admin' });
    const input = textFieldTag('q', '', { class: 'admin' });
    const submit = submitTag('Search', { class: 'admin' });
    const actual = form({
      url: '/search',
      method: 'get',
      class: 'admin',
      html: `<p class="admin">${label}${input}</p><p>${submit}</p>`,
    });
    expect(actual).toMatchSnapshot();
  });
});

describe('form class', () => {
  test('default', () => {
    const f = new Form({ url: '/search' });
    const actual = f.render();
    expect(actual).toMatchSnapshot();
  });
  test('with params', () => {
    const f = new Form({ url: '/search', method: 'get' });
    const actual = f.render();
    expect(actual).toMatchSnapshot();
  });
  test('with class', () => {
    const f = new Form({ url: '/search', class: 'admin' });
    const actual = f.render();
    expect(actual).toMatchSnapshot();
  });
  test('with html', () => {
    const f = new Form({
      url: '/search',
      method: 'get',
    });
    const html = `<p>${f.label('q', 'Search for:')}${f.textField('q')}</p><p>${f.submit('Search')}</p>`;
    const actual = f.render(html);
    expect(actual).toMatchSnapshot();
  });
  test('form with scope', () => {
    const f = new Form({
      url: '/posts',
      scope: 'post',
    });
    const html = `${f.textField('title')}`;
    const actual = f.render(html);
    expect(actual).toMatchSnapshot();
  });
  test('html with class', () => {
    const f = new Form({
      url: '/search',
      scope: 'post',
      method: 'get',
      class: 'admin',
    });
    const label = f.label('q', 'Search for:', { class: 'admin' });
    const input = f.textField('q', '', { class: 'admin' });
    const submit = f.submit('Search', { class: 'admin' });
    const html = `<p class="admin">${label}${input}</p><p>${submit}</p>`;
    const actual = f.render(html);
    expect(actual).toMatchSnapshot();
  });
  test('method patch', () => {
    const f = new Form({ url: '/search', method: 'patch' });
    const actual = f.render();
    expect(actual).toMatchSnapshot();
  });
  test('method put', () => {
    const f = new Form({ url: '/search', method: 'put' });
    const actual = f.render();
    expect(actual).toMatchSnapshot();
  });
  test('method delete', () => {
    const f = new Form({ url: '/search', method: 'delete' });
    const actual = f.render();
    expect(actual).toMatchSnapshot();
  });
});
