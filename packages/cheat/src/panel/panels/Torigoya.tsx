import React from "react";

export function Achievement() {
  return (
    <div>
      <h1>Achievement</h1>
      <h2>Scene</h2>
      <button
        onClick={() => {
          SceneManager.push(Torigoya.Achievement.Scene_Achievement);
        }}
      >
        Open Achievement Scene
      </button>
      <h2>Tools</h2>
      <button
        onClick={() => {
          Torigoya.Achievement.Manager.allData().forEach((_, i) => {
            Torigoya.Achievement.Manager.unlock(i);
          });
        }}
      >
        Unlock All
      </button>
    </div>
  );
}
