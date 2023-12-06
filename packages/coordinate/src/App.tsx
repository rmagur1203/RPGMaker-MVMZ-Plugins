import React, { useState, useEffect } from "react";

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    setInterval(() => {
      if (!window.$gamePlayer) return;
      setX(window.$gamePlayer.x ?? 0);
      setY(window.$gamePlayer.y ?? 0);
    }, 100);
  }, []);

  return (
    <>
      <p>
        {x}, {y}
      </p>
    </>
  );
};

export default App;
