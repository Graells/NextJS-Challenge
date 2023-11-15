'use client';

import React, { useEffect, useRef, useState } from 'react';
import loadGoogleMapsApi from '@/services/GoogleMapsLoader';

interface MapProps {
  address: string;
}

const Mapa: React.FC<MapProps> = ({ address }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGoogleMapsApi();
  }, []);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) return;
      try {
        const { Geocoder } = (await google.maps.importLibrary(
          'geocoding',
        )) as google.maps.GeocodingLibrary;
        const geocoder = new Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === 'OK' && results && results[0]?.geometry?.location) {
            console.log(results);
            const map = new google.maps.Map(mapRef.current!, {
              center: results[0].geometry.location,
              zoom: 11,
            });
            new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
            });
          } else {
            console.error(
              `Geocode was not successful for the following reason: ${status}`,
            );
          }
        });
      } catch (error: any) {
        console.error(`Geocoding failed: ${error.message}`);
      }
    };
    initializeMap();
  }, [address]);

  return <div style={{ height: '400px' }} ref={mapRef} />;
};

export default Mapa;
