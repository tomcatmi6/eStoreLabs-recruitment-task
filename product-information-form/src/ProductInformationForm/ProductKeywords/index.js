import React from "react";
import CreatableSelect from "react-select/creatable";

const ProductKeywords = ({ control, Controller }) => (
  <Controller
    name="productKeywords"
    control={control}
    render={({ field }) => (
      <CreatableSelect
        {...field}
        isMulti
        onChange={(selected) => field.onChange(selected.map((item) => item.value))}
        options={field.value.map((keyword) => ({ value: keyword, label: keyword }))}
      />
    )}
  />
);

export default ProductKeywords;