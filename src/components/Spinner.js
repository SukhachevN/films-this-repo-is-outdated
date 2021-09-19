import React from "react";
import { FaSpinner } from "react-icons/fa";

function Spinner() {
  return (
    <div className="FullPageSpinner">
      <FaSpinner className="Spinner" size="5rem" />
    </div>
  );
}

export { Spinner };
