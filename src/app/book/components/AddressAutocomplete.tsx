import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Autocomplete } from '@react-google-maps/api'
import { useEffect, useState } from 'react'

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
  label?: string;
  className?: string;
}

export function AddressAutocomplete({
  label = 'Address',
  value,
  onChange,
  onPlaceSelected,
  className
}: AddressAutocompleteProps) {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(value);
  };

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place) {
        // Extract just the street address part
        const streetNumber = place.address_components?.find(component =>
          component.types.includes('street_number')
        )?.long_name || '';

        const route = place.address_components?.find(component =>
          component.types.includes('route')
        )?.long_name || '';

        const streetAddress = `${streetNumber} ${route}`.trim();

        setInputValue(streetAddress);
        onChange(streetAddress);
        onPlaceSelected(place);
      }
    }
  };

  const handleLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  useEffect(() => {
    if (value !== inputValue) {
      // Only update if the value is different and contains just a street address
      if (!value.includes(',')) {
        setInputValue(value);
      }
    }
  }, [value, inputValue]);

  return (
    <Autocomplete
      onLoad={handleLoad}
      onPlaceChanged={handlePlaceSelect}
      restrictions={{ country: "us" }}
    >
      <Input
        className={cn(
          'h-14 border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0',
          className
        )}
        value={inputValue}
        onChange={handleChange}
        label={label}
      />
    </Autocomplete>
  );
}