import * as PluginManager from "./PluginManager";
import { FileType } from "../Base";
import { PluginBase } from "./Base";

declare var StorageManager: StorageManagerStatic;

const params = PluginManager.parameters("UTA_CommonSaveMZ");

export default class UTA_CommonSaveMZ extends PluginBase {
  public async load(): Promise<void> {
    console.log(params);

    const info = await this.loadLocalFile(
      StorageManager.filePath(params.uta_common)
    )
      .then(StorageManager.zipToJson)
      .then((x) => (x === "null" ? null : JSON.parse(x)))
      .catch(() => null);

    console.log(info);

    if (!info) return;
    // @ts-expect-error
    utakata.CommonSave.loadCommonSaveSwitches(info);
    // @ts-expect-error
    utakata.CommonSave.loadCommonSaveVariables(info);
  }
  public save(): void {
    throw new Error("Method not implemented.");
  }
  public reset(): void {
    localforage.removeItem(StorageManager.forageKey(params.uta_common));
  }
  public download(): Promise<FileType | null> {
    return Promise.reject(new Error("Method not implemented."));
  }
}
