import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Draggable BulletItem Component
const BulletItem = ({ index, bullet, moveBullet, updateBullet, removeBullet }) => {
  const [, ref] = useDrag({
    type: "bullet",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "bullet",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveBullet(draggedItem.index, index);
        draggedItem.index = index;
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
      <Button variant="danger" size="sm" onClick={() => removeBullet(index)}>
        Remove
      </Button>
    </div>
  );
};

const ProductBullets = ({ initialBullets = [] }) => {
  const [bullets, setBullets] = useState(initialBullets);

  const addBullet = () => {
    setBullets([...bullets, ""]);
  };

  const updateBullet = (index, value) => {
    const updatedBullets = [...bullets];
    updatedBullets[index] = value;
    setBullets(updatedBullets);
  };

  const removeBullet = (index) => {
    const updatedBullets = bullets.filter((_, i) => i !== index);
    setBullets(updatedBullets);
  };

  const moveBullet = (dragIndex, hoverIndex) => {
    const updatedBullets = [...bullets];
    const [movedBullet] = updatedBullets.splice(dragIndex, 1);
    updatedBullets.splice(hoverIndex, 0, movedBullet);
    setBullets(updatedBullets);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {bullets.map((bullet, index) => (
          <BulletItem
            key={index}
            index={index}
            bullet={bullet}
            moveBullet={moveBullet}
            updateBullet={updateBullet}
            removeBullet={removeBullet}
          />
        ))}
        {!bullets.length && <p>No bullets added</p>}
        <Button onClick={addBullet}>Add Bullet</Button>
      </div>
    </DndProvider>
  );
};

export default ProductBullets;