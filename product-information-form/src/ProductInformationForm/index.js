import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDrag, useDrop } from "react-dnd";
import CreatableSelect from "react-select/creatable";

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

  const bullets = watch("productBullets", []);

  const moveBullet = (dragIndex, hoverIndex) => {
    const updatedBullets = [...bullets];
    const [movedBullet] = updatedBullets.splice(dragIndex, 1);
    updatedBullets.splice(hoverIndex, 0, movedBullet);
    setValue("productBullets", updatedBullets);
  };

  const BulletItem = ({ bullet, index }) => {
    const [, ref] = useDrag({
      type: "bullet",
      item: { index },
    });
    const [, drop] = useDrop({
      accept: "bullet",
      hover: (item) => {
        if (item.index !== index) {
          moveBullet(item.index, index);
          item.index = index;
        }
      },
    });

    return (
      <div ref={(node) => ref(drop(node))} className="d-flex align-items-center mb-2">
        <input
          type="text"
          className="form-control me-2"
          value={bullet}
          onChange={(e) => {
            const updatedBullets = [...bullets];
            updatedBullets[index] = e.target.value;
            setValue("productBullets", updatedBullets);
          }}
        />
        <Button
          variant="danger"
          onClick={() => {
            const updatedBullets = bullets.filter((_, i) => i !== index);
            setValue("productBullets", updatedBullets);
          }}
        >
          Remove
        </Button>
      </div>
    );
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
          <Controller
            name="productDescription"
            control={control}
            render={({ field }) => <ReactQuill {...field} />}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Bullets</Form.Label>
          {bullets.map((bullet, index) => (
            <BulletItem key={index} bullet={bullet} index={index} />
          ))}
          <Button
            variant="primary"
            onClick={() => setValue("productBullets", [...bullets, ""])}
          >
            Add Bullet
          </Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Keywords</Form.Label>
          <Controller
            name="productKeywords"
            control={control}
            render={({ field }) => (
              <CreatableSelect
                {...field}
                isMulti
                onChange={(selected) => {
                  field.onChange(selected.map((item) => item.value));
                }}
                options={field.value.map((keyword) => ({ value: keyword, label: keyword }))}
              />
            )}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ProductInformationForm;
