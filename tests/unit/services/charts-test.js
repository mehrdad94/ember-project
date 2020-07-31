import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | charts', function(hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:charts');
    assert.ok(service);
  })
  
  test('it shoud test roundedRect', function (assert) {
	let service = this.owner.lookup('service:charts');
	
	const result = service.roundedRect(100, 100, 100, 100, 20, true, false, false, false)
	
	assert.ok(result)
  })
});
