import React, { useContext, useRef, useEffect, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  LoadScript,
  OverlayView,
  OverlayViewF,
} from "@react-google-maps/api";
import { motion } from "framer-motion";
import { FiZoomOut, FiZoomIn } from "react-icons/fi";
import { SourceContext } from "@/Context/MapContext/SourceContext";
import { DestinationContext } from "@/Context/MapContext/DestinationContext";
import { Button } from "@nextui-org/react";
import { FormattedMessage } from "react-intl";
import { IoMdClose } from "react-icons/io";
import { get } from "http";
interface MapExportProps {
  province: string;
  district: string;
  town: string;
  detailadress: string;
  latitude: number;
  longitude: number;
  onUpdateLocation: (lat: number, lng: number) => void;
}
const MapExport: React.FC<MapExportProps> = ({
  province,
  district,
  town,
  detailadress,
  latitude,
  longitude,
  onUpdateLocation,
}) => {
  const address = `${detailadress}, ${town}, ${district}, ${province}`;

  const containerstyles = {
    width: "100%",
    height: "100%",
  };
  const [coordinate, setCoordinate] = useState({
    lat: latitude,
    lng: longitude,
  });
  useEffect(() => {
    const loadGeocoder = async () => {
      if (window.google) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: address }, function (results, status) {
          if (status === window.google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              const location = results[0].geometry.location;
              const lat = location.lat();
              const lng = location.lng();
              setCoordinate({ lat, lng });
            } else {
              console.error("No results found");
            }
          } else {
            console.error("Geocoder failed due to: " + status);
          }
        });
      } else {
        console.log("no google");
      }
    };

    loadGeocoder();
  }, [address]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDQ0pDRDKSyAO4lm10ttEXa2_uoZmWQzHc">
      <GoogleMap
        mapContainerStyle={containerstyles}
        center={{
          lat: coordinate.lat,
          lng: coordinate.lng,
        }}
        zoom={20}
      >
        <MarkerF
          position={{
            lat: coordinate.lat,
            lng: coordinate.lng,
          }}
          draggable={true}
          onDragEnd={(e) => {
            onUpdateLocation(e.latLng.lat(), e.latLng.lng());
            setCoordinate({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            });
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapExport;
