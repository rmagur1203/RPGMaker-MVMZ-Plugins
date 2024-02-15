import { FileType } from "../Base";
import { PluginBase } from "./Base";
import TorigoyaAchievement2 from "./Torigoya.Achievement2";
import TorigoyaMZAchievement2 from "./TorigoyaMZ.Achievement2";
import UTA_CommonSave from "./UTA_CommonSave";
import UTA_CommonSaveMZ from "./UTA_CommonSaveMZ";
import personalFIXMAkaisou from "./personalFIXMAkaisou";

export const Plugins: Array<
  [
    () => boolean,
    {
      new (): PluginBase;
    }
  ]
> = [
  [
    () => window.PluginManager._scripts.contains("personalFIXMAkaisou"),
    personalFIXMAkaisou,
  ],
  [
    () => window.PluginManager._scripts.contains("UTA_CommonSaveMZ"),
    UTA_CommonSaveMZ,
  ],
  [UTA_CommonSave.Available, UTA_CommonSave],
  [
    () => window.PluginManager._scripts.contains("Torigoya_Achievement2"),
    TorigoyaAchievement2,
  ],
  [
    () => window.PluginManager._scripts.contains("TorigoyaMZ_Achievement2"),
    TorigoyaMZAchievement2,
  ],
];

export default class PluginManager {
  private static _instance: PluginManager;
  private _plugins: Array<PluginBase> = [];

  private constructor() {
    for (const [condition, plugin] of Plugins) {
      if (condition()) {
        this._plugins.push(new plugin());
      }
    }
  }

  public load(): void {
    for (const plugin of this._plugins) {
      plugin.load();
    }
  }

  public save(): void {
    for (const plugin of this._plugins) {
      plugin.save();
    }
  }

  public reset(): void {
    for (const plugin of this._plugins) {
      plugin.reset();
    }
  }

  public download(): Promise<(FileType | null)[]> {
    return Promise.allSettled(this._plugins.map((x) => x.download())).then(
      (x) => x.map((y) => (y.status === "fulfilled" ? y.value : null))
    );
  }

  public static getInstance(): PluginManager {
    if (!PluginManager._instance) {
      PluginManager._instance = new PluginManager();
    }
    return PluginManager._instance;
  }
}
