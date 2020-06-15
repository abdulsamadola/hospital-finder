const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLFloat,
  GraphQLSchema,
} = require("graphql");
const axios = require("axios");
const apiKey = "AIzaSyCvsGVV9Axy8TYVBW8qhyXeZF44zB4CJuo";
const corsURL = "https://enye-cors.herokuapp.com/";

//PlaceSearchByTextType
const PlaceByTextSearchType = new GraphQLObjectType({
  name: "PlaceSearchByText",
  fields: () => ({
    results: { type: new GraphQLList(PlaceResultsType) },
  }),
});

//PlaceResultsType
const PlaceResultsType = new GraphQLObjectType({
  name: "PlaceResults",
  fields: () => ({
    formatted_address: { type: GraphQLString },
    geometry: { type: geometryType },
    icon: { type: GraphQLString },
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    opening_hours: { type: openingHourType },
    place_id: { type: GraphQLString },
    rating: { type: GraphQLFloat },
  }),
});

//geometryType
const geometryType = new GraphQLObjectType({
  name: "Geometry",
  fields: () => ({
    location: {
      type: LocationType,
    },
  }),
});
//locationType
const LocationType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat },
  }),
});
//OpeningHourType
const openingHourType = new GraphQLObjectType({
  name: "OpeningHour",
  fields: () => ({
    open_now: { type: GraphQLBoolean },
  }),
});

//Place Autocomplete
const PlaceAutocompleteType = new GraphQLObjectType({
  name: "PlaceAutocomplete",
  fields: () => ({
    predictions: { type: new GraphQLList(PlacePredictionsType) },
  }),
});
//Place PredictionTYpe
const PlacePredictionsType = new GraphQLObjectType({
  name: "PlacePredictions",
  fields: () => ({
    structured_formatting: { type: StructureFormatingType },
    place_id: { type: GraphQLString },
  }),
});

//Structure FormatingType
const StructureFormatingType = new GraphQLObjectType({
  name: "StructureFormating",
  fields: () => ({
    main_text: { type: GraphQLString },
    secondary_text: { type: GraphQLString },
  }),
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    places: {
      type: PlaceByTextSearchType,
      args: { query: { type: GraphQLString } },
      resolve(parent, args) {
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${args.query}&key=${apiKey}`;
        return axios.get(url).then((info) => info.data);
      },
    },
    placesautocomplete: {
      type: PlaceAutocompleteType,
      args: { input: { type: GraphQLString } },
      resolve(parent, args) {
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${args.input}`;
        return axios.get(url).then((info) => info.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
