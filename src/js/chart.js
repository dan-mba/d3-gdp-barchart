import * as d3 from 'd3'

function billions(num) {
  if (num > 1000)
    return (num/1000).toLocaleString() + " trillion";
  return num.toLocaleString() + " billion";
}

function chart(data){
  const w = 1200;
  const svgWidth = document.getElementById("bar-chart").getBoundingClientRect().width;
  const h = 800;
  const svgHeight =  document.getElementById("bar-chart").getBoundingClientRect().height
  const xPadding = 30;
  const yPadding = 60;
  
  const bar_w = (w-2*xPadding)/data.length;
  const bar_ct = data.length;
  
  //Configure scaling functions
  const yScale = d3.scaleLinear()
                   .domain([0,d3.max(data, function(d) { return d["GDPA"]/1000;})])
                   .range([h-yPadding,yPadding]);
  const xScale = d3.scaleTime()
                   .domain([new Date(d3.min(data,function(d) { return d["DATE"];})),
                            new Date(d3.max(data,function(d) { return d["DATE"]}))])
                   .range([xPadding,w-xPadding])
  
  // Configure SVG area
  const svg = d3.select("#bar-chart")
                .append("svg")
                .attr("width", document.getElementById("bar-chart").getBoundingClientRect().width)
                .attr("height", document.getElementById("bar-chart").getBoundingClientRect().height)
                .attr("viewBox", `0 0 ${w} ${h}`);
  
  // Draw bars
  var rects = svg.selectAll("rect");
  rects.data(data)
       .enter()
       .append("rect")
       .attr("x", function(d,i) { return xPadding+i*bar_w+1;})
       .attr("y", function(d) { return yScale(d["GDPA"]/1000);})
       .attr("width", Math.floor(bar_w)-4)
       .attr('height', function(d) { return h-yScale(d["GDPA"]/1000)-yPadding;})
       .attr("class","bar")
       .attr("data-date", function(d) { return d["DATE"];})
       .attr("data-gdp", function(d) { return d["GDPA"];})
        // Setup tooltip
       .on("mouseover",function(event, d) {
          var i = svg.selectAll("rect").nodes().indexOf(event.currentTarget);
          d3.select("#tooltip")
            .classed("hidden",false)
            .style("left", function() {
              return xZero  + scale * (i * bar_w) - ((i/bar_ct)*110) + "px";
            })
            .style("top",function() {
              return (.5 * svgHeight) - (.4 * h * scale)  + "px";
            })
            .html(`${billions(d["GDPA"])}<br>${d["DATE"].split("-")[0]}`)
            .attr("data-date",d["DATE"]);
       })
       .on("mouseout", function(){
          d3.select("#tooltip")
            .classed("hidden", true);
       })

  const box = d3.select("#bar-chart svg").node().getBBox();
  // absolute postition of x-axis zero point 
  let xZero = box.x;
  // scaling factor compared to viewBox
  let scale = Math.min(svgWidth/w, svgHeight/h);
  if (box.width > w) { 
    xZero += (svgWidth - w) / 2;
  } else {
    xZero += (svgWidth - (scale * w)) / 2;
  }

  // Setup Axis labels
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  
  svg.append("g")
     .attr("transform","translate(0," + (h-yPadding) + ")")
     .attr("id","x-axis")
     .call(xAxis)
     .selectAll("text")
     .attr("y", -2)
     .attr("x", 32)
     .attr("transform","rotate(60)")
  
  svg.append("g")
     .attr("transform","translate(" + xPadding + ",0)")
     .attr("id","y-axis")
     .call(yAxis);
}

export default chart
