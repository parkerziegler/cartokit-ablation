performance.mark("fe-start");

// Begin program.
import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";
import mapboxgl from "mapbox-gl";
import * as d3 from "d3";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

async function fetchGeoJSON(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Failed to fetch GeoJSON at: " + url, error);
  }
}

function deriveQuantiles(domain, range) {
  const quantiles = d3.scaleQuantile().domain(domain).range(range).quantiles();

  return quantiles;
}

function computeDomain(features, attribute) {
  return features.map((feature) => feature.properties[attribute]);
}

function deriveColorScale(features, attribute, steps) {
  const domain = computeDomain(features, attribute);
  const range = d3.schemeOranges[steps];
  const quantiles = deriveQuantiles(domain, range);

  const prelude = ["step", ["get", attribute], range[0]];
  const stops = range.reduce(
    (acc, color, i) => (i === 0 ? acc : acc.concat([quantiles[i - 1], color])),
    []
  );

  return [...prelude, ...stops];
}

const map = new mapboxgl.Map({
  container: "map",
  style: "https://tiles.stadiamaps.com/styles/stamen_toner_lite.json",
  center: [-121.86074218749843, 37.853372401175406],
  zoom: 7.972206002103116,
});
map.on("load", async () => {
  const data = await fetchGeoJSON(
    "https://pub-7182966c1afe48d3949439f93d0d4223.r2.dev/wapo-spring-leaf-appearance.json"
  );

  performance.mark("fe-computation-start");
  const fillColor = deriveColorScale(data.features, "index", 5);
  performance.mark("fe-computation-end");

  map.addSource("spring-leaf-appearance__1", {
    type: "geojson",
    data: "https://pub-7182966c1afe48d3949439f93d0d4223.r2.dev/wapo-spring-leaf-appearance.json",
  });
  map.addLayer({
    id: "spring-leaf-appearance__1",
    source: "spring-leaf-appearance__1",
    type: "fill",
    paint: {
      "fill-color": fillColor,
      "fill-opacity": 0.75,
    },
  });

  // End computation.
  const { duration } = performance.measure("fe", "fe-start", "fe-end");
  const { duration: computationDuration } = performance.measure(
    "fe-computation",
    "fe-computation-start",
    "fe-computation-end"
  );

  console.log("fe", duration + computationDuration, "program-3");
});

// End program.
performance.mark("fe-end");

map.on("idle", () => {
  // Ensure the source data is loaded.
  if (
    map.getSource("spring-leaf-appearance__1") &&
    map.isSourceLoaded("spring-leaf-appearance__1")
  ) {
    performance.mark("fe-idle-end");
    const { duration } = performance.measure(
      "fe-idle",
      "fe-start",
      "fe-idle-end"
    );

    console.log("fe-idle", duration, "program-3");
  }
});
