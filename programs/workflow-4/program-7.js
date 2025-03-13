performance.mark("fe-start");

// Begin program.
import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";
import mapboxgl from "mapbox-gl";
import transponderGaps from "./data/wapo-fishing-boat-transponder-gaps.json";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const map = new mapboxgl.Map({
  container: "map",
  style: "https://tiles.stadiamaps.com/styles/stamen_toner_lite.json",
  center: [-38.03890879151288, -22.746267141714],
  zoom: 3.006948499474222,
});
map.on("load", () => {
  map.addSource("transponder-gaps__1", {
    type: "geojson",
    data: transponderGaps,
  });
  map.addLayer({
    id: "transponder-gaps__1",
    source: "transponder-gaps__1",
    type: "fill",
    paint: {
      "fill-color": [
        "step",
        ["get", "count"],
        "#d73027",
        614.791,
        "#f46d43",
        973.836,
        "#fdae61",
        973.837,
        "#fee090",
        973.838,
        "#e0f3f8",
        973.839,
        "#abd9e9",
        973.84,
        "#74add1",
        973.841,
        "#4575b4",
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

  console.log("fe", feDuration, "program-7");
  console.log("fe-idle", feIdleDuration, "program-7");
});
