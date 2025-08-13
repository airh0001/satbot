import React from "react";
import Map from "react-map-gl";

export default function MapView() {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Map
        initialViewState={{
          longitude: 78.9629,
          latitude: 20.5937,
          zoom: 4
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      />
    </div>
  );
}