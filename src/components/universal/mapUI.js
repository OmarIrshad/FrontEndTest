import React from 'react'
import { GoogleMap, Marker, MarkerClusterer, useJsApiLoader } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import mapStyle from "../../styles/customer/map.css";
const containerStyle = {
  width: '70vw',
  height: '65vh'
};

const center = {
  lat: 30.612308755724264,
  lng: -96.34130658312687,
};
const libraries = ["places"];
const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

/**
 * react component to render the map
 * @function
 * @author @OmarIrshad @ThucTran
 */
function MyMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC4LMdEMeuSYC-xjV2W3EXEDa-7nUi6JpU',
    libraries,
  });

  const [map, setMap] = React.useState(null);
  const mapRef = React.useRef();

  const onLoad = React.useCallback((map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  return isLoaded ? (
    <div className='map'>
      <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={20}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
      >
        {/* {<Marker position={center} label={{color: "white", text: "MSC CFA"}}/>} */}
        <></>
      </GoogleMap>
    </div>
  ) : <></>
}
function Search({ panTo }) {
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 30.62113219621122,
        lng: () => -96.34038303246915,
      },
      radius: 10 * 1000
    }
  });

  return (
    <div className="search">
      <Combobox onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions()
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          console.log({ lat, lng });
          panTo({ lat, lng });
        }
        catch (error) {
          console.log("error")
        }
      }}>
        <ComboboxInput value={value}
          onChange={(e) => { setValue(e.target.value); }}
          disabled={!ready}
          placeholder="enter an address"
        />
        <ComboboxPopover>
          {status === "OK" && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default React.memo(MyMap, Search)