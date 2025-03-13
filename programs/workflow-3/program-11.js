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
        "#2c7bb6",
        -0.5,
        "#abd9e9",
        0,
        "#ffffbf",
        0.5,
        "#fdae61",
        1,
        "#d7191c",
      ],
    },
  });
});

// End program.
performance.mark("fe-end");

map.once("idle", () => {
  performance.mark("fe-idle-end");

  const { duration: feDuration } = performance.measure(
    "fe",
    "fe-start",
    "fe-end"
  );
  const { duration: feIdleDuration } = performance.measure(
    "fe-idle",
    "fe-start",
    "fe-idle-end"
  );

  console.log("fe", feDuration, "program-11");
  console.log("fe-idle", feIdleDuration, "program-11");
});
