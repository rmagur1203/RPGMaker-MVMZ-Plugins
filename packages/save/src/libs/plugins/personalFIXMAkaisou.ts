import * as PluginManager from "./PluginManager";
import { FileType } from "../Base";
import { PluginBase } from "./Base";

declare var StorageManager: StorageManagerStatic;

const params = PluginManager.parameters("personalFIXMA");

export default class personalFIXMAkaisou extends PluginBase {
  public async load(): Promise<void> {
    console.log(params);

    const info = await this.loadLocalFile(
      StorageManager.filePath(params.kaisoudataname)
    )
      .then(StorageManager.zipToJson)
      .then((x) => (x === "null" ? null : JSON.parse(x)))
      .catch(() => null);

    console.log(info);

    if (!info) return;
    // @ts-expect-error
    DataManager.MAonSetloadkaisou(info);
  }
  public save(): void {
    throw new Error("Method not implemented.");
  }
  public reset(): void {
    localforage.removeItem(StorageManager.forageKey(params.kaisoudataname));
  }
  public download(): Promise<FileType | null> {
    return Promise.reject(new Error("Method not implemented."));
  }
}
