import React, { useEffect } from "react";

const Setting = () => {
  useEffect(() => {
    window.api.visibleService(false);
  }, []);
  return <div>setting</div>;
};

export default React.memo(Setting);
