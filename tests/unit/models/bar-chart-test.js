import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | bar chart', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('bar-chart', {
		label: 'one',
		value: 1
	});
    assert.ok(model);
	assert.equal(
      model.label,
      'one'
    );
  });
});
