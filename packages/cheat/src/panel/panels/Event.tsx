import Editor from "@/components/Editor";
import React from "react";

export function CommonEvents() {
  const [modal, setModal] = React.useState(false);

  $dataCommonEvents[1];

  return (
    <div>
      <h1>Common Events</h1>
      <h2>Scene</h2>
      <button onClick={() => setModal(true)}>Open Editor</button>
      <Editor
        event={$dataCommonEvents[1]}
        open={modal}
        onClose={() => setModal(false)}
      />
    </div>
  );
}
