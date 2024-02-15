import * as PluginManager from "./PluginManager";
import { FileType } from "../Base";
import { PluginBase } from "./Base";

declare var StorageManager: StorageManagerStatic & {
  localFilePathCommonSave: () => string;
  webStorageKeyCommonSave: () => string;
}

const params = PluginManager.parameters("UTA_CommonSave");

export default class UTA_CommonSave extends PluginBase {
  public static Available(): boolean {
    return window.PluginManager._scripts.contains('UTA_CommonSave');
  }

  public async load(): Promise<void> {
    const info = await this.loadLocalFile(
      StorageManager.localFilePathCommonSave()
    )
      .then(LZString.decompressFromBase64)
      .then((x) => (x === "null" ? null : JSON.parse(x)))
      .catch(() => null);

    if (!info) return;
    // @ts-expect-error
    utakata.CommonSaveManager.setLoadSwitches(info["gameSwitches"]);
    // @ts-expect-error
    utakata.CommonSaveManager.setLoadVariables(info["gameVariables"]);
    // @ts-expect-error
    utakata.CommonSaveManager.save();
  }
  public save(): void {
    throw new Error("Method not implemented.");
  }
  public reset(): void {
    localStorage.removeItem(StorageManager.webStorageKeyCommonSave());
  }
  public download(): Promise<FileType | null> {
    // @ts-expect-error
    var switchesJson = utakata.CommonSaveManager._getTargetSwitchJson();
    // @ts-expect-error
    var variablesJson = utakata.CommonSaveManager._getTargetVariableJson();

    var json = {
      "gameSwitches": switchesJson,
      "gameVariables": variablesJson
    };

    var data = LZString.compressToBase64(JSON.stringify(json));

    return Promise.resolve({
      name: StorageManager.localFilePathCommonSave(),
      data: data
    });
  }
}
