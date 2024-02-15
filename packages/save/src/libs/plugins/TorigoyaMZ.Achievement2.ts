import * as PluginManager from "./PluginManager";
import { FileType } from "../Base";
import { PluginBase } from "./Base";

declare var StorageManager: StorageManagerStatic;
declare var Torigoya: {
  Achievement2: {
    Manager: {
      extractSaveContents: (savefileInfo: any) => void;
      save: () => void;
    };
    parameter: {
      baseSaveSlot: string;
    };
  };
};

const params = PluginManager.parameters("TorigoyaMZ_Achievement2");

export default class TorigoyaMZAchievement2 extends PluginBase {
  public async load(): Promise<void> {
    console.log(params);

    const info = await this.loadLocalFile(
      StorageManager.filePath(
        Torigoya.Achievement2.parameter.baseSaveSlot as any
      )
    )
      .then(StorageManager.zipToJson)
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
    StorageManager.remove(Torigoya.Achievement2.parameter.baseSaveSlot as any);
  }
  public async download(): Promise<FileType | null> {
    const data = await StorageManager.loadZip(
      Torigoya.Achievement2.parameter.baseSaveSlot as any
    );

    return Promise.resolve({
      name: StorageManager.filePath(
        Torigoya.Achievement2.parameter.baseSaveSlot as any
      ),
      data: data,
    });
  }
}
