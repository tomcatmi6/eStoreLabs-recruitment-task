import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Form, Button } from "react-bootstrap";
import ProductDescription from "./ProductDescription";
import ProductBullets from "./ProductBullets";
import ProductKeywords from "./ProductKeywords";

const schema = z.object({
  productTitle: z.string().nonempty("Product title is required"),
  productDescription: z.string().optional(),
  productBullets: z.array(z.string()).optional(),
  productKeywords: z.array(z.string()).optional(),
});

function ProductInformationForm() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      productTitle: "",
      productDescription: "",
      productBullets: [],
      productKeywords: [],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container className="mt-4">
      <h1>Product Information Form</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product title"
            {...register("productTitle")}
            isInvalid={!!errors.productTitle}
          />
          <Form.Control.Feedback type="invalid">
            {errors.productTitle?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product Description</Form.Label>
          <ProductDescription control={control} Controller={Controller} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product Bullets</Form.Label>
          <ProductBullets
            bullets={watch("productBullets", [])}
            setBullets={(value) => setValue("productBullets", value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product Keywords</Form.Label>
          <ProductKeywords control={control} Controller={Controller} />
        </Form.Group>
        <Button type="submit" variant="success">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ProductInformationForm;
