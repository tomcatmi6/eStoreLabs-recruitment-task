import React from "react";
import { Button } from "react-bootstrap";
import BulletItem from "./BulletItem";

const ProductBullets = ({ bullets, setBullets }) => {
  const moveBullet = (dragIndex, hoverIndex) => {
    const updatedBullets = [...bullets];
    const [movedBullet] = updatedBullets.splice(dragIndex, 1);
    updatedBullets.splice(hoverIndex, 0, movedBullet);
    setBullets(updatedBullets);
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

  return (
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
      <Button onClick={() => setBullets([...bullets, ""])}>Add Bullet</Button>
    </div>
  );
};

export default ProductBullets;