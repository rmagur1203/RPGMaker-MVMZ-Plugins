declare var StorageManager: StorageManagerStatic;

export abstract class SaveManager {
  static get available() {
    return false;
  }

  constructor(private local: boolean) {
    if (!StorageManager.isLocalMode())
      StorageManager.localFileDirectoryPath = () => "save/";
  }

  async load(savefileId: number) {
    if (this.local) {
      return LZString.decompressFromBase64(
        await this.loadLocalFile(StorageManager.localFilePath(savefileId))
      );
    } else {
      return this.loadWithKey(StorageManager.webStorageKey(savefileId));
    }
  }

  async loadWithKey(key: string) {}
}
