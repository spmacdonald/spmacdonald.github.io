var dim = 144,
    strokeWidth = 4/dim,
    triangleLines = [{x1: 2, y1: 0, x2: -1, y2: Math.sqrt(3)},
                     {x1: 2, y1: 0, x2: -1, y2: -Math.sqrt(3)},
                     {x1: -1, y1: -Math.sqrt(3), x2: -1, y2: Math.sqrt(3)}];


var fig1 = drawRing("#figure1-1");

var fig2 = drawRing("#figure1-2");
fig2.append("circle")
    .attr("fill", "black")
    .attr("cx", 0.963525)
    .attr("cy", 0.267617)
    .attr("r", 0.1);

var fig3 = drawRing("#figure1-3");
fig3.append("circle")
    .attr("fill", "black")
    .attr("cx", 0.957980)
    .attr("cy", 0.286833)
    .attr("r", 0.1);
fig3.append("line")
    .attr("class", "intersection")
    .attr("x1", 2)
    .attr("x2", -0.6762403)
    .attr("y1", 0)
    .attr("y2", 0.73668104)
    .attr("stroke-width", strokeWidth)
    .attr("stroke", "black")
    .attr("stroke-linecap", "round")

var fig4 = drawRing("#figure1-4");
fig4.append("circle")
    .attr("fill", "black")
    .attr("cx", -0.6762403)
    .attr("cy", 0.73668104)
    .attr("r", 0.1);
fig4.append("line")
    .attr("class", "intersection")
    .attr("x1", 0.957980)
    .attr("x2", -0.6762403)
    .attr("y1", 0.286833)
    .attr("y2", 0.73668104)
    .attr("stroke-width", strokeWidth)
    .attr("stroke", "black")
    .attr("stroke-linecap", "round")
fig4.append("circle")
    .attr("fill", "grey")
    .attr("cx", 0.957980)
    .attr("cy", 0.286833)
    .attr("r", 0.1);

var fig5 = drawRing("#figure1-5");
fig5.append("circle")
    .attr("fill", "black")
    .attr("cx", -0.1134579)
    .attr("cy", -0.9935428)
    .attr("r", 0.1);
fig5.append("line")
    .attr("class", "intersection")
    .attr("x1", 0.957980)
    .attr("x2", -0.6762403)
    .attr("y1", 0.286833)
    .attr("y2", 0.73668104)
    .attr("stroke-width", strokeWidth)
    .attr("stroke", "black")
    .attr("stroke-linecap", "round")
fig5.append("line")
    .attr("class", "intersection")
    .attr("x1", -1)
    .attr("x2", -0.1134579)
    .attr("y1", Math.sqrt(3))
    .attr("y2", -0.9935428)
    .attr("stroke-width", strokeWidth)
    .attr("stroke", "black")
    .attr("stroke-linecap", "round")
fig5.append("circle")
    .attr("fill", "grey")
    .attr("cx", -0.6762403)
    .attr("cy", 0.73668104)
    .attr("r", 0.1);
fig5.append("circle")
    .attr("fill", "lightgrey")
    .attr("cx", 0.957980)
    .attr("cy", 0.286833)
    .attr("r", 0.1);


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
