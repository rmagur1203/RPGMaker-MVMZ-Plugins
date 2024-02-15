import { FileType, SaveManager } from "./Base";

declare var StorageManager: StorageManagerStatic;

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

  constructor() {
    super();
    if (!StorageManager.isLocalMode())
      StorageManager.fileDirectoryPath = () => "save/";
  }

  get savefileIds(): number[] {
    return [
      -2,
      -1,
      ...Array(
        DataManager.maxSavefiles() - ($gameSystem.isAutosaveEnabled() ? 0 : 1)
      ).keys(),
    ];
  }

  private webStorageKey(savefileId: number) {
    if (savefileId === -2) return "config";
    if (savefileId === -1) return "global";
    return DataManager.makeSavename(savefileId);
  }

  load(
    savefileId: number,
    local?: boolean | undefined
  ): Promise<string | null> {
    if (local) {
      return this.loadWithKey(
        StorageManager.filePath(this.webStorageKey(savefileId)),
        local
      );
    } else {
      return this.loadWithKey(this.webStorageKey(savefileId), local);
    }
  }

  async loadWithKey(
    keyOrPath: string,
    local?: boolean | undefined
  ): Promise<string | null> {
    if (local) {
      return await this.loadLocalFile(keyOrPath)
        .then(StorageManager.zipToJson)
        .then((x) => (x === "null" ? null : x))
        .catch(() => null);
    } else {
      return StorageManager.loadFromForage(keyOrPath);
    }
  }

  save(savefileId: number, json: string): Promise<void> {
    return this.saveWithKey(this.webStorageKey(savefileId), json);
  }

  async saveWithKey(key: string, json: string): Promise<void> {
    const zip = await StorageManager.jsonToZip(json);
    return await StorageManager.saveToForage(key, zip);
  }

  async download(savefileId: number): Promise<FileType | null> {
    const data = await this.load(savefileId);
    console.log(`savefile${savefileId}: ${data}`);
    if (!data) return null;
    return {
      name: StorageManager.filePath(this.webStorageKey(savefileId)),
      data,
    };
  }

  async reset(savefileId: number): Promise<void> {
    const key = StorageManager.forageKey(this.webStorageKey(savefileId));
    return localforage.removeItem(key);
  }
}
