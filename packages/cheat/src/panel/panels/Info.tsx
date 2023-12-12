import { BitmapToImage } from "@/components/RPGMaker/BitmapToImage";
import { useScene } from "@/hooks/UseScene";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Command(command: Window_Command) {
  return (
    <li key={command.constructor.name}>
      {command.constructor.name}
      <ul>
        {
          // @ts-expect-error
          command._list.map((y) => (
            <li key={y.name}>
              {y.enabled ? "⭕" : "❌"}
              {y.name} (
              {command instanceof Window_Selectable && (
                <button
                  // @ts-expect-error
                  onClick={() => console.log(command._handlers[y.symbol])}
                >
                  @onClick
                </button>
              )}
              )
            </li>
          ))
        }
      </ul>
    </li>
  );
}

export default function InformationPanel() {
  const scene = useScene();
  const [children, setChildren] = useState<any[]>(scene?.children || []);

  console.log(scene, scene?.children, children);

  useEffect(() => {
    if (!scene) return;
    setChildren([...scene.children]);
  }, [scene]);

  useEffect(() => {
    if (!scene) return;
    const listener = (child: any, scene: Scene_Base, index: number) => {
      setChildren([...scene.children]);
    };

    scene.on("childAdded", listener);

    return () => {
      scene.off("childAdded", listener);
    };
  }, [scene]);

  return (
    <Wrapper>
      <h2>RPGMaker Info</h2>
      <p>
        {Utils.RPGMAKER_NAME || "Unknown"} v
        {Utils.RPGMAKER_VERSION || "Unknown"}
      </p>
      {scene && (
        <>
          <h2>Scene</h2>
          <ul>
            <li>Name: {scene.constructor.name}</li>
          </ul>
          <h2>Commands</h2>
          <ul>
            {
              // @ts-expect-error
              (scene._windowLayer?.children ?? [])
                .filter((x) => x instanceof Window_Command)
                .map((x) => x as unknown as Window_Command)
                .map(Command)
            }
          </ul>
          <h2>Sprites</h2>
          <ul>
            {children
              .filter((x) => x instanceof Sprite)
              .map((x) => x as unknown as Sprite)
              .filter((x) => x.bitmap?.url)
              .map((x) => (
                <span key={x.bitmap.url}>
                  <p>{x.bitmap.url}</p>
                  <SpriteImage bitmap={x.bitmap} />
                </span>
              ))}
          </ul>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const SpriteImage = styled(BitmapToImage)`
  max-height: 256px;
  width: 100%;
  object-fit: contain;
`;
