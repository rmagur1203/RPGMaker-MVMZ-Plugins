import Blockly from "@/components/Blockly";
import React from "react";

export function CommonEvents() {
  const [modal, setModal] = React.useState(false);

  return (
    <div>
      <h1>Common Events</h1>
      <h2>Scene</h2>
      <button onClick={() => setModal(true)}>Open Editor</button>
      <Blockly.Editor open={modal} onClose={() => setModal(false)} />
    </div>
  );
}
