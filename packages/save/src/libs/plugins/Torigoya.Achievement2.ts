import * as PluginManager from "./PluginManager";
import { FileType } from "../Base";
import { PluginBase } from "./Base";

declare var StorageManager: StorageManagerStatic;
declare var Torigoya: {
  Achievement2: {
    saveSlotID: string;
    Manager: {
      extractSaveContents: (savefileInfo: any) => void;
      save: () => void;
    };
  };
};

const params = PluginManager.parameters("Torigoya_Achievement2");

export default class TorigoyaAchievement2 extends PluginBase {
  public async load(): Promise<void> {
    console.log(params);

    const info = await this.loadLocalFile(
      StorageManager.localFilePath(Torigoya.Achievement2.saveSlotID as any)
    )
      .then(LZString.decompressFromBase64)
      .then((x) => (x === "null" ? null : JSON.parse(x)))
      .catch(() => null);

    console.log(info);

    if (!info) return;
    // @ts-ignore
    Torigoya.Achievement2.Manager.extractSaveContents.call(
      // @ts-ignore
      Torigoya.Achievement2.Manager,
      info
    );
    // @ts-ignore
    Torigoya.Achievement2.Manager.save.call(Torigoya.Achievement2.Manager);
  }
  public save(): void {
    throw new Error("Method not implemented.");
  }
  public reset(): void {
    StorageManager.remove(Torigoya.Achievement2.saveSlotID as any);
  }
  public download(): Promise<FileType | null> {
    const data = LZString.compressToBase64(
      StorageManager.load(Torigoya.Achievement2.saveSlotID as any)
    );

    return Promise.resolve({
      name: StorageManager.localFilePath(Torigoya.Achievement2.saveSlotID as any),
      data: data,
    });
  }
}
