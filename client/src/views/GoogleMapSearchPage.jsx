import BoardingHousesList from "../components/BoardingHousesList";
import PlacesAutocomplete from "react-places-autocomplete";
import scriptLoader from "react-async-script-loader";

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function GoogleMapSearchPage() {
  const navigate = useNavigate();
  const [addressAuto, setAddress] = React.useState("");
  const handleChange = (value) => {
    setAddress(value);
  };
  const handleSelect = (value) => {
    setAddress(value);
  };

  const handleSearch = () => {
    navigate(`/cari/${addressAuto}`);
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBSGWwJ1H2sdpp0TKUIFyoY3vW10G2eiLs",
  });

  const { address } = useParams();

  console.log(address, "<<<address");
  const [localBoardingHouse, setLocalBoardingHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMarker, setActiveMarker] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:4000/user/searchboardinghouses", {
        params: { address: address },
      })
      .then((resp) => {
        setLocalBoardingHouses(resp.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [address]);
  if (loading) {
    return (
      <>
        <div className="mt-20 flex flex-row">Loading...</div>
      </>
    );
  }
  console.log(localBoardingHouse);
  const markers = localBoardingHouse.map((el, i) => {
    return {
      id: i + 1,
      name: el.name,
      price: el.price,
      position: {
        lat: el.location.coordinates[0],
        lng: el.location.coordinates[1],
      },
    };
  });
  console.log(markers, "<<<<<<,,");

  //   const [map, setMap] = React.useState(null)

  //   const onLoad = React.useCallback(function callback(map) {
  //     const bounds = new window.google.maps.LatLngBounds(location);
  //     map.fitBounds(bounds);
  // map.setZoom(zoom)
  //     setMap(map)
  //   }, [])

  //   const onUnmount = React.useCallback(function callback(map) {
  //     setMap(null)
  //   }, [])

  const OPTIONS = {
    minZoom: 4,
    maxZoom: 14,
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  return isLoaded && !loading ? (
    <>
      <div className="mr-20 mt-20 ml-20 px-10 flex flexrow align-center ">
        <h1 className=" pt-6 text-4xl text-blue-600 sm:text-5xl lg:text-3xl font-bold tracking-tighter leading-tight whitespace-nowrap">
          Cari kos melalui kolom pencarian
        </h1>
        <PlacesAutocomplete
          value={addressAuto}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => {
            return (
              <div className="pt-6">
                <input
                  className="rounded-lg w-[600px] ml-10 "
                  {...getInputProps({
                    placeholder: "Masukkan nama lokasi / daerah / alamat ...",
                  })}
                />
                <div>{loading && <div>Loading...</div>}</div>
                {suggestions.map((suggestion) => {
                  const style = suggestion.active
                    ? { backgroundColor: "#21E1E1", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        style,
                      })}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            );
          }}
        </PlacesAutocomplete>
        <button
          onClick={handleSearch}
          type="button"
          className="text-white h-[43px] ml-3 w-[100px] mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 "
        >
          Cari
        </button>
      </div>
      <div className="mt-5 flex flex-row">
        <div className="sticky top-20 mb-20 basis-1/2 h-screen ">
          <GoogleMap
            options={OPTIONS}
            mapContainerStyle={containerStyle}
            zoom={16}
            onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
          >
            {markers.map(({ id, name, position, price }) => (
              <Marker
                key={id}
                position={position}
                onClick={() => handleActiveMarker(id)}
              >
                {activeMarker === id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div>{name}</div>
                    <div>{price}</div>
                  </InfoWindow>
                ) : null}
              </Marker>
            ))}
          </GoogleMap>
        </div>
        <div className="basis-1/2">
          <h1 className="font-bold">Daftar kos di di sekitar {address}</h1>
          {/* {JSON.stringify(localBoardingHouse, null, 2)} */}
          <div className="mb-20">
            {localBoardingHouse.map((boardingHouse, index) => {
              return (
                <>
                  <BoardingHousesList
                    key={boardingHouse.id}
                    boardingHouse={boardingHouse}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="mt-20 flex flex-row">Loading...</div>
    </>
  );
}
