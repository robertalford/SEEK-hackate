define(['knockout', 'data/data'], function (ko, data) {
    
    return function ViewModel(params) {
        setTimeout(function () {


      //load data as json
      var data = [
  {
    "company": "1",
    "dimension": "1",
    "value": "1.4"
  },
  {
    "company": "1",
    "dimension": "2",
    "value": "3.2"
  },
  {
    "company": "1",
    "dimension": "3",
    "value": "2"
  },
  {
    "company": "1",
    "dimension": "4",
    "value": "2.4"
  },
  {
    "company": "1",
    "dimension": "5",
    "value": "3.2"
  },
  {
    "company": "1",
    "dimension": "6",
    "value": "3"
  },
  {
    "company": "1",
    "dimension": "7",
    "value": "3.4"
  },
  {
    "company": "1",
    "dimension": "8",
    "value": "3"
  },
  {
    "company": "2",
    "dimension": "1",
    "value": "3"
  },
  {
    "company": "2",
    "dimension": "2",
    "value": "3.5"
  },
  {
    "company": "2",
    "dimension": "3",
    "value": "2.1"
  },
  {
    "company": "2",
    "dimension": "4",
    "value": "2.4"
  },
  {
    "company": "2",
    "dimension": "5",
    "value": "3.3"
  },
  {
    "company": "2",
    "dimension": "6",
    "value": "2.9"
  },
  {
    "company": "2",
    "dimension": "7",
    "value": "4"
  },
  {
    "company": "2",
    "dimension": "8",
    "value": "3"
  },
  {
    "company": "3",
    "dimension": "1",
    "value": "4.4"
  },
  {
    "company": "3",
    "dimension": "2",
    "value": "3"
  },
  {
    "company": "3",
    "dimension": "3",
    "value": "3"
  },
  {
    "company": "3",
    "dimension": "4",
    "value": "2.7"
  },
  {
    "company": "3",
    "dimension": "5",
    "value": "4.4"
  },
  {
    "company": "3",
    "dimension": "6",
    "value": "3"
  },
  {
    "company": "3",
    "dimension": "7",
    "value": "4.4"
  },
  {
    "company": "3",
    "dimension": "8",
    "value": "3"
  },
  {
    "company": "4",
    "dimension": "1",
    "value": "2"
  },
  {
    "company": "4",
    "dimension": "2",
    "value": "2"
  },
  {
    "company": "4",
    "dimension": "3",
    "value": "2.1"
  },
  {
    "company": "4",
    "dimension": "4",
    "value": "2.8"
  },
  {
    "company": "4",
    "dimension": "5",
    "value": "4.4"
  },
  {
    "company": "4",
    "dimension": "6",
    "value": "3.6"
  },
  {
    "company": "4",
    "dimension": "7",
    "value": "4"
  },
  {
    "company": "4",
    "dimension": "8",
    "value": "3.4"
  },
  {
    "company": "5",
    "dimension": "1",
    "value": "3.3"
  },
  {
    "company": "5",
    "dimension": "2",
    "value": "2"
  },
  {
    "company": "5",
    "dimension": "3",
    "value": "3"
  },
  {
    "company": "5",
    "dimension": "4",
    "value": "3.1"
  },
  {
    "company": "5",
    "dimension": "5",
    "value": "3.5"
  },
  {
    "company": "5",
    "dimension": "6",
    "value": "3.4"
  },
  {
    "company": "5",
    "dimension": "7",
    "value": "4.4"
  },
  {
    "company": "5",
    "dimension": "8",
    "value": "3.6"
  }
];



      var margin = { top: 50, right: 0, bottom: 100, left: 30 },
          width = 960 - margin.left - margin.right,
          height = 530 - margin.top - margin.bottom,
          gridSize = Math.floor(width / 16),
          legendElementWidth = gridSize*2,
          buckets = 5,
          colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
          companys = ["you", "industry", "comp x", "comp y", "comp z"],
          times = ["ov", "ca", "wl", "div", "env", "sal", "man", "ben"];

      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 
        
          var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
              .range(colors);

          var cards = svg.selectAll(".dimension")
              .data(data, function(d) {return d.company+':'+d.dimension;});

          cards.append("title");

          cards.enter().append("rect")
              .attr("x", function(d) { return (d.dimension - 1) * gridSize; })
              .attr("y", function(d) { return (d.company - 1) * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "dimension bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", colors[0]);

          cards.transition().duration(2000)
              .style("fill", function(d) { return colorScale(d.value); });

          cards.select("title").text(function(d) { return d.value; });
          
          cards.exit().remove();

        }, 0)



    }

});

