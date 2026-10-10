'use client';

import { useState } from 'react';
import { MapPin, Navigation, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationPickerProps {
  onLocationSelect: (location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    lat: number;
    lng: number;
  }) => void;
}

export function LocationPickerMap({ onLocationSelect }: LocationPickerProps) {
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [detectedAddress, setDetectedAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError('GPS Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCoords({ lat, lng });

        try {
          // Reverse geocode lat/lng to real address via OpenStreetMap Nominatim API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await response.json();

          if (data && data.address) {
            const addr = data.address;
            const street = [addr.road, addr.suburb, addr.neighbourhood, addr.residential]
              .filter(Boolean)
              .join(', ') || data.display_name.split(',')[0];

            const city = addr.city || addr.town || addr.village || addr.county || 'Mumbai';
            const state = addr.state || 'Maharashtra';
            const pincode = addr.postcode ? addr.postcode.replace(/[^0-9]/g, '') : '';

            const fullFormattedAddress = `${street}, ${city}`;
            setDetectedAddress(fullFormattedAddress);

            onLocationSelect({
              address: street || fullFormattedAddress,
              city,
              state,
              pincode,
              lat,
              lng,
            });
          } else {
            setDetectedAddress(`GPS Coords: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
            onLocationSelect({
              address: `GPS Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
              city: 'Mumbai',
              state: 'Maharashtra',
              pincode: '400008',
              lat,
              lng,
            });
          }
        } catch {
          setDetectedAddress(`GPS Coords: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          onLocationSelect({
            address: `GPS Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400008',
            lat,
            lng,
          });
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError('Location permission denied. Please allow location access in your browser or enter address manually.');
        } else {
          setError('Unable to retrieve your current location. Please enter address manually.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="bg-[#FAF9F6] border border-neutral-300 p-4 space-y-3 rounded-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-neutral-200 pb-3">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2 py-0.5 border border-amber-200 inline-block mb-1">
            📍 Live GPS Auto-Fill
          </span>
          <h3 className="font-heading text-sm font-bold uppercase text-black">
            Detect Delivery Location On Map
          </h3>
        </div>

        <Button
          type="button"
          onClick={detectLocation}
          disabled={loading}
          className="bg-black text-white hover:bg-neutral-800 rounded-none text-xs font-bold uppercase tracking-wider h-9 px-4 flex items-center gap-1.5"
        >
          {loading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Detecting GPS...</span>
            </>
          ) : (
            <>
              <Navigation className="h-3.5 w-3.5 text-amber-400" />
              <span>Use My Current Location</span>
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="text-xs text-red-600 bg-red-50 p-2.5 border border-red-200">
          {error}
        </div>
      )}

      {detectedAddress && (
        <div className="bg-emerald-50 border border-emerald-300 p-3 text-xs text-emerald-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Location Auto-Filled Successfully!
          </div>
          <p className="text-[11px] text-emerald-800">
            Detected: <strong>{detectedAddress}</strong>
          </p>
        </div>
      )}

      {/* Interactive Map Embed */}
      {coords ? (
        <div className="relative aspect-[16/9] w-full border border-neutral-300 overflow-hidden bg-neutral-100">
          <iframe
            title="Live Shipping Map Location"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.01}%2C${coords.lat - 0.01}%2C${coords.lng + 0.01}%2C${coords.lat + 0.01}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`}
            className="w-full h-full"
          />
          <div className="absolute bottom-2 left-2 bg-black text-white text-[10px] font-mono px-2 py-1 uppercase tracking-widest font-bold">
            📍 DELA Delivery Pin ({coords.lat.toFixed(4)}, {coords.lng.toFixed(4)})
          </div>
        </div>
      ) : (
        <div className="p-4 bg-white border border-neutral-200 text-center text-xs text-neutral-500 space-y-1">
          <p className="font-medium text-neutral-800">Click &quot;Use My Current Location&quot; above to auto-fill street address &amp; pin exact location on map.</p>
          <p className="text-[11px]">Or enter your delivery address manually in the form fields below.</p>
        </div>
      )}
    </div>
  );
}
