import React, { useState, useEffect } from "react";
import ShowHospitals from "../ShowHospitals/ShowHospitals";
import "./Home.scss";
import Api from "../../Services/dataService";
import { useDebounce } from "../../hooks";

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
} from "@ant-design/icons";
import colors from "../../styles";
import { IHospital } from "../../common";

const { Header } = Layout;
const { Title, Text } = Typography;

const Home = (): JSX.Element => {
  const [results, setResults] = useState<any[]>([]);
  const [hospitalResults, setHospitalResults] = useState<IHospital[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  // const [searchLoading, setSearchLoading] = useState<boolean>(true);
  const [coordinate, setCoordinate] = useState<object>({});

  function onInputChange(input: string): void {
    setInput(input);
  }

  const debouncedInput = useDebounce(input, 500);

  const placesAutoCompleteHandler = (input: string): void => {
    if (debouncedInput === "") return;
    setIsLoading(true);

    Api.getPlacesAutocomplete(input).then((res) => {
      setResults(res["predictions"]);
      setIsLoading(false);
    });
  };

  const getAddressCoordinate = (placeID: string, address: string): void => {
    setInput(address);
    setHospitalResults([]);
    setResults([]);
    setIsLoading(true);
    Api.getAddressCoordinate(placeID).then(({ result }) => {
      //lat and lng
      const coordinate = result.geometry.location;
      setCoordinate(coordinate);

      //Get Nearby Hospital
      fetchHospitalsHandler(coordinate);
    });
  };

  const fetchHospitalsHandler = (coord: object): void => {
    setIsFocus(false);
    setIsLoading(true);
    setResults([]);
    Api.getHospitals(coord, 1000).then(({ results }) => {
      setHospitalResults(results);
      setIsLoading(false);
    });
  };

  function getHospitalsByDistance(e: any): void {
    setHospitalResults([]);
    setIsLoading(true);
    const radius = parseInt(e.key);
    Api.getHospitals(coordinate, radius).then(({ results }): void => {
      setHospitalResults(results);
      setIsLoading(false);
    });
  }

  useEffect((): void => {
    placesAutoCompleteHandler(debouncedInput);
  }, [debouncedInput]);

  useEffect((): void => {
    setIsLoading(true);
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position: Position): void => {
        const coord = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoordinate(coord);
        fetchHospitalsHandler(coord);
      });
  }, []);

  const justifyCenter: any = {
    position: "absolute",
    top: "50vh",
    left: "50vw",
  };
  const menu = (
    <Menu onClick={getHospitalsByDistance} style={{ zIndex: 99999999999999 }}>
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
              <Input
                size="large"
                onChange={(e) => onInputChange(e.target.value)}
                onFocus={() => setIsFocus(true)}
                value={input}
                style={{
                  alignSelf: "center",
                  width: "40vw",
                  boxShadow: "none",
                  outlineColor: "transparent",
                }}
                placeholder="Type location..."
                prefix={<SearchOutlined />}
              />
              <div>
                <Dropdown overlay={menu}>
                  <Button size="large">
                    Distance <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>

            <div
              style={{
                width: "50vw",
                alignSelf: "center",
                marginTop: 0,
                borderRadius: 10,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                zIndex: 999999999,
                backgroundColor: "#fff",
              }}
            >
              {isFocus && results.length > 0 && (
                // <SearchSuggestions data={results} />
                <div className="demo-infinite-container">
                  <List
                    dataSource={results}
                    renderItem={({ structured_formatting: item, place_id }) => (
                      <List.Item
                        onClick={() =>
                          getAddressCoordinate(place_id, item["main_text"])
                        }
                        key={item["main_text"]}
                      >
                        <List.Item.Meta
                          title={item["main_text"]}
                          description={item["secondary_text"]}
                        />
                      </List.Item>
                    )}
                  >
                    {/* {searchLoading && (
                      <div className="demo-loading-container">
                        <Spin />
                      </div>
                    )} */}
                  </List>
                </div>
              )}
            </div>
          </div>
        </div>
      </Header>
      {isLoading && (
        <div style={justifyCenter}>
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
      {hospitalResults.length <= 0 && !isLoading && (
        <div style={{ position: "relative" }}>
          <p
            style={{
              ...justifyCenter,
              color: colors.red,
              left: "20vw",
              fontSize: 17,
            }}
          >
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
