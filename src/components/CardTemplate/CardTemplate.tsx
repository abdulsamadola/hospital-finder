/* @flow */
import React, { useState } from "react";
import { Card, Rate, Modal, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { IHospital } from "../../common";

import "./CardTemplate.scss";
import colors from "../../styles";
import Utils from "../../utils/";

interface IProps extends IHospital {
  loading: boolean;
  open: boolean;
  user_count: number;
}

const CardTamplate = ({
  name,
  rating,
  icon,
  loading,
  formatted_address,
  open,
  user_count,
  geometry,
}: IProps) => {
  const [state, setState] = useState<any>({
    ModalText: "",
    visible: false,
    confirmLoading: false,
  });

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const handleOk = () => {
    setState({
      ...state,
      ModalText: "",
      confirmLoading: false,
      visible: false,
    });
  };

  const handleCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  const { visible, confirmLoading } = state;
  const { location }: any = geometry;
  const alignRight = { alignSelf: "center", marginLeft: 60 };
  return (
    <>
      <Modal
        title={name}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img alt={name} width="35%" src={`${icon}`} />
          <div>
            <p style={alignRight}> {name}</p>
            <p style={alignRight}>{formatted_address}</p>
            <p style={alignRight}>
              {`Rating: ${rating}`} <Rate disabled defaultValue={rating} />
            </p>
            <p
              style={{ ...alignRight, color: colors.primary }}
            >{`Currently Open: ${open ? "Yes" : "No"}`}</p>
            <p style={alignRight}>
              <Button
                href={`https://www.google.com/maps/place/${formatted_address}/@${location.lat},${location.lng}`}
                target="_blank"
                type="primary"
                shape="round"
                icon={<EyeOutlined />}
                size={"middle"}
              >
                View On Map
              </Button>
            </p>
          </div>
        </div>
      </Modal>

      <Card
        onClick={loading ? () => {} : showModal}
        style={{ width: 240, height: 300, marginBottom: 10 }}
        className="card"
        bodyStyle={{ padding: 0 }}
        loading={loading}
      >
        <div className="custom-image">
          <img alt={name} width="35%" src={`${icon}`} />
        </div>
        <div className="custom-card">
          <h3>{name.length > 30 ? Utils.truncateString(name, 30) : name}</h3>
          <p>
            {formatted_address.length > 50
              ? Utils.truncateString(formatted_address, 50)
              : formatted_address}
          </p>
          <p>
            {`Rating: ${rating}`} <Rate disabled defaultValue={rating} />(
            <span style={{ color: "darkred" }}>{user_count}</span>)
          </p>
          <p style={{ color: colors.primary }}>{`Currently Open: ${
            open ? "Yes" : "No"
          }`}</p>
        </div>
      </Card>
    </>
  );
};

export default CardTamplate;
