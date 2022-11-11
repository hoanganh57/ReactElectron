import { Card, Col, Row } from "antd";
import React, { useEffect } from "react";
import Icon from "renderer/components/Icon";
import ListServices from "renderer/utils/ListServices";

const AddService = () => {
  const handleAddService = (service: string) => {
    console.log(service);
  };

  useEffect(() => {
    window.api.visibleService(false);
  }, []);
  return (
    <Row
      gutter={{ xs: 24, md: 28, xl: 32 }}
      className="px-16 pt-16 max-w-[1200px] mx-auto"
    >
      {ListServices.map((service) => {
        return (
          <Col key={service.id} xs={8} md={6} xl={4}>
            <Card
              onClick={() => handleAddService(service.name)}
              hoverable
              bodyStyle={{
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 120,
              }}
            >
              <Icon name={service.name} size="large" />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default React.memo(AddService);
