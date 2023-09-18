document.addEventListener("customEvent", () => {
  const mapContainer = document.getElementById("map-container");
  if (mapContainer) {
    const view = new ol.View({
      center: [848815.9677932085, 6793107.086027243], //fromLonLat([0, 0]),
      zoom: 12,
      maxZoom: 20,
      minZoom: 1,
    });
    const map = new ol.Map({
      target: "map-container",
      view: view
    });

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
        url: "../showcase-backend/src/school-address/bootstrap/geodaten_schulen.geojson",
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

    document.addEventListener("setMyLocation", (coords) => {
      ol.proj.useGeographic();
      console.log(coords.detail.coords);

      const myLocation = new ol.Feature({
        geometry: new ol.geom.Point(coords.detail.coords),
      });
      // console.log(myLocation);
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
      // const myLocationVectorLayer = new ol.layer.Vector({
      //   source: new ol.source.Vector({
      //     features: [myLocation],
      //   }),
      //   visible: true,
      // });
      // map.addLayer(myLocationVectorLayer)
    });



    const layerGroup = new ol.layer.Group({
      layers: [osmStandard, vectorSchool],
    });
    map.addLayer(layerGroup);

    
  }
});

// hubraum, 21, Winterfeldtstraße, Schöneberg, Tempelhof-Schöneberg, Berlin, 10781, Deutschland
// 64, Mühlhäuser Straße, Mauritz-Ost, Münster-Ost, Münster, Nordrhein-Westfalen, 48155, Deutschland
