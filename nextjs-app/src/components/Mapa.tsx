'use client';

import React, { useEffect, useRef, useState } from 'react';
import loadGoogleMapsApi from '@/services/GoogleMapsLoader';
import { useSearch } from '@/contexts/SearchContext';

interface MapProps {
  address: string;
}

const Mapa: React.FC<MapProps> = ({ address }) => {
  const { removeSearch } = useSearch();
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
            console.log('results', results);
            console.log('status', status);
            const map = new google.maps.Map(mapRef.current!, {
              center: results[0].geometry.location,
              zoom: 14,
            });
            new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
            });
          } else if (status === 'ZERO_RESULTS') {
            removeSearch(address);
            alert(
              `Geocode was not successful for the following reason: ${status}`,
            );
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
  }, [address, removeSearch]);

  return (
    <div
      className="h-96 mt-6 mb-6 border-4 border-black"
      data-testid="mapSandbox"
      ref={mapRef}
    />
  );
};

export default Mapa;
