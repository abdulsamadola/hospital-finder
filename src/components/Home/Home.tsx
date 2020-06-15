import React, { useState, useEffect, useContext } from "react";
import { CloseOutlined, LogoutOutlined } from "@ant-design/icons";
import { useLazyQuery } from "@apollo/react-hooks";
import firebase from "../../Services/firebase";
import ShowHospitals from "../ShowHospitals/ShowHospitals";
import Api from "../../Services/dataService";
import { useDebounce } from "../../hooks";
import app from "../../Services/firebase";
import { AuthContext } from "../../routes/Auth";
import { GET_HEALTH_PLACES, GET_PLACES_AUTOCOMPLETE } from "../../queries/";

import {
  Menu,
  Layout,
  Typography,
  Input,
  List,
  Spin,
  Dropdown,
  Button,
  Space,
} from "antd";
import {
  SearchOutlined,
  DownOutlined,
  PullRequestOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import colors from "../../styles";
import { IHospital } from "../../common";

const { Header } = Layout;
const { Title } = Typography;

const Home = (): JSX.Element => {
  //Hooks
  const [results, setResults] = useState<any[]>([]);
  const [historyResults, setHistoryResults] = useState<any[]>([]);
  const [hospitalResults, setHospitalResults] = useState<IHospital[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWaitingForData, setIsWaitingForData] = useState<boolean>(true);
  const [
    isWaitingForAutoCompleteData,
    setIsWaitingForAutoCompleteData,
  ] = useState<boolean>(true);
  const [isHistoryButtonClick, setIsHistoryButtonClick] = useState<boolean>(
    false
  );
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [coordinate, setCoordinate] = useState<object>({});
  const [getHospitals, { data, loading, error }] = useLazyQuery(
    GET_HEALTH_PLACES
  );
  const [
    getPlacesAutocomplete,
    { data: placesAutocompleteData },
  ] = useLazyQuery(GET_PLACES_AUTOCOMPLETE);
  //Handle User Input From Search Bar
  const onInputChange = (input: string): void => {
    setInput(input);
  };

  //Debounce User Input for 500s before making network request
  const debouncedInput = useDebounce(input, 500);

  //Make a request to Autocomplete Google API
  const placesAutoCompleteHandler = (input: string): void => {
    if (debouncedInput === "") return;
    //setIsLoading(true);
    setIsHistoryButtonClick(false);

    getPlacesAutocomplete({
      variables: { input },
    });
    setIsWaitingForAutoCompleteData(true);
  };
  //Check whetther graphql has returned results for places autocomplete

  if (
    placesAutocompleteData &&
    placesAutocompleteData.placesautocomplete &&
    isWaitingForAutoCompleteData
  ) {
    setIsWaitingForAutoCompleteData(false);
    setResults(placesAutocompleteData.placesautocomplete.predictions);
  }

  //Make a request to the Google place API with the user coordinate
  const getAddressCoordinate = (
    user_id: string,
    placeID: string,
    address: string,
    description: string
  ): void => {
    setInput(address);
    setHospitalResults([]);
    setResults([]);
    setIsLoading(true);
    Api.getAddressCoordinate(placeID).then(({ result }) => {
      //lat and lng
      const coordinate = result.geometry.location;
      setCoordinate(coordinate);

      //Get Nearby Hospital by invoking this function
      fetchHospitalsHandler(coordinate);
    });

    //Save the address/placeID  as history on Firebase
    saveAddressOnFirebase({ user_id, placeID, address, description });
  };

  //Save user Search History to the Firebase
  const saveAddressOnFirebase = (data: {
    user_id: string;
    placeID: string;
    address: string;
    description: string;
  }): void => {
    const findPlace = historyResults.find((res) => res.placeID == data.placeID);
    const db = firebase.firestore();
    if (!findPlace) db.collection("search-histories").add(data);
  };

  //Fetch Nearby hospital by user coordinate with 1000m as a initial radius.
  const fetchHospitalsHandler = (coord: object): void => {
    setIsFocus(false);
    setIsHistoryButtonClick(false);
    setIsLoading(true);
    setResults([]);
    Api.getHospitals(coord, 1000).then(({ results }) => {
      setHospitalResults(results);
      setIsLoading(false);
    });
  };

  //GET HOSPITAL BY DISTANCE
  function getHospitalsByDistance(e: any): void {
    setHospitalResults([]);
    setIsLoading(true);
    setIsHistoryButtonClick(false);
    const radius = parseInt(e.key);
    Api.getHospitals(coordinate, radius).then(({ results }): void => {
      setHospitalResults(results);
      setIsLoading(false);
    });
  }
  //Debounce the search bar input
  useEffect((): void => {
    placesAutoCompleteHandler(debouncedInput);
  }, [debouncedInput]);

  useEffect(() => {
    setIsLoading(true);
    //Get User Current coordinate
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position: Position): void => {
        const coord = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoordinate(coord);
        fetchHospitalsHandler(coord);
      });
    //Listen for Realtime data from the firestore
    const db = firebase.firestore();
    return db.collection("search-histories").onSnapshot((snapShot) => {
      const historyData: any[] = [];
      snapShot.forEach((doc) =>
        historyData.push({ ...doc.data(), id: doc.id })
      );
      //Filter History For Current user
      const filterHistoryForCurrentUser = historyData.filter(
        (histy) => histy.user_id == user_id
      );
      setHistoryResults(filterHistoryForCurrentUser.reverse());
    });
  }, []);

  //Clear Saved search historys(for all) on Firestore
  const clearRecentSearchHistories = async () => {
    const db = firebase.firestore();
    const history = await db.collection("search-histories");
    historyResults.forEach((doc) => history.doc(doc.id).delete());
  };

  //Clear Saved search history(single) on Firestore
  const clearSearchHistory = async (id: string) => {
    const db = firebase.firestore();
    const history = await db.collection("search-histories");
    history.doc(id).delete();
  };

  //Menu Item for Changing Radius
  const menu = (
    <Menu onClick={getHospitalsByDistance}>
      <Menu.Item key="5000" icon={<PullRequestOutlined />}>
        5KM
      </Menu.Item>
      <Menu.Item key="10000" icon={<PullRequestOutlined />}>
        10KM
      </Menu.Item>
      <Menu.Item key="20000" icon={<PullRequestOutlined />}>
        20KM
      </Menu.Item>
      <Menu.Item key="30000" icon={<PullRequestOutlined />}>
        30KM
      </Menu.Item>
      <Menu.Item key="50000" icon={<PullRequestOutlined />}>
        50KM
      </Menu.Item>
    </Menu>
  );

  //Listener for detecting search history icon clicks
  const historyViewHandler = (): void => {
    setResults([]);
    setIsHistoryButtonClick(!isHistoryButtonClick);
  };
  const suggestionCardStyle = {
    width: "50vw",
    alignSelf: "center",
    marginTop: 0,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    zIndex: 999999999,
    backgroundColor: "#fff",
  };

  //To be called when enter button hits to search specific terms like pharmacy || medical e.t.c
  const searchSubmissionHandler = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    setHospitalResults([]);
    setIsLoading(true);
    setIsHistoryButtonClick(false);

    if (
      input.includes("medical") ||
      input.includes("hospital") ||
      input.includes("clinic") ||
      input.includes("hospital") ||
      input.includes("pharmacy")
    ) {
      setIsWaitingForData(true);
      getHospitals({
        variables: { query: input },
      });
      if (data && data.places) setHospitalResults(data.places.results);
    }
  };

  //Check whetther graphql has returned results for hospitals locations
  if (data && data.places && isWaitingForData) {
    setIsWaitingForData(false);
    setHospitalResults(data.places.results);
    setIsLoading(false);
  }

  //Get current UID from the context
  const { currentUser } = useContext(AuthContext);
  const user_id = currentUser["uid"];

  return (
    <div>
      {/* <NavBar /> */}
      <Header className="header" style={{ backgroundColor: colors.blue }}>
        <div
          className="logo"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Title
            style={{
              color: colors.white,
              paddingTop: 18,
            }}
            level={4}
          >
            Hospital Finder
          </Title>
          {/* <SearchForm /> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
                zIndex: 99999,
              }}
            >
              <form onSubmit={(e) => searchSubmissionHandler(e)}>
                <Input
                  size="large"
                  onChange={(e) => onInputChange(e.target.value)}
                  onFocus={() => {
                    setIsFocus(true);
                    setIsHistoryButtonClick(false);
                  }}
                  value={input}
                  style={{
                    alignSelf: "center",
                    width: "40vw",
                    boxShadow: "none",
                    outlineColor: "transparent",
                  }}
                  placeholder="Type location..."
                  prefix={<SearchOutlined />}
                  suffix={<HistoryOutlined onClick={historyViewHandler} />}
                />
              </form>

              <div>
                <Dropdown overlay={menu}>
                  <Button size="large">
                    Distance <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
              <span
                style={{
                  marginLeft: 100,
                  color: colors.white,
                  cursor: "pointer",
                }}
                onClick={() => app.auth().signOut()}
              >
                <LogoutOutlined />
                {"  "} Sign Out
              </span>
            </div>
            {/* Suggestion Card */}
            <div style={suggestionCardStyle}>
              {isFocus && results.length > 0 && (
                // <SearchSuggestions data={results} />
                <div className="demo-infinite-container">
                  <List
                    dataSource={results}
                    renderItem={({ structured_formatting: item, place_id }) => (
                      <List.Item
                        onClick={() =>
                          getAddressCoordinate(
                            user_id,
                            place_id,
                            item["main_text"],
                            item["secondary_text"]
                          )
                        }
                        key={item["main_text"]}
                      >
                        <List.Item.Meta
                          title={item["main_text"]}
                          description={item["secondary_text"]}
                        />
                      </List.Item>
                    )}
                  ></List>
                </div>
              )}
            </div>
            {/* History Card */}
            <div style={suggestionCardStyle}>
              {isHistoryButtonClick && historyResults.length > 0 && (
                <span
                  onClick={() => {
                    if (window.confirm("Clear Recent Searches ?")) {
                      clearRecentSearchHistories();
                    }
                  }}
                >
                  Clear Recent Searches
                </span>
              )}

              {isHistoryButtonClick && (
                // <SearchSuggestions data={results} />

                <div
                  className="demo-infinite-container"
                  onBlur={() => setIsHistoryButtonClick(false)}
                >
                  <List
                    dataSource={historyResults}
                    renderItem={({ placeID, address, description, id }) => (
                      <List.Item key={placeID}>
                        <div
                          style={{ marginLeft: 10, textAlign: "left" }}
                          onClick={() =>
                            getAddressCoordinate(
                              user_id,
                              placeID,
                              address,
                              description
                            )
                          }
                        >
                          <List.Item.Meta
                            title={address}
                            description={description}
                          />
                        </div>

                        <CloseOutlined
                          style={{ marginRight: 50 }}
                          onClick={() => {
                            if (window.confirm("Remove this Search ?")) {
                              clearSearchHistory(id);
                            }
                          }}
                        />
                      </List.Item>
                    )}
                  ></List>
                </div>
              )}
            </div>
          </div>
        </div>
      </Header>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 100,
          }}
        >
          <Space size="large">
            <Spin size="large" tip="Loading, please wait..." />
          </Space>
        </div>
      )}
      {hospitalResults.length > 0 && (
        <div onClick={() => setIsFocus(false)}>
          <ShowHospitals data={hospitalResults} />
        </div>
      )}
      {!isLoading && hospitalResults.length <= 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 100,
            color: colors.red,
          }}
        >
          <p>
            {`Opps! we couldn't find any nearby Hospitals.\n
              Suggestions:\n
              Try different locations.\n
              Try more general locations.\n
              Select a distance 
        `}{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
