<script context="module">
  import * as d3 from "d3";
  import * as topojson from "topojson-client";

  // FIXME: WIP. Doesn't work, but should? I think it's mostly because there were 60 D3/topojson versions released
  // since this was written. Would appreciate anyone taking a stab at this, because the globe is cool.

  // Each entry: [name, lat, lon]
  var city_data = [
    // 2016
    ["Berlin", "52.52", "13.41"],
    ["Pittsburgh", "40.44", "-79.99"],
    // 2017
    ["Kyiv", "50.45", "30.52"],
    ["Mexico City", "19.43", "-99.13"],
    ["Portland", "45.52", "-122.67"],
    ["Zurich", "47.36", "8.55"],
    ["Columbus", "39.98", "-82.98"],
    // 2018
    ["Nairobi", "-01.29", "36.82"],
    ["Paris", "48.85", "02.35"],
    ["Rome", "41.90", "12.49"],
    // 2019
    ["Beijing", "39.90", "116.40"],
    ["Lima", "-12.02", "-77.26"],
    ["Barcelona", "41.38", "2.173"],
  ];

  var width = 960,
    height = 500;

  var centroid = d3.geoPath().projection(function (d) {
    return d;
  }).centroid;

  var projection = d3.geoOrthographic().scale(248).clipAngle(90);

  var path = d3.geoPath().projection(projection);

  var graticule = d3.geoGraticule().extent([
    [-180, -90],
    [180 - 0.1, 90 - 0.1],
  ]);

  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  var line = svg
    .append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

  svg
    .append("circle")
    .attr("class", "graticule-outline")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", projection.scale());

  var locations = svg.append("svg:g").attr("id", "locations");

  var rotate = d3_geo_greatArcInterpolator();

  d3.json("/globe.json").then(function (world) {
    console.log(world);

    var country = svg
      .append("path")
      .datum(topojson.feature(world, world.objects.countries))
      .attr("path", ".graticule")
      .attr("class", "country")
      .attr("d", path);

    var cities = locations
      .selectAll("path")
      .data(city_data)
      .enter()
      .append("svg:path")
      .datum(function (d) {
        return {
          type: "Point",
          // d3 wants longitude THEN latitude!!!
          coordinates: [d[2], d[1]],
        };
      })
      .attr("class", "geo-node")
      .attr("d", path.pointRadius(5))
      .attr("d", path)
      .style("fill", "red");
    globe_rotate();

    function globe_rotate() {
      d3.transition()
        .duration(10)
        .tween("rotate", function () {
          var orig = projection.rotate();
          rotate
            .source(projection.rotate())
            .target([orig[0] + 1, 0])
            .distance();
          return function (t) {
            projection.rotate(rotate(t));
            country.attr("d", path);
            line.attr("d", path);
            cities.attr("d", path);
          };
        })
        .transition()
        .each("end", globe_rotate);
    }
  });

  var d3_radians = Math.PI / 180;

  function d3_geo_greatArcInterpolator() {
    var x0, y0, cy0, sy0, kx0, ky0, x1, y1, cy1, sy1, kx1, ky1, d, k;

    function interpolate(t) {
      var B = Math.sin((t *= d)) * k,
        A = Math.sin(d - t) * k,
        x = A * kx0 + B * kx1,
        y = A * ky0 + B * ky1,
        z = A * sy0 + B * sy1;
      return [
        Math.atan2(y, x) / d3_radians,
        Math.atan2(z, Math.sqrt(x * x + y * y)) / d3_radians,
      ];
    }

    interpolate.distance = function () {
      if (d == null)
        k =
          1 /
          Math.sin(
            (d = Math.acos(
              Math.max(
                -1,
                Math.min(1, sy0 * sy1 + cy0 * cy1 * Math.cos(x1 - x0)),
              ),
            )),
          );
      return d;
    };

    interpolate.source = function (_) {
      var cx0 = Math.cos((x0 = _[0] * d3_radians)),
        sx0 = Math.sin(x0);
      cy0 = Math.cos((y0 = _[1] * d3_radians));
      sy0 = Math.sin(y0);
      kx0 = cy0 * cx0;
      ky0 = cy0 * sx0;
      d = null;
      return interpolate;
    };

    interpolate.target = function (_) {
      var cx1 = Math.cos((x1 = _[0] * d3_radians)),
        sx1 = Math.sin(x1);
      cy1 = Math.cos((y1 = _[1] * d3_radians));
      sy1 = Math.sin(y1);
      kx1 = cy1 * cx1;
      ky1 = cy1 * sx1;
      d = null;
      return interpolate;
    };

    return interpolate;
  }
</script>

<style>
  .country {
    fill: #b8b8b8;
    stroke: #fff;
    stroke-width: 0.5px;
    stroke-linejoin: round;
  }

  .graticule {
    fill: none;
    stroke: #000;
    stroke-opacity: 0.3;
    stroke-width: 0.5px;
  }

  .graticule-outline {
    fill: none;
    stroke: #333;
    stroke-width: 1.5px;
  }

  text {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 18px;
    font-weight: bold;
    text-anchor: middle;
  }

  svg {
    margin-left: -125px;
  }
</style>
