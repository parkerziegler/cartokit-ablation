performance.mark("fe-start");

// Begin program.
import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";
import mapboxgl from "mapbox-gl";
import americanCrowRange from "./data/wapo-american-crow-population-range.json";
import americanCrowPopulationChange from "./data/wapo-american-crow-population-change.json";
mapboxgl.accessToken =
  "pk.eyJ1IjoicGFya2VyemllZ2xlciIsImEiOiJjbG5tYm01Mm0yNWQ2Mm9wZTMzbXVmMW5hIn0.BNtWKuymyJJh-eEWoGuhCg";
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
  map.addSource("american-crow-population-change__2", {
    type: "geojson",
    data: americanCrowPopulationChange,
  });
  map.addLayer({
    id: "american-crow-range__1",
    source: "american-crow-range__1",
    type: "fill",
    paint: { "fill-color": "#ffffff" },
  });
  map.addLayer({
    id: "american-crow-population-change__2",
    source: "american-crow-population-change__2",
    type: "fill",
    paint: { "fill-color": "#6ae6fd", "fill-opacity": 0.75 },
  });
  map.addLayer({
    id: "american-crow-population-change__2-stroke",
    source: "american-crow-population-change__2",
    type: "line",
    paint: { "line-color": "#6ae6fd" },
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
