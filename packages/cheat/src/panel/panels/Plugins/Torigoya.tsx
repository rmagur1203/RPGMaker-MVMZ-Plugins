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

/**
 * Torigoya MZ Achievement 2
 */
export function Achievement2() {
  return (
    <div>
      <h1>Achievement</h1>
      <h2>Scene</h2>
      <button
        onClick={() => {
          SceneManager.push(Torigoya.Achievement2.Scene_Achievement as any);
        }}
      >
        Open Achievement Scene
      </button>
      <h2>Tools</h2>
      <button
        onClick={() => {
          Torigoya.Achievement2.Manager.achievements.forEach((item) => {
            Torigoya.Achievement2.Manager.unlock(item.key);
          });
        }}
      >
        Unlock All
      </button>
    </div>
  );
}
