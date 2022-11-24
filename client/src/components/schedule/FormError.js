import React from "react";

const FormError = ({ errors }) => {
  return errors.map((error, index) => {
    return <div key={index}>{error}</div>;
  });
};

export default FormError;
