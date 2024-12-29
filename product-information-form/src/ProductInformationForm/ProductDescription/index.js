import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
    ],
  };
  const formats = ["bold", "italic", "underline"];

const ProductDescription = ({ control, Controller }) => (
  <Controller
    name="productDescription"
    control={control}
    render={({ field }) => (
        <ReactQuill
          {...field}
          modules={modules}
          formats={formats}
        />
      )}
  />
);

export default ProductDescription;