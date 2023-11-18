import { FileType, SaveManager } from "./Base";

declare var StorageManager: StorageManagerStatic;

export class SaveManagerMV extends SaveManager {
  private static _instance: SaveManagerMV | null = null;

  static getInstance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  static get available(): boolean {
    return Utils.RPGMAKER_NAME === "MV";
  }

  constructor() {
    super();
    if (!StorageManager.isLocalMode())
      StorageManager.localFileDirectoryPath = () => "save/";
  }

  get savefileIds(): number[] {
    return [-1, ...Array(DataManager.maxSavefiles() + 1).keys()];
  }

  override async load(savefileId: number, local = false) {
    if (local) {
      return this.loadWithKey(StorageManager.localFilePath(savefileId), local);
    } else {
      return this.loadWithKey(StorageManager.webStorageKey(savefileId), local);
    }
  }

  override async loadWithKey(keyOrPath: string, local = false) {
    if (local) {
      return await this.loadLocalFile(keyOrPath)
        .then(LZString.decompressFromBase64)
        .catch(() => null);
    } else {
      const data = localStorage.getItem(keyOrPath);
      return data && LZString.decompressFromBase64(data);
    }
  }

  override async save(savefileId: number, json: string): Promise<void> {
    return this.saveWithKey(StorageManager.webStorageKey(savefileId), json);
  }

  override async saveWithKey(key: string, json: string): Promise<void> {
    const data = LZString.compressToBase64(json);
    return localStorage.setItem(key, data);
  }

  override async download(savefileId: number): Promise<FileType | null> {
    const data = await this.load(savefileId);
    if (!data) return null;
    return {
      name: StorageManager.localFilePath(savefileId),
      data: LZString.compressToBase64(data),
    };
  }

  override async reset(savefileId: number): Promise<void> {
    localStorage.removeItem(StorageManager.webStorageKey(savefileId));
  }
}
