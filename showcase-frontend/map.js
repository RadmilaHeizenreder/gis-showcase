const mapContainer = document.getElementById("map-container");
  if (mapContainer) {
    console.log("ich bin in mapContainer");
    const map = new ol.Map({
      target: "map-container",
      view: new ol.View({
        center: [848815.9677932085, 6793107.086027243], //fromLonLat([0, 0]),
        zoom: 12,
      }),
    });

    /* =========== Basemap Layers ============== */
    const osmStandard = new ol.layer.Tile({
      source: new ol.source.OSM(),
      visible: true,
      title: "OSM",
    });

    /* =========== Basemap Layers ============== */
    const vectorSchool = new ol.layer.Vector({
      source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: "../showcase-backend/src/data/geodaten_schulen.geojson",
      }),
      visible: true,
      title: "Schulen",
      style: {
        "fill-color": "rgba(255,255,145,2)",
        "stroke-color": "#000000",
        "stroke-width": 2,
        "circle-radius": 4,
        "circle-fill-color": "#000000",
      },
    });

    const layerGroup = new ol.layer.Group({
      layers: [osmStandard, vectorSchool],
    });

    map.addLayer(layerGroup);

    document.addEventListener("setCenter", (coords) => {
      console.log(coords.detail.coords);
      map.getView().setCenter(coords.detail.coords);
      const marker = new ol.Feature({
        geometry: new ol.geom.Point(
          [coords.detail.coords]
        ),
      });
      const vectorSource = new ol.source.Vector({
        features: [marker],
      });
      const markerLayer = new ol.layer.Vector({
        source: vectorSource,
      });
      map.addLayer(markerLayer);
    });
    
    
    
  }
/* document.addEventListener("customEvent", () => {
  
}); */
