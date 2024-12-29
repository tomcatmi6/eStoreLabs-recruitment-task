import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProductDescription = ({ control, Controller }) => (
  <Controller
    name="productDescription"
    control={control}
    render={({ field }) => <ReactQuill {...field} />}
  />
);

export default ProductDescription;