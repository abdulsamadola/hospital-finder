import React, { useState, useEffect } from "react";
import CardTemplate from "../CardTemplate/CardTemplate";
import { nanoid } from "nanoid";
import "./ShowHospitals.scss";
import { IHospital } from "../../common/";
interface IProps {
  data: IHospital[];
}
const ShowHospitals = ({ data }: IProps): JSX.Element => {
  const [id] = React.useState(nanoid);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    completeLoading();
  }, []);

  const completeLoading = () => {
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
      }}
    >
      {data.map((hospital: any) => {
        return (
          <div key={id}>
            <CardTemplate
              name={hospital.name}
              formatted_address={hospital.vicinity}
              open={hospital.opening_hours}
              geometry={hospital.geometry}
              rating={hospital.rating ? hospital.rating : 0}
              user_count={
                hospital.user_ratings_total ? hospital.user_ratings_total : 0
              }
              icon={hospital.icon}
              loading={loading}
            />
          </div>
        );
      })}
    </div>
  );
};
export default ShowHospitals;
