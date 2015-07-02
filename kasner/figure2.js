(function() {

  var dim = 360,
      numPoints = 1,
      startX = -0.499341960797,
      startY = -0.866404989706,
      strokeWidth = 4/dim,
      PI = Math.PI,
      triangleLines = [{x1: 2, y1: 0, x2: -1, y2: Math.sqrt(3)},
                       {x1: 2, y1: 0, x2: -1, y2: -Math.sqrt(3)},
                       {x1: -1, y1: -Math.sqrt(3), x2: -1, y2: Math.sqrt(3)}];

  var svg = d3.select("#figure2").append("svg")
      .attr("width", dim)
      .attr("height", dim)
    .append("g")
      .attr("transform", "translate(" + dim/2 + "," + dim/2 + ")" + " scale(" + dim/4 + ")")
    .append("g")
      .attr("transform", "translate(-0.5, 0)");

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

  var ringpaths = svg.append("g").attr("id", "ringpaths");

  // 36/(dim/4)/2
  // 36/(dim/4)
  var knob = svg.append("g")
      .attr("transform", "translate(-0.144, -0.144)")
    .selectAll("image")
      .data([{x: startX, y: startY}])
    .enter().append("image")
      .attr("class", "control")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", 0.288)
      .attr("height", 0.288)
      .attr("xlink:href", "knob.png")
      .call(d3.behavior.drag()
        .on("dragstart", function(d) {
          this.__origin__ = [d.x, d.y];
          svg.select("image.control")
            .attr("xlink:href", "knobdrag.png")
        })
        .on("drag", function(d) {
          x = Math.min(2, Math.max(-2, this.__origin__[0] += d3.event.dx));
          y = Math.min(2, Math.max(-2, this.__origin__[1] += d3.event.dy));
          angle = Math.atan2(y, x);
          d.x = Math.cos(angle);
          d.y = Math.sin(angle);
          svg.select("image.control")
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; });

          pathPoints(angle, numPoints);
        })
        .on("dragend", function() {
          svg.select("image.control")
            .attr("xlink:href", "knob.png")
          delete this.__origin__;
        }));


  function pathPoints(angle, n) {

    if (angle < 0) {
      angle += 2*PI;
    }

    var points = [];
    var labels = [];
    for (i = 0; i < n; i++) {
      result = nextAngle(angle);

      label = result[0];
      labels.push(label);

      theta = result[1];
      points.push({x1: Math.cos(angle), y1: Math.sin(angle),
                   x2: Math.cos(theta), y2: Math.sin(theta)});

      angle = theta;
      if (angle < 0) {
        angle += 2*PI;
      }
    }

    d3.select("#ringlabel").html("Path sequence: " + labels);

    var pathLines = ringpaths.selectAll("line.ringpath").data(points, function(d, i) { return i; });
    pathLines.enter().append("line").call(setPathLineAttrs);
    pathLines.exit().remove();
    pathLines.call(setPathLineAttrs);
  }


  function setPathLineAttrs(items) {
    items
      .attr("class", "ringpath")
      .attr("x1", function(d) { return d.x1; })
      .attr("x2", function(d) { return d.x2; })
      .attr("y1", function(d) { return d.y1; })
      .attr("y2", function(d) { return d.y2; })
      .attr("stroke-width", strokeWidth)
      .attr("stroke", "black")
      .attr("stroke-linecap", "round");
  }


  function nextAngle(angle) {
    if (angle >= PI/3 && angle < 2*PI/3) {
      return [2, -Math.acos((5 * Math.cos(angle - 2*PI/3) - 4) / (4 * Math.cos(angle - 2*PI/3) - 5)) + 2*PI/3];
    }
    else if (angle >= 2*PI/3 && angle < PI) {
      return [2, Math.acos((5 * Math.cos(angle - 2*PI/3) - 4) / (4 * Math.cos(angle - 2*PI/3) - 5)) + 2*PI/3];
    }
    else if (angle >= PI && angle < 4*PI/3) {
      return [1, -Math.acos((5 * Math.cos(angle - 4*PI/3) - 4) / (4 * Math.cos(angle - 4*PI/3) - 5)) + 4*PI/3];
    }
    else if (angle >= 4*PI/3 && angle < 5*PI/3) {
      return [1, Math.acos((5 * Math.cos(angle - 4*PI/3) - 4) / (4 * Math.cos(angle - 4*PI/3) - 5)) + 4*PI/3];
    }
    else if (angle >= 5*PI/3 && angle < 2*PI) {
      return [0, -Math.acos((5 * Math.cos(angle - 2*PI) - 4) / (4 * Math.cos(angle - 2*PI) - 5)) + 2*PI];
    }
    else {
      return [0, Math.acos((5 * Math.cos(angle) - 4) / (4 * Math.cos(angle) - 5))];
    }
  }


  d3.select("input").on("change", function() {
    numPoints = this.value;
  });

})();
