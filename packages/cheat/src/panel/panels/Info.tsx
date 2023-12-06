import React, { useEffect } from "react";

export default function InformationPanel() {
  const [scene, setScene] = React.useState<Scene_Base>(SceneManager._scene);

  useEffect(() => {
    const original = SceneManager;

    SceneManager = new Proxy(SceneManager, {
      set(target, p, newValue, receiver) {
        if (p === "_scene") {
          setScene(newValue);
        }
        return Reflect.set(target, p, newValue, receiver);
      },
    });

    return () => {
      SceneManager = original;
    };
  }, []);

  return (
    <div>
      <h1>Scene</h1>
      <ul>
        <li>Name: {SceneManager?._scene?.constructor?.name}</li>
      </ul>
    </div>
  );
}
