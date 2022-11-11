import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewService = () => {
  const { key } = useParams();

  useEffect(() => {
    if (key) {
      window.api.visibleService(true);
      window.api.addService(key);
    }
  }, [key]);
  return null;
};

export default React.memo(ViewService);
