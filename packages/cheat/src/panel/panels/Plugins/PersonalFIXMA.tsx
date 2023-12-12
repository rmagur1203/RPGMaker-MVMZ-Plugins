const params = PluginManager.parameters("personalFIXMAkaisou");

function parse(value: Record<string, any>) {
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      const element = value[key];
      if (typeof element === "object") {
        parse(element);
      } else if (typeof element === "string") {
        try {
          value[key] = JSON.parse(element);
          parse(value[key]);
        } catch (error) {
          value[key] = element;
        }
      } else {
        value[key] = element;
      }
    }
  }
}

parse(params);

import { useScene } from "../../../hooks/UseScene";
import React from "react";

type KaisouIdcondition = {
  sceneWithout: boolean;
  targetId: number;
  thumbnail: string;
}[];

export function Kaisou() {
  const scene = useScene();

  function unlock() {
    (params.kaisouIdcondition as KaisouIdcondition)
      .map((x) => x.targetId)
      .forEach((x) => DataManager.MAkaisouOneeventopenadd(x));
  }

  return (
    <div>
      <h1>FIXMA</h1>
      <h2>Kaisou</h2>
      <h3>Scene</h3>
      <button
        onClick={() => {
          // @ts-expect-error
          (Scene_Title.prototype.commandMAkaisou as () => void).call(scene);
        }}
      >
        Open Kaisou Scene
      </button>
      <h3>Tools</h3>
      <button onClick={unlock}>KAISOU_ALL_UNLOCK</button>
    </div>
  );
}
