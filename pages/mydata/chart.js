define(['knockout', 'data/data'], function (ko, data) {
    return function ViewModel(params) {
        setTimeout(function () {

            var svg = d3.select("svg"),
                margin = { top: 20, right: 20, bottom: 30, left: 40 },
                width = +svg.attr("width") - margin.left - margin.right,
                height = +svg.attr("height") - margin.top - margin.bottom;

            var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
                y = d3.scaleLinear().rangeRound([height, 0]);

            var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // load the data
            d3.json("/pages/mydata/you-v-others.json", function (error, data) {
                data.forEach(function (d) {
                    d.company_name = d.company_name;
                    d.rating = +d.rating;
                });

                x.domain(data.map(function (d) { return d.company_name; }));
                y.domain([0, d3.max(data, function (d) { return d.rating; })]);

                g.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));

                g.append("g")
                    .attr("class", "axis axis--y")
                    .call(d3.axisLeft(y).ticks(10, "%"))
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", "0.71em")
                    .attr("text-anchor", "end")
                    .text("Frequency");

                g.selectAll(".bar")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d) { return x(d.company_name); })
                    .attr("y", function (d) { return y(d.rating); })
                    .attr("width", x.bandwidth())
                    .attr("height", function (d) { return height - y(d.rating); });
            });

        }, 0)

    }
});