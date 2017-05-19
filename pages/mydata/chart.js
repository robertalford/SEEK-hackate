define(['knockout', 'data/data'], function (ko, data) {
    return function ViewModel(params) {

        function updateChart(values, chartExists) {
            //split categories into separate array -- chart to be refactored to read straight from source    
            var categories = [''];
            for (i = 0; i < selectedcompanies.length; i++) {
                categories.push(selectedcompanies[i]['company_name']);
            }

            //adding some colours
            var colors = ['#B41782', '#404040', '#747474', '#898989', '#898989', '#A8A8A8'];

            //plot chart
            var grid = d3.range(25).map(function (i) {
                return { 'x1': 0, 'y1': 0, 'x2': 0, 'y2': 255 };
            });

            var tickVals = grid.map(function (d, i) {
                if (i > 0) { return i * 1; }
                else if (i === 0) { return "100"; }
            });

            var xscale = d3.scale.linear()
                .domain([0, 6])
                .range([0, 722]);

            var yscale = d3.scale.linear()
                .domain([0, categories.length])
                .range([0, 260]);

            var colorScale = d3.scale.quantize()
                .domain([0, categories.length])
                .range(colors);

            if (!chartExists) {
                var canvas = d3.select('#wrapper')
                    .append('svg')
                    .attr({ 'width': 800, 'height': 300 });


                var grids = canvas.append('g')
                    .attr('id', 'grid')
                    .attr('transform', 'translate(150,10)')
                    .selectAll('line')
                    .data(grid)
                    .enter()
                    .append('line')
                    .attr({
                        'x1': function (d, i) { return i * 30; },
                        'y1': function (d) { return d.y1; },
                        'x2': function (d, i) { return i * 30; },
                        'y2': function (d) { return d.y2; },
                    })
                    .style({ 'stroke': '#adadad', 'stroke-width': '1px' });

                var xAxis = d3.svg.axis();
                xAxis
                    .orient('bottom')
                    .scale(xscale)
                    .tickValues(tickVals);

                var yAxis = d3.svg.axis();
                yAxis
                    .orient('left')
                    .scale(yscale)
                    .tickSize(2)
                    .tickFormat(function (d, i) { return categories[i]; })
                    .tickValues(d3.range(17));

                var y_xis = canvas.append('g')
                    .attr("transform", "translate(150,0)")
                    .attr('id', 'yaxis')
                    .call(yAxis);

                var x_xis = canvas.append('g')
                    .attr("transform", "translate(150,260)")
                    .attr('id', 'xaxis')
                    .call(xAxis);

                var chart = canvas.append('g')
                    .attr("transform", "translate(150,0)")
                    .attr('id', 'bars')
                    .selectAll('rect')
                    .data(values)
                    .enter()
                    .append('rect')
                    .attr('height', 42)
                    .attr({ 'x': 0, 'y': function (d, i) { return yscale(i) + 19; } })
                    .style('fill', function (d, i) { return colorScale(i); })
                    .attr('width', function (d) { return 0; });
            }

            var transit = d3.select("svg").selectAll("rect")
                .data(values)
                .transition()
                .duration(1000)
                .attr("width", function (d) { return xscale(d); });

            // var transitext = d3.select('#bars')
            //     .selectAll('text')
            //     .data(values)
            //     .enter()
            //     .append('text')
            //     .attr({ 'x': function (d) { return xscale(d) - 200; }, 'y': function (d, i) { return yscale(i) + 35; } })
            //     .text(function (d) { return d; }).style({ 'fill': '#fff', 'font-size': '14px' });
        }


        this.currentFilter = ko.observable('OverallRating');

        var chartValues = ko.computed(() => {
            var data = params.data();

            //calculate average rating per selected company       
            var values = [];
            for (i = 0; i < selectedcompanies.length; i++) {
                var averagerating = 0;
                var reviewcount = 0;
                for (z = 0; z < data.length; z++) {
                    if (data[z].CompanyId == selectedcompanies[i].company_id || selectedcompanies[i].company_id == null) {
                        if (data[z][this.currentFilter()] !== 'NA') {
                            averagerating += data[z][this.currentFilter()];
                            reviewcount = reviewcount + 1;
                        }
                    }
                }
                averagerating = reviewcount === 0 ? 0 : averagerating / reviewcount;
                averagerating = Math.round(averagerating * 10) / 10;
                values.push(averagerating);
            }

            return values;
        });

        this.filters = [
            { fieldClass: "overall", filterField: 'OverallRating', description: 'Overall rating' },
            { fieldClass: "career", filterField: 'CareerDevOpp', description: 'Career' },
            { fieldClass: "balance", filterField: 'WorklifeBal', description: 'Work life balance' },
            { fieldClass: "diversity", filterField: 'Diversity', description: 'Diversity' },
            { fieldClass: "environment", filterField: 'WorkingEnv', description: 'Working environment' },
            { fieldClass: "management", filterField: 'Management', description: 'Manage- ment' },
            { fieldClass: "benefits", filterField: 'Benefits', description: 'Benefits & perks' }
        ];

        this.roleFamily = params.roleFamily;

        setTimeout(() => updateChart(chartValues(), false), 0);
        chartValues.subscribe(newData => updateChart(newData, true));
    }

});

