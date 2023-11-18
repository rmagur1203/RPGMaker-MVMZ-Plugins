import { FileType, SaveManager } from "./Base";

export class SaveManagerMZ extends SaveManager {
  private static _instance: SaveManagerMZ | null = null;

  static getInstance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  static get available(): boolean {
    return Utils.RPGMAKER_NAME === "MZ";
  }

  get savefileIds(): number[] {
    return [-1, ...Array(DataManager.maxSavefiles() + 1).keys()];
  }

  load(savefileId: number, local?: boolean | undefined): Promise<string> {
    throw new Error("Method not implemented.");
  }

  loadLocalFile(path: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  loadWithKey(key: string, local?: boolean | undefined): Promise<string> {
    throw new Error("Method not implemented.");
  }

  save(savefileId: number, json: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  saveWithKey(key: string, json: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  download(savefileId: number): Promise<FileType | null> {
    throw new Error("Method not implemented.");
  }

  reset(savefileId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
