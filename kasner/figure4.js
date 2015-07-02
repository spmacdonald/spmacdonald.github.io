var dim = 144,
    strokeWidth = 4/dim,
    color1 = "#1B9E77",
    color2 = "#D95F02",
    color3 = "#7570B3",
    color4 = "#E7298A",
    color5 = "#66A61E",
    triangleLines = [{x1: 2, y1: 0, x2: -1, y2: Math.sqrt(3)},
                     {x1: 2, y1: 0, x2: -1, y2: -Math.sqrt(3)},
                     {x1: -1, y1: -Math.sqrt(3), x2: -1, y2: Math.sqrt(3)}];


// Panel 1
var fig1 = drawRing("#figure4-1");
var arc1 = d3.svg.arc()
    .startAngle(-Math.PI / 3 + Math.PI / 2)
    .endAngle(Math.PI / 3 + Math.PI / 2)
    .innerRadius(0.9)
    .outerRadius(1.1);
fig1.append("path")
    .attr("d", arc1())
    .style("fill", color1);


// Panel 2
var fig2 = drawRing("#figure4-2");
var arc2 = d3.svg.arc()
    .startAngle(-1.0471975512 + Math.PI / 2)
    .endAngle(-2.09439510239 + Math.PI / 2)
    .innerRadius(0.9)
    .outerRadius(1.1);
fig2.append("path")
    .attr("d", arc1())
    .style("fill", color1);
fig2.append("path")
    .attr("d", arc2())
    .style("fill", color2);


// Panel 3
var fig3 = drawRing("#figure4-3");
var arc3 = d3.svg.arc()
    .startAngle(2.09439510239 + Math.PI / 2)
    .endAngle(2.47464630908 + Math.PI / 2)
    .innerRadius(0.9)
    .outerRadius(1.1);
fig3.append("path")
    .attr("d", arc1())
    .style("fill", color1);
fig3.append("path")
    .attr("d", arc2())
    .style("fill", color2);
fig3.append("path")
    .attr("d", arc3())
    .style("fill", color3);


// Panel 4
var fig4 = drawRing("#figure4-4");
var arc4 = d3.svg.arc()
    .startAngle(-2.47464630908 + Math.PI / 2)
    .endAngle(-2.6564649054 + Math.PI / 2)
    .innerRadius(0.9)
    .outerRadius(1.1);
fig4.append("path")
    .attr("d", arc1())
    .style("fill", color1);
fig4.append("path")
    .attr("d", arc2())
    .style("fill", color2);
fig4.append("path")
    .attr("d", arc3())
    .style("fill", color3);
fig4.append("path")
    .attr("d", arc4())
    .style("fill", color4);


// Panel 5
var fig5 = drawRing("#figure4-5");
var arc5 = d3.svg.arc()
    .startAngle(-0.229921841004 + Math.PI / 2)
    .endAngle(-0.164584686481 + Math.PI / 2)
    .innerRadius(0.9)
    .outerRadius(1.1);
fig5.append("path")
    .attr("d", arc1())
    .style("fill", color1);
fig5.append("path")
    .attr("d", arc2())
    .style("fill", color2);
fig5.append("path")
    .attr("d", arc3())
    .style("fill", color3);
fig5.append("path")
    .attr("d", arc4())
    .style("fill", color4);
fig5.append("path")
    .attr("d", arc5())
    .style("fill", color5);

fig5.append("line")
    .attr("class", "ringpath")
    .attr("x1", Math.cos(2.2918661857))
    .attr("y1", Math.sin(2.2918661857))
    .attr("x2", Math.cos(4.658265465986654))
    .attr("y2", Math.sin(4.658265465986654))
    .attr("stroke-width", strokeWidth)
    .attr("stroke", "black")
    .attr("stroke-linecap", "round");

fig5.append("line")
    .attr("class", "ringpath")
    .attr("x1", Math.cos(4.658265465986654))
    .attr("y1", Math.sin(4.658265465986654))
    .attr("x2", Math.cos(6.085714223859748))
    .attr("y2", Math.sin(6.085714223859748))
    .attr("stroke-width", strokeWidth)
    .attr("stroke", "black")
    .attr("stroke-linecap", "round");

fig5.append("line")
    .attr("class", "ringpath")
    .attr("x1", Math.cos(6.085714223859748))
    .attr("y1", Math.sin(6.085714223859748))
    .attr("x2", Math.cos(3.7193149436224076))
    .attr("y2", Math.sin(3.7193149436224076))
    .attr("stroke-width", strokeWidth)
    .attr("stroke", "black")
    .attr("stroke-linecap", "round");

fig5.append("line")
    .attr("class", "ringpath")
    .attr("x1", Math.cos(3.7193149436224076))
    .attr("y1", Math.sin(3.7193149436224076))
    .attr("x2", Math.cos(2.2918661856370686))
    .attr("y2", Math.sin(2.2918661856370686))
    .attr("stroke-width", strokeWidth)
    .attr("stroke", "black")
    .attr("stroke-linecap", "round");



function drawRing(placeholder) {
  var svg = d3.select(placeholder).append("svg")
      .attr("width", dim)
      .attr("height", dim)
    .append("g")
      .attr("transform", "translate(" + dim/2 + "," + dim/2 + ")" + " scale(" + dim/4 + ")")
    .append("g")
      .attr("transform", "translate(-0.5, 0)");


  var ring = svg.append("circle")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", strokeWidth)
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 1);

  var line = svg.selectAll("line.triangle")
      .data(triangleLines)
    .enter().append("line")
      .attr("class", "triangle")
      .attr("x1", function(d) { return d.x1; })
      .attr("x2", function(d) { return d.x2; })
      .attr("y1", function(d) { return d.y1; })
      .attr("y2", function(d) { return d.y2; })
      .attr("stroke-width", strokeWidth)
      .attr("stroke", "black")
      .attr("stroke-linecap", "round")

  return svg;
}
