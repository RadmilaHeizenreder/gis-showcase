'use strict';

let map, view, layerGroup, vectorMyLocation, source;

document.addEventListener("customEvent", () => {
  const mapContainer = document.querySelector("#map-container"); 
  if (mapContainer) {
    view = new ol.View({
      center: [848815.9677932085, 6793107.086027243], //fromLonLat([0, 0]), // proj - EPSG: 3857
      zoom: 12,
      maxZoom: 20,
      minZoom: 1,
    });
    map = new ol.Map({
      target: "map-container",
      view: view
    });
    ol.proj.useGeographic();

    /* =========== Basic Layer ============== */
    const osmStandard = new ol.layer.Tile({
      source: new ol.source.OSM(),
      visible: true,
      title: "OSM",
    });

    /* =========== Vector Layer School ============== */
    const vectorSchool = new ol.layer.Vector({
      source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: "./data/geodaten_schulen.geojson",
      }),
      visible: true,
      title: "Schulen",
      updateWhileAnimating: true,
      style: {
        "fill-color": "rgba(255,255,145,2)",
        "stroke-color": "#000000",
        "stroke-width": 2,
        "circle-radius": 4,
        "circle-fill-color": "#000000",
      },
    });

    /* =========== Vector Layer MyLocation ============== */
    source = new ol.source.Vector({
      wrapX: false,
      format: new ol.format.GeoJSON()
    });
    vectorMyLocation = new ol.layer.Vector({
      source: source,
      style: {
        "fill-color": "rgba(255,255,145,2)",
        "stroke-color": "#000000",
        "stroke-width": 5,
        "circle-radius": 10,
        "circle-fill-color": "#ffcc35",
      },
    });

    map.addLayer(osmStandard)
    map.addLayer(vectorSchool);
    
  }

  
});

document.addEventListener("setMyLocation", (coords) => {
  // ol.proj.useGeographic();
  console.log(coords.detail.coords);

  const myLocation = new ol.Feature({
    geometry: new ol.geom.Point(coords.detail.coords),
  });
  myLocation.setStyle(
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: "red",
        }),
      }),
    })
  );

  vectorMyLocation = new ol.layer.Vector({
    proj: ol.proj.useGeographic(),
    source: new ol.source.Vector({
      features: [myLocation],
    }),
    visible: true,
  });

  map.addLayer(vectorMyLocation)
});



