import React from "react";

export default function SceneGlossary() {
  if (!Scene_Glossary) {
    return <p>Scene Glossary plugin not found.</p>;
  }

  return (
    <div>
      <h1>SceneGlossary</h1>
      <button onClick={() => $gameParty.gainGlossaryAll?.()}>
        GLOSSARY_GAIN_ALL
      </button>
      <br />
      <button onClick={() => $gameParty.loseGlossaryAll?.()}>
        GLOSSARY_LOSE_ALL
      </button>
    </div>
  );
}
