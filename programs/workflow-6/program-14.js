performance.mark("fe-start");

// Begin program.
import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";
import mapboxgl from "mapbox-gl";
import climateImpactRegions from "./data/wapo-climate-impact-regions.json";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const map = new mapboxgl.Map({
  container: "map",
  style: "https://tiles.stadiamaps.com/styles/stamen_toner_lite.json",
  center: [-98.35, 39.5],
  zoom: 4,
});
map.on("load", () => {
  map.addSource("climate-impact-regions__1", {
    type: "geojson",
    data: climateImpactRegions,
  });
  map.addLayer({
    id: "climate-impact-regions__1",
    source: "climate-impact-regions__1",
    type: "fill",
    paint: {
      "fill-color": [
        "step",
        ["get", "years_2080_2099"],
        "#1b7837",
        -200,
        "#5aae61",
        -100,
        "#a6dba0",
        -50,
        "#d9f0d3",
        0,
        "#e7d4e8",
        50,
        "#c2a5cf",
        100,
        "#9970ab",
        200,
        "#762a83",
      ],
      "fill-opacity": 0.75,
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

  console.log("fe", feDuration, "program-14");
  console.log("fe-idle", feIdleDuration, "program-14");
});
