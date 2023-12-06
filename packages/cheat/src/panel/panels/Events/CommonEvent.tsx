import Editor from "../../../components/Editor";
import React, { useEffect } from "react";
import styled from "styled-components";

export function CommonEvents() {
  const [modal, setModal] = React.useState(false);
  const [event, setEvent] = React.useState<RPG.CommonEvent | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.addEventListener("contextmenu", (event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
    });
  }, [ref.current]);

  return (
    <Wrapper ref={ref}>
      <h1>Common Events</h1>
      <h2>Scene</h2>
      {/* <button onClick={() => setModal(true)}>Open Editor</button> */}
      {$dataCommonEvents.map((event, i) => {
        return (
          event && (
            <Event>
              <H3>
                {event.name} ({event.id})
              </H3>
              <div>
                <button
                  onClick={() => {
                    ($gameMap as any)._interpreter.setupChild(event.list, 0);
                    ($gameMap as any)._interpreter.updateChild();
                  }}
                >
                  Call
                </button>
                <button
                  onClick={() => {
                    setEvent(event);
                    setModal(true);
                  }}
                >
                  Open Editor
                </button>
              </div>
            </Event>
          )
        );
      })}
      <Editor event={event} open={modal} onClose={() => setModal(false)} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  /* user-select: all; */
`;

const Event = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const H3 = styled.h3`
  display: inline-block;
`;
