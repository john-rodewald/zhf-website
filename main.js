window.onload = (event) => {
  const debugEl = document.querySelector("#debug");
  if (window.location.hash === "#debug") debugEl.style["display"] = "block";
  const debugPre = debugEl.querySelector("pre");
  debugPre.innerText = [
    `user agent: ${window.navigator.userAgent}`,
    `client size: ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
  ].join("\n");

  const ostGeb4 = ol.proj.fromLonLat([8.81653368473053, 47.22318649291992]);
  const pinFeature = new ol.Feature({
    geometry: new ol.geom.Point(ostGeb4),
  });
  pinFeature.setStyle(
    new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        opacity: 1,
        scale: 0.7,
        src: "assets/map_pin.svg",
      }),
    }),
  );
  const pinLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [pinFeature],
    }),
  });
  const tileLayer = new ol.layer.Tile({
    source: new ol.source.OSM(),
  });
  const map = new ol.Map({
    target: "map",
    layers: [tileLayer, pinLayer],
    view: new ol.View({
      center: ostGeb4,
      zoom: 16,
    }),
  });
};
