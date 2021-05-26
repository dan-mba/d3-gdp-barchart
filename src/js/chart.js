import * as d3 from 'd3'

function billions(num) {
  if (num > 1000)
    return (num/1000).toLocaleString() + " trillion";
  return num.toLocaleString() + " billion";
}

function chart(data){
  const w = document.getElementById("bar-chart").getBoundingClientRect().width;
  const h = Math.min(document.getElementById("bar-chart").getBoundingClientRect().height,w/1.5);
  const xPadding = 20;
  const yPadding = 40;
  
  const bar_w = (w-2*xPadding)/data.data.length;
  const bar_ct = data.data.length;
  
  //Configure scaling functions
  const yScale = d3.scaleLinear()
                   .domain([0,d3.max(data.data, function(d) { return d[1]/1000;})])
                   .range([h-yPadding,yPadding]);
  const xScale = d3.scaleTime()
                   .domain([new Date(d3.min(data.data,function(d) { return d[0];})),
                            new Date(d3.max(data.data,function(d) { return d[0];}))])
                   .range([xPadding,w-xPadding])
  
  // Configure SVG area
  const svg = d3.select("#bar-chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
  
  // Draw bars
  var rects = svg.selectAll("rect");
  rects.data(data.data)
       .enter()
       .append("rect")
       .attr("x", function(d,i) { return xPadding+i*bar_w;})
       .attr("y", function(d) { return yScale(d[1]/1000);})
       .attr("width", bar_w)
       .attr('height', function(d) { return h-yScale(d[1]/1000)-yPadding;})
       .attr("class","bar")
       .attr("data-date", function(d) { return d[0];})
       .attr("data-gdp", function(d) { return d[1];})
        // Setup tooltip
       .on("mouseover",function(event, d) {
          var i = svg.selectAll("rect").nodes().indexOf(event.currentTarget);
          d3.select("#tooltip")
            .classed("hidden",false)
            .style("left", function() {
              return xPadding+i*bar_w-((i/bar_ct)*110) + "px";
            })
            .style("top",function() {
              return (yPadding + (.1 * box.height)) + "px";
            })
            .html("$" + billions(d[1])+ " <br>" + d[0])
            .attr("data-date",d[0]);
       })
       .on("mouseout", function(){
          d3.select("#tooltip")
            .classed("hidden", true);
       })

  const box = d3.select("#bar-chart svg").node().getBBox();
  // Setup Axis labels
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  
  svg.append("g")
     .attr("transform","translate(0," + (h-yPadding) + ")")
     .attr("id","x-axis")
     .call(xAxis)
     .selectAll("text")
     .attr("y",-5)
     .attr("x",20)
     .attr("transform","rotate(90)")
  
  svg.append("g")
     .attr("transform","translate(" + xPadding + ",0)")
     .attr("id","y-axis")
     .call(yAxis);
}

export default chart