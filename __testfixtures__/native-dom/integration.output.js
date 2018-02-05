import { click, fillIn, focus, blur, triggerEvent, triggerKeyEvent, waitFor, waitUntil } from '@ember/test-helpers';
import { findWithAssert, scrollTo, selectFiles } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('foo-bar', 'Integration | Component | foo bar', {
  integration: true
});

test('it renders', async function(assert) {
  this.render(hbs`{{foo-bar}}`);

  await click('.foo', {});
  assert.equal(this.element.querySelector('.foo').id, 'foo');
  await fillIn('.foo input', 'bar');
  await blur('.foo input');
  assert.equal(this.element.querySelector('.foo').textContent.trim(), 'foo');
});

test('it renders again', function(assert) {
  this.render(hbs`{{foo-bar}}`);

  let selector = '.foo input';
  assert.equal(this.element.querySelectorAll(selector).length, 1);
  assert.equal(this.element.querySelector(selector).value, 'foo');
  assert.ok(this.element.querySelector('.foo').classList.contains('selected'));
});

test('and again', async function(assert) {
  this.render(hbs`{{foo-bar}}`);

  await tap('foo');
  let el = findWithAssert('.foo input');

  await fillIn(el, value);
  await triggerEvent('.foo input', 'change');
  await triggerKeyEvent('bar', 'keypress', 13, modifiers);

  await focus('.foo input');
  await blur('.foo input');

  assert.ok(this.element.querySelectorAll('.baz')[1].classList.contains('selected'));
});

test('and yet again', async function(assert) {
  this.render(hbs`{{foo-bar}}`);

  await scrollTo(document, 10, 20);
  await selectFiles('input[type=file]', [new Blob(['texters'], { type: 'plain/text' })]);
  await waitUntil(() => this.element.querySelector('.foo.active'));
  await waitFor('.bar.selected');
  assert.ok(true);
});