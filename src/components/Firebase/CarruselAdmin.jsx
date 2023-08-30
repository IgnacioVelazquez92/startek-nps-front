import React from "react";
import { uploadFile } from "./configFirebase";

const CarruselAdmin = () => {
  return (
    <div>
      <form>
        <input
          type="file"
          className=""
          onChange={(e) => uploadFile(e.target.files[0])}
        />
      </form>
    </div>
  );
};

export default CarruselAdmin;
