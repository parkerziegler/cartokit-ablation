async function send(duration, file) {
  const existingMetrics = await fetchExistingMetrics(file);
  const newMetric = {
    duration,
    playwrightWorkflowId: "workflow-3",
    programId: "program-3",
  };

  const command = new PutObjectCommand({
    Bucket: "cartokit",
    Key: file,
    Body: JSON.stringify(existingMetrics.concat(newMetric), null, 2),
    ContentType: "application/json",
  });

  await client.send(command);
}

performance.mark("fe-start");

// Begin program.
import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoicGFya2VyemllZ2xlciIsImEiOiJjbG5tYm01Mm0yNWQ2Mm9wZTMzbXVmMW5hIn0.BNtWKuymyJJh-eEWoGuhCg";
import * as d3 from "d3";

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
  center: [-121.86074218749962, 37.85337240117401],
  zoom: 7.972206002103116,
});
map.on("load", async () => {
  const data = await fetchGeoJSON(
    "https://pub-7182966c1afe48d3949439f93d0d4223.r2.dev/wapo-winter-temperature-change.json"
  );

  performance.mark("fe-computation-start");
  const fillColor = deriveColorScale(data.features, "index", 5);
  performance.mark("fe-computation-end");

  map.addSource("winter-temperature-change__1", {
    type: "geojson",
    data: "https://pub-7182966c1afe48d3949439f93d0d4223.r2.dev/wapo-winter-temperature-change.json",
  });
  map.addLayer({
    id: "winter-temperature-change__1",
    source: "winter-temperature-change__1",
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
    map.getSource("winter-temperature-change__1") &&
    map.isSourceLoaded("winter-temperature-change__1")
  ) {
    performance.mark("fe-ttq-end");
    const { duration } = performance.measure(
      "fe-ttq",
      "fe-start",
      "fe-ttq-end"
    );

    console.log("fe-ttq", duration, "program-3");
  }
});
