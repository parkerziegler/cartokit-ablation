performance.mark("fe-start");

// Begin program.
import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const map = new mapboxgl.Map({
  container: "map",
  style: "https://tiles.stadiamaps.com/styles/stamen_toner_lite.json",
  center: [-121.86074218749962, 37.85337240117401],
  zoom: 7.972206002103116,
});
map.on("load", () => {
  map.addSource("winter-temperature-change__1", {
    type: "geojson",
    data: "https://pub-7182966c1afe48d3949439f93d0d4223.r2.dev/wapo-winter-temperature-change.json",
  });
  map.addLayer({
    id: "winter-temperature-change__1",
    source: "winter-temperature-change__1",
    type: "fill",
    paint: {
      "fill-color": [
        "step",
        ["get", "decadal_rate"],
        "#feedde",
        -0.5,
        "#fdbe85",
        0.2543131636946486,
        "#fd8d3c",
        0.46037549407114764,
        "#e6550d",
        0.6887119906741191,
        "#a63603",
      ],
      "fill-opacity": 0.75,
    },
  });
});

// End program.
performance.mark("fe-end");

map.once("idle", () => {
  performance.mark("fe-ttq-end");

  const { duration: feDuration } = performance.measure(
    "fe",
    "fe-start",
    "fe-end"
  );
  const { duration: feIdleDuration } = performance.measure(
    "fe-ttq",
    "fe-start",
    "fe-ttq-end"
  );

  console.log("fe", feDuration, "program-5");
  console.log("fe-ttq", feIdleDuration, "program-5");
});
