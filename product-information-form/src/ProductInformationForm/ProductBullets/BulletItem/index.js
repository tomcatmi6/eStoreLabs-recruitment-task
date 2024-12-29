import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Button } from "react-bootstrap";

const BulletItem = ({ bullet, index, moveBullet, updateBullet, removeBullet }) => {
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
        onChange={(e) => updateBullet(index, e.target.value)}
      />
      <Button variant="danger" onClick={() => removeBullet(index)}>
        Remove
      </Button>
    </div>
  );
};

export default BulletItem;