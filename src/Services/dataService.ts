/* @flow */
import axios from "axios";

const apiKey: string = "AIzaSyCvsGVV9Axy8TYVBW8qhyXeZF44zB4CJuo";
const corsURL = "https://enye-cors.herokuapp.com/";

export default {
  getPlacesAutocomplete: (input?: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${input}`;
    return axios
      .get(corsURL + url, {
        headers: {
          crossdomain: true,
        },
      })
      .then((info) => info.data);
  },
  getHospitals: (location: any, radius: number) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&type=hospital&location=${location["lat"]},${location["lng"]}&radius=${radius}`;
    return axios
      .get(corsURL + url, {
        headers: {
          crossdomain: true,
        },
      })
      .then((info) => info.data);
  },
  getAddressCoordinate: (place_id: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=geometry&key=${apiKey}`;
    return axios
      .get(corsURL + url, {
        headers: {
          crossdomain: true,
        },
      })
      .then((info) => info.data);
  },
};
