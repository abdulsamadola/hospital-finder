export interface IHospital {
  business_status?: string;
  formatted_address: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
    viewport?: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest?: {
        lat: number;
        lng: number;
      };
    };
  };
  icon: string;
  id?: string;
  name: string;
  opening_hours?: {
    open_now: boolean;
  };
  place_id?: string;
  plus_code?: {
    compound_code: string;
    global_code: string;
  };
  rating?: number;
  reference?: string;
  types?: [];
  user_ratings_total?: number;
}

export interface IFirebase {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface IJustifyCenter {
  display: string;
  justifyContent: string;
  alignItems: string;
  flexDirection: string;
  marginTop: number;
  color?: string;
  left?: string;
  fontSize?: number;
}
