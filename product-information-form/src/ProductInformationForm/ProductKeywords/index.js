import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

const ProductKeywords = ({ control, Controller }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [keywordsSet, setKeywordsSet] = useState(new Set());

  const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newKeyword = createOption(inputValue);
      if (!keywordsSet.has(newKeyword.value)) {
        setKeywordsSet((prev) => new Set(prev).add(newKeyword.value));
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (newValue) => {
    if (newValue) {
      setKeywordsSet(new Set([newValue.value]));
    } else {
      setKeywordsSet(new Set());
    }
  };

  return (
    <Controller
      name="productKeywords"
      control={control}
      render={({ field }) => {
        const keywordsArray = Array.from(keywordsSet);

        return (
          <CreatableSelect
            {...field}
            isClearable
            isDisabled={isLoading}
            isLoading={isLoading}
            onCreateOption={handleCreate}
            onChange={(newValue) => {
              handleChange(newValue);
              field.onChange(newValue ? newValue.value : ""); 
            }}
            options={keywordsArray.map((keyword) => ({
              label: keyword,
              value: keyword,
            }))}
            value={
              field.value
                ? { label: field.value, value: field.value }
                : null 
            }
          />
        );
      }}
    />
  );
};

export default ProductKeywords;