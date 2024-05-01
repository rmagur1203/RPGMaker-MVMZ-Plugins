import React, { useMemo } from "react";

export function IsVisible() {
  if (typeof rngd_recollection_mode_settings !== "undefined") {
    return true;
  }
  if (typeof rngdRecollectionModeMZSettings !== "undefined") {
    return true;
  }
  return false;
}

export default function RecollectionModeComponent() {
  const recollectionMode = useMemo(() => GetRecollectionMode(), []);

  const unlock = () => recollectionMode.unlockAll();

  return (
    <div>
      <h1>RecollectionMode</h1>
      <button onClick={unlock}>RECOLLECTION_MODE_UNLOCK</button>
    </div>
  );
}

function GetRecollectionMode() {
  if (typeof rngd_recollection_mode_settings !== "undefined") {
    return new MVRecollectionMode();
  } else if (typeof rngdRecollectionModeMZSettings !== "undefined") {
    return new MZRecollectionMode();
  } else {
    throw new Error("RecollectionMode plugin not found.");
  }
}

interface RecollectionModeBase {
  unlockAll(): void;
}

class MVRecollectionMode implements RecollectionModeBase {
  unlockAll(): void {
    Object.entries(rngd_recollection_mode_settings.rec_cg_set)
      .map(([k, v]) => v.switch_id)
      .forEach((x) => {
        $gameSwitches.setValue(x, true);
      });

    if (rngd_recollection_mode_settings.rec_cg_switch)
      Object.values(rngd_recollection_mode_settings.rec_cg_switch).forEach(
        (x) => {
          $gameSwitches.setValue(x, true);
        }
      );

    // RecollectionMode.js v1.1.5
    Window_RecList.prototype.get_global_variables = function () {
      this._global_variables = {
        switches: {},
      };
      Object.entries(rngd_recollection_mode_settings.rec_cg_set).forEach(
        ([k, v]) => {
          this._global_variables["switches"][v.switch_id] = true;
        },
        this
      );
    };
  }
}

class MZRecollectionMode implements RecollectionModeBase {
  unlockAll(): void {
    Object.entries(
      window[
      rngdRecollectionModeMZSettings.recoCgSettingList as any
      ] as unknown as CGSet
    )
      .map(([k, v]) => v.switch_id)
      .forEach((x) => {
        $gameSwitches.setValue(x, true);
        rngdRecollectionGlobalContents.switches[x] = true;
      });
  }
}
