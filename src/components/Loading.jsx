import React from "react";

const Loading = () => {
  return (
    <div style={{ textAlign: "center",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center  " }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif?20090907150129"
        alt=""
        style={{ width: "40px" }}
      />
    </div>
  );
};

export default Loading;
