import PluginManagerEx from "../../../libs/PluginManagerEx";
const params = PluginManagerEx.parameters("AnotherNewGame") as Params;
type Params = {
  anotherDataList: {
    name: string;
    mapId: number;
    mapX: number;
    mapY: number;
    hidden: boolean;
    disable: boolean;
    addPosition: number;
    switchId: number;
    fileLoad: boolean;
    noFadeout: boolean;
  }[];
  manageNumber: string;
};

import React from "react";

export default function SceneGlossary() {
  console.log(params);

  return (
    <div>
      <h1>Another New Game</h1>
      {params.anotherDataList.map((x, i) => (
        <div>
          <h2>{x.name}</h2>
          <h3>Map</h3>
          <p>Map ID: {x.mapId}</p>
          <p>Map X: {x.mapX}</p>
          <p>Map Y: {x.mapY}</p>
          <h3>Options</h3>
          <p>Hidden: {x.hidden ? "true" : "false"}</p>
          <p>Disable: {x.disable ? "true" : "false"}</p>
          <p>Add Position: {x.addPosition}</p>
          <p>Switch ID: {x.switchId}</p>
          <p>File Load: {x.fileLoad ? "true" : "false"}</p>
          <p>No Fadeout: {x.noFadeout ? "true" : "false"}</p>
          <button
            onClick={() => {
              Game_Interpreter.prototype.pluginCommand("ANG_VISIBLE", [
                (i + 1).toString(),
              ]);
            }}
          >
            To Visible
          </button>
          <button
            onClick={() => {
              Game_Interpreter.prototype.pluginCommand("ANG_HIDDEN", [
                (i + 1).toString(),
              ]);
            }}
          >
            To Hidden
          </button>
        </div>
      ))}
    </div>
  );
}
