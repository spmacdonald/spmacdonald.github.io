// Adapted from an example by Mike Bostock.

(function() {
  var w = 360,
      h = 360,
      r = 13;

  var periodicNodes = {"012": true, "021": true, "0102": true, "0121": true, "0201": true, "0212": true};

  var tree = d3.layout.tree()
      .size([w - 2 * r, h - 2 * r]);

  var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x]; });

  var vis = d3.select("#figure3-1").append("svg:svg")
      .attr("width", w)
      .attr("height", h)
    .append("svg:g")
      .attr("transform", "translate(0," + r + ")");

  d3.json("tree.json", function(json) {

    var nodes = tree.nodes(json).reverse();

    var link = vis.selectAll("path.link")
        .data(tree.links(nodes))
      .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.svg.diagonal());

    var node = vis.selectAll("g.node")
        .data(nodes);

    var nodeEnter = node.enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .on("click", function(d) { redrawWedge(d.name); });

    nodeEnter.append("svg:circle")
        .attr("r", r)
        .style("stroke", "black")
        .style("fill", function(d) { return d.name in periodicNodes ? "#1B9E77" : "white"; });

    nodeEnter.append("svg:text")
        .attr("x", function(d) { return d.children; })
        .attr("dy", ".30em")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.name; })
  })

  //////////////////////////////////////////////////////////////////////////////////////////
  // Draw wedges
  //

  var dim = 360,
      strokeWidth = 4/dim,
      PI = Math.PI,
      triangleLines = [{x1: 2, y1: 0, x2: -1, y2: Math.sqrt(3)},
                       {x1: 2, y1: 0, x2: -1, y2: -Math.sqrt(3)},
                       {x1: -1, y1: -Math.sqrt(3), x2: -1, y2: Math.sqrt(3)}];

  var svg = d3.select("#figure3-2").append("svg")
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

  var labelGroup = svg.append("g")
      .attr("class", "svg_label")
      .attr("font-size", "0.15pt");

  labelGroup.append("text")
      .attr("x", triangleLines[0].x1)
      .attr("y", triangleLines[0].y1)
      .append("tspan")
        .attr("dx", 0.15/2)
        .attr("dy", 0.15/2)
        .text(0);

  labelGroup.append("text")
      .attr("x", triangleLines[1].x2)
      .attr("y", triangleLines[1].y2)
      .append("tspan")
        .attr("dx", -0.15)
        .attr("dy", 0.0)
        .text(1);

  labelGroup.append("text")
      .attr("x", triangleLines[0].x2)
      .attr("y", triangleLines[0].y2)
      .append("tspan")
        .attr("dx", -0.15)
        .attr("dy", 0.15)
        .text(2);


  function redrawWedge(pathString) {

    var w = calculateWedgeAngles(pathString);
    var path = svg.selectAll("path").data(w, function(d) { return d.path;} );

    path.enter().insert("svg:path")
        .attr("class", "animated-path")
        .attr("d", function(d) { return wedge(d.angles); })
        .attr("fill", "#1B9E77")
        .attr("stroke", "none")
        .attr("fill-opacity", 1e-6)
      .transition()
        .delay(function(d, i) { return 750*i; })
        .attr("fill-opacity", 0.5);

    path.transition()
        .delay(function(d, i) { return 750*i; })
        .attr("fill-opacity", 0.5);

    path.exit().remove();
  }


  function wedge(d) {

    d.sort();

    return "M" + Math.cos(d[0])
         + "," + Math.sin(d[0])
         + "A1,1 0 0,1"
         + "," + Math.cos(d[1])
         + "," + Math.sin(d[1])
         + "L" + Math.cos(d[2])
         + "," + Math.sin(d[2])
         + "A1,1 0 0,1"
         + "," + Math.cos(d[3])
         + "," + Math.sin(d[3])
         + "L" + Math.cos(d[0])
         + "," + Math.sin(d[0]);
  }


  function calculateWedgeAngles(p) {

    var t0 = -PI / 3;
    var t1 = PI / 3;
    var t2 = 0;
    var t3 = 0;

    var result = [];

    var n = p.length;
    for (var i = 1; i <= 2 * n + 1; i++) {
      var idx = p[i % n];
      t2 = lastAngle(t0, idx);
      t3 = lastAngle(t1, idx);
      result.push({path: p, angles: [t0 < 0 ? t0 + 2*PI : t0,
                                     t1 < 0 ? t1 + 2*PI : t1,
                                     t2 < 0 ? t2 + 2*PI : t2,
                                     t3 < 0 ? t3 + 2*PI : t3]});
      t0 = t2;
      t1 = t3;
    }

    return result.slice(1, result.length);
  }


  function lastAngle(th, i) {
    if (th < 0) {
      th += 2 * PI;
    }

    if (th >= PI / 3 && th < PI) {
      if (i == 0) {
        return Math.acos((5 * Math.cos(th) - 4) / (4 * Math.cos(th) - 5));
      }
      else if (i == 1) {
        return -Math.acos((5 * Math.cos(th + 2 * PI / 3) - 4) / (4 * Math.cos(th + 2 * PI / 3) - 5) ) - 2 * PI / 3;
      }
      else {
        return th;
      }
    }

    else if (th >= PI && th < 5 * PI / 3) {
      if (i == 0) {
        return -Math.acos((5 * Math.cos(th) - 4) / (4 * Math.cos(th) - 5));
      }
      else if (i == 2) {
        return Math.acos((5 * Math.cos(th - 2 * PI / 3) - 4) / (4 * Math.cos(th - 2 * PI / 3) - 5)) + 2 * PI / 3;
      }
      else {
        return th;
      }
    }

    else {
      if (i == 1) {
        return Math.acos((5 * Math.cos(th + 2 * PI / 3) - 4) / (4 * Math.cos(th + 2 * PI / 3) - 5)) - 2 * PI / 3;
      }
      else if (i == 2) {
        return -Math.acos((5 * Math.cos(th + 4 * PI / 3) - 4) / (4 * Math.cos(th + 4 * PI / 3) - 5)) - 4 * PI / 3;
      }
      else {
        return th;
      }
    }
  }

})();
