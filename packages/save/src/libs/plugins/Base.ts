import { FileType } from "../Base";

export abstract class PluginBase {
  public static Available(): boolean {
    return false;
  }

  public abstract load(): Promise<void>;
  public abstract save(): void;
  public abstract reset(): void;
  public abstract download(): Promise<FileType | null>;

  async loadLocalFile(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", path);
        xhr.onload = function () {
          if (xhr.status < 400) {
            resolve(xhr.responseText);
          } else {
            reject(new Error("Network error."));
          }
        };
        xhr.send();
        setTimeout(() => {
          xhr.abort();
          reject(new Error("Network timeout."));
        }, 10000);
      } catch (e) {
        reject(e);
      }
    });
  }
}
