import React from "react";
import Loader from "react-loader-spinner";
function LoadingAnimation() {
  var styles = {
    display: "flex",
    alignItems: "center",
  };
  return (
    <div style={styles}>
      <h1>Please Wait...</h1>
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  );
}

export default LoadingAnimation;
