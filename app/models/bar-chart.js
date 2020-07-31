import Model, { attr } from '@ember-data/model'

export default class BarChartModel extends Model {
	@attr('string') label
	@attr('number') value
}
