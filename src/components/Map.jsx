import React, { useRef, useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Draw from "ol/interaction/Draw";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";
import { LiaDrawPolygonSolid } from "react-icons/lia";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { MapLogo } from "../assets/index";

const MapComponent = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [source, setSource] = useState(new VectorSource({ wrapX: false }));
  const [draw, setDraw] = useState(null);
  const [drawingMode, setDrawingMode] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);

  useEffect(() => {
    const raster = new TileLayer({
      source: new OSM(),
    });

    const vector = new VectorLayer({
      source: source,
    });

    const mapInstance = new Map({
      target: mapContainer.current,
      layers: [raster, vector],
      view: new View({
        center: fromLonLat([78.96, 20.59]),
        zoom: 5,
      }),
    });

    setMap(mapInstance);

    // Add example locations as markers
    const locations = [
      {
        id: "Location 1",
        name: "Location 1",
        coordinates: [75.739639, 26.907524],
      },
      { id: "Location 2", name: "Location 2", coordinates: [76.68, 12.12] },
      {
        id: "Location 3",
        name: "Location 3",
        coordinates: [74.629997, 24.879999],
      },
      {
        id: "Location 4",
        name: "Location 4",
        coordinates: [73.300003, 16.994444],
      },
      {
        id: "Location 5",
        name: "Location 5",
        coordinates: [72.849998, 19.155001],
      },
      { id: "Location 6", name: "Location 6", coordinates: [73.055, 24.7945] },
      { id: "Location 7", name: "Location 7", coordinates: [81.629997, 21.25] },
      {
        id: "Location 8",
        name: "Location 8",
        coordinates: [74.833298, 16.1667],
      },
      { id: "Location 9", name: "Location 9", coordinates: [80.949997, 26.85] },
      {
        id: "Location 10",
        name: "Location 10",
        coordinates: [77.06971, 28.679079],
      },
    ];

    const markerFeatures = locations.map((location) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(location.coordinates)),
        name: location.name,
      });
      feature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: MapLogo,
          }),
        })
      );
      return feature;
    });

    source.addFeatures(markerFeatures);
    setMarkers(markerFeatures);
  }, [source]);

  const enableDrawMode = (freehand = false) => {
    if (draw) {
      map.removeInteraction(draw);
    }
    const drawInteraction = new Draw({
      source: source,
      type: "Polygon",
      freehand: freehand,
    });

    map.addInteraction(drawInteraction);
    setDraw(drawInteraction);

    drawInteraction.on("drawend", (event) => {
      const polygonCoordinates = event.feature
        .getGeometry()
        .getCoordinates()[0];
      filterMarkersInSelectedArea(polygonCoordinates);
      setDrawingMode(false);
    });

    drawInteraction.on("propertychange", (event) => {
      const polygonCoordinates = event.feature
        .getGeometry()
        .getCoordinates()[0];
      filterMarkersInSelectedArea(polygonCoordinates);
      setDrawingMode(false);
    });

    setDrawingMode(true);
  };

  const filterMarkersInSelectedArea = (polygonCoordinates) => {
    showAllMarkers();
    const filteredMarkers = markers.filter((marker) => {
      const markerCoordinates = marker.getGeometry().getCoordinates();
      const markerLngLat = [markerCoordinates[0], markerCoordinates[1]];
      return isMarkerInPolygon(markerLngLat, polygonCoordinates);
    });

    setFilteredMarkers(filteredMarkers);

    filteredMarkers.forEach((marker) => {
      if (!source.hasFeature(marker)) {
        source.addFeature(marker);
      }
    });

    markers.forEach((marker) => {
      if (!filteredMarkers.includes(marker)) {
        source.removeFeature(marker);
      }
    });
  };  

  const isMarkerInPolygon = (markerLngLat, polygonCoordinates) => {
    const pointGeoJSON = point(markerLngLat);
    const polygonGeoJSON = {
      type: "Polygon",
      coordinates: [polygonCoordinates],
    };
    return booleanPointInPolygon(pointGeoJSON, polygonGeoJSON);
  };

  const showAllMarkers = () => {
    markers.forEach((marker) => {
      if (!source.hasFeature(marker)) {
        source.addFeature(marker);
      }
    });
  };

  const finishDrawing = () => {
    setDrawingMode(false);
    showAllMarkers();
    if (draw) {
      map.removeInteraction(draw);
    }
  };

  const cancelDrawing = () => {
    if (draw) {
      source.removeFeature(draw.sketchFeature_);
      map.removeInteraction(draw);
      source.clear(draw.sketchFeature_);
    }
    setDrawingMode(false);
    showAllMarkers();
  };

  const deleteAll = () => {
    setDrawingMode(false);
    source.clear();
    if (draw) {
      map.removeInteraction(draw);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={mapContainer}
        style={{
          position: "relative",
          width: "60%",
          height: "500px",
          margin: "0 auto",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "20%",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <button onClick={() => enableDrawMode(false)}>
          <LiaDrawPolygonSolid style={{ fontSize: 25 }} />
        </button>
        <button
          onClick={() => enableDrawMode(true)}
          style={{ marginLeft: 10, marginRight: 10 }}
        >
          <FaPen style={{ fontSize: 25 }} />
        </button>
        {drawingMode && (
          <>
            <button onClick={finishDrawing}>Finish</button>
            <button onClick={cancelDrawing}>Cancel</button>
          </>
        )}
        <button onClick={cancelDrawing}>
          <MdDelete style={{ fontSize: 25 }} />
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
