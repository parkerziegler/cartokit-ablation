performance.mark("fe-start");

// Begin program.
import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";
import mapboxgl from "mapbox-gl";
import americanCrowRange from "./data/wapo-american-crow-population-range.json";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const map = new mapboxgl.Map({
  container: "map",
  style: "https://tiles.stadiamaps.com/styles/stamen_toner_lite.json",
  center: [-98.35, 39.5],
  zoom: 4,
});
map.on("load", () => {
  map.addSource("american-crow-range__1", {
    type: "geojson",
    data: americanCrowRange,
  });
  map.addLayer({
    id: "american-crow-range__1",
    source: "american-crow-range__1",
    type: "fill",
    paint: { "fill-color": "#ffffff", "fill-opacity": 0.75 },
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

  console.log("fe", feDuration, "program-3");
  console.log("fe-idle", feIdleDuration, "program-3");
});
