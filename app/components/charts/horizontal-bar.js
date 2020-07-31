import Component from '@glimmer/component'
import { inject as service } from '@ember/service'
import * as d3 from 'd3'

const config = {
  chartWidth: 800,
  chartHeight: 300,
  chartMargin: 50,
	firstBarHeight: 18,
	secondBarHeight: 10,
	gapBetweenGroups: 0,
	gapBetweenBars: 6,
	groupsTopMargin: 15,
	groupsLeftMargin: 2
}

export default class ChartsHorizontalBarComponent extends Component {
  @service store
  @service charts

  registerListener = element => {
    // get char data from store
    const data = this.store.peekAll('BarChart').toArray()

    // create new svg
    const svg = d3.select(element).append('svg')
		
    // create Y axis
    const y = d3.scaleBand()
            .rangeRound([0, config.chartHeight])
    		    .padding(0.1)
    		    .domain(data.map(d => d.label))
            
    // create X axis
    const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value) + 2])
            .range([0, config.chartWidth])

    // create grid
		svg.append('g')	
		      .attr('class', 'grid')
		      .attr('transform', `translate( ${config.chartMargin}, ${config.chartHeight + config.chartMargin})`)
		      .call(d3.axisBottom(x)
              .ticks(5)
		          .tickSize(-config.chartHeight)
		          .tickFormat('')
		      )

    // create bars wrapper
    const dataGroup = svg
            .attr('width', config.chartWidth + config.chartMargin * 2)
            .attr('height', config.chartHeight + 2 * config.chartMargin)
            .append('g')
            .attr('transform', 'translate(' + config.chartMargin + ', ' + config.chartMargin + ')')

    // create X axis
    const xAxisGroup = dataGroup
            .append('g')
            .attr('class', 'xAxisGroup')
            .attr('transform', 'translate(0,' + config.chartHeight + ')')


    const xAxis = d3.axisBottom(x)
        	.tickSize(0)
        	.tickFormat((text, index) => {
        		if (index === 0) return '€ ' + text
        		else if (index % 2 === 0) return text + 'Mio.'
        		else return ''
        	})

    xAxis(xAxisGroup)

    // create Y axis
    var yAxisGroup = dataGroup
        .append('g')
        .attr('class', 'yAxisGroup')

    var yAxis = d3.axisLeft(y).tickSize(0)

    yAxis(yAxisGroup)

    // create bars wrapper
    const bars = svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', 'translate(' + config.chartMargin + ', ' + config.chartMargin + ')')

    // create first bar
    bars.append('path')
    	.attr('d', (d, index) => {
    		return this.charts.roundedRect(
    			config.groupsLeftMargin,
    			y(d.label) + config.groupsTopMargin + index * config.gapBetweenGroups,
    			x(d.value),
    			config.firstBarHeight,
    			9,
    			false,
    			true,
    			false,
    			true)
    })
    .attr('class', 'first-bar')

    // create second bar
		bars.append('path')
      	.attr('d', (d, index) => {
      		return this.charts.roundedRect(
      			config.groupsLeftMargin,
      			y(d.label) + config.groupsTopMargin + index * config.gapBetweenGroups + config.firstBarHeight + config.gapBetweenBars,
      			x(d.value) + config.groupsLeftMargin,
      			config.secondBarHeight,
      			5,
      			false,
      			true,
      			false,
      			true)
		    })
        .attr('class', 'second-bar')

    // create bars label
    bars.append('text')
        .attr('class', 'label')
        //y position of the label is halfway down the bar
        .attr('y', (d, index) => {
            return y(d.label) + config.groupsTopMargin + index * config.gapBetweenGroups - 3
        })
        //x position is 3 pixels to the right of the bar
        .attr('x', d => config.groupsLeftMargin)
        .text(d => d.label)
	}
}
