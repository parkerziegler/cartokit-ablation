async function send(duration, file) {
  const existingMetrics = await fetchExistingMetrics(file);
  const newMetric = {
    duration,
    playwrightWorkflowId: "workflow-3",
    programId: "program-2",
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
    paint: { "fill-color": "#80235a", "fill-opacity": 0.75 },
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

  console.log("fe", feDuration, "program-2");
  console.log("fe-idle", feIdleDuration, "program-2");
});
