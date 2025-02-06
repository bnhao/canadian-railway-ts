"use client";
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.gridlayer.googlemutant";
import { trackCoordinates } from "@/data/trackLocations";

interface CombinedMapProps {
  selectedTrack: string;
}

const CombinedMap: React.FC<CombinedMapProps> = ({ selectedTrack }) => {
  useEffect(() => {
    let map: L.Map | null = L.map("combined-map").setView(
      trackCoordinates[selectedTrack] || { lat: 51.0447, lng: -114.0719 }, // Default to Calgary
      10
    );

    // Add Google Maps layer
    const googleLayer = L.gridLayer.googleMutant({
      type: "roadmap", // Options: roadmap, satellite, terrain, hybrid
    });
    googleLayer.addTo(map);

    // Add railway WMS layer
    L.tileLayer.wms("https://maps.geogratis.gc.ca/wms/railway_en?", {
      layers: "railway.track",
      format: "image/png",
      transparent: true,
      attribution:
        "Map data © <a href='https://open.canada.ca/'>Government of Canada</a>",
    }).addTo(map);

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [selectedTrack]); // 👈 Track selection updates the map

  return (
    <div
      id="combined-map"
      style={{ height: "100%", width: "100%", borderRadius: "10px" }}
    ></div>
  );
};

export default CombinedMap;
