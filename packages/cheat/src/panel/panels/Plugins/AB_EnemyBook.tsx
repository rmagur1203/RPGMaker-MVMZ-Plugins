import React from "react";

export default function () {
  return (
    <div>
      <h1>AB Enemy Book</h1>
      <h2>Scene</h2>
      <button
        onClick={() => {
          SceneManager.push(Scene_EnemyBook);
        }}
      >
        Open Enemy Book
      </button>
      <h2>Tools</h2>
      <button
        onClick={() => {
          $gameSystem.completeEnemyBook();
        }}
      >
        Unlock All
      </button>
    </div>
  );
}
