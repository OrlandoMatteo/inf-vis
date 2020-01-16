var LineChart = function () {
    var self = this;
    var format_time = d3.timeFormat("%H:%M:%S");       // parse date
    var margin = {top: 30, right: 15, bottom: 20, left: 50};

    /* Sets selector of block where chart would be placed */
    this.selector = function (s) {
        self._selector = s;
        return self;
    };

    self.data_collector = [];

    this.init = function () {
        var height = 400 - margin.top - margin.bottom;
        var width = parseInt($(self._selector).css('width')) - margin.left - margin.right;

        self.x = d3.scaleTime().range([0, width]);
        self.y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
        self.xAxis = d3.axisBottom(self.x)
            .tickFormat(d3.timeFormat("%H:%M:%S"));

        self.yAxis = d3.axisLeft(self.y);

        self.svg = d3.select(self._selector)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        self.axisX = self.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(self.xAxis);

        self.axisY = self.svg.append("g")
            .attr("class", "y axis")
            .call(self.yAxis);

        // Add the title
        self.title = self.svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("");

        
        self.path = self.svg.append("path")
            .datum(self.data_collector)
            .attr("class", "area")
            .attr("d", self.area);

        self.div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
    };
    function _slideDataPoint(datum, i) {
        return {x: (i-1)/10, y:datum.y}
      }

    this.tick = function (dato){
        // Grab the path
    var path = d3.select("path")
    // Grab the data from the path
    var data = path.data()

    // Slap a new random point to the end of the data
    data.push(dato)
    // Get rid of the first point
    data.shift()

    // Adjust the X value for each point
    for (i = 0; i < data.length; i++) {
      data[i] = _slideDataPoint(data[i], i)
    }

    // Apply the new data to the path and re-draw. 
    path
      .data([data])
      .transition()
        .duration(1000)
        // Use a linear easing to keep an even scroll
        .ease("linear")
        .attr("d", d3.svg.line()
          .x(function(d) {return x(d.x)})
          .y(function(d) {return y(d.y)})
          // I'm not sure if this is the interpolation that works best, but I
          // can't find a better one...
          .interpolate("basis")
        )   
  }
};