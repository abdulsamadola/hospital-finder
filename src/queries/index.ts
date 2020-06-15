import { gql } from "apollo-boost";

export const GET_HEALTH_PLACES = gql`
  query Places($query: String!) {
    places(query: $query) {
      results {
        id
        icon
        rating
        geometry {
          location {
            lat
            lng
          }
        }
        formatted_address
        name
        opening_hours {
          open_now
        }
      }
    }
  }
`;

export const GET_PLACES_AUTOCOMPLETE = gql`
  query PlaceAutocomplete($input: String!) {
    placesautocomplete(input: $input) {
      predictions {
        place_id
        structured_formatting {
          main_text
          secondary_text
        }
      }
    }
  }
`;
