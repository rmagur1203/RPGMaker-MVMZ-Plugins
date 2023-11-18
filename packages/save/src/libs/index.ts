import * as MV from "./MV";
import * as MZ from "./MZ";

export * from "./Base";
export * from "./MV";

export function GetSaveManager() {
  if (Utils.RPGMAKER_NAME === "MV") {
    return MV.SaveManagerMV.getInstance();
  } else if (Utils.RPGMAKER_NAME === "MZ") {
    return MZ.SaveManagerMZ.getInstance();
  }
}
