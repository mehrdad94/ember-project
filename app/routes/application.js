import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default class ApplicationRoute extends Route {
  @service store;
  model() {
    this.store.push({
      data: [{
        id: 1,
        type: 'BarChart',
        attributes: {
          label: 'Disks',
          value: 1   
        }
      }, {
        id: 2,
        type: 'BarChart',
        attributes: {
          label: 'Bars',
          value: 3
        }
      }, {
        id: 3,
        type: 'BarChart',
        attributes: {
          label: 'Sleeves',
          value: 5
        }
      }, {
        id: 4,
        type: 'BarChart',
        attributes: {
          label: 'Switches',
          value: 8
        }
      }]
    })
  }
}