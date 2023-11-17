import { SaveManager } from "./Base";

export class SaveManagerMV extends SaveManager {
  static get available(): boolean {
    return Utils.RPGMAKER_NAME === "MV";
  }
}
