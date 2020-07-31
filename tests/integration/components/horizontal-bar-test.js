import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | pretty-color', function(hooks) {
  setupRenderingTest(hooks);

  test('should change colors', async function(assert) {
    assert.expect(1);

    // set the outer context to red
    this.set('colorValue', 'red');

    await render(hbs`<Charts::horizontal-bar/>`);

    assert.ok(this.element.querySelector('svg'));
  });
});