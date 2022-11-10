import React, { useEffect } from "react";

const AddService = () => {
  useEffect(() => {
    window.api.visibleService(false);
  }, []);
  return <div>AddService</div>;
};

export default React.memo(AddService);
