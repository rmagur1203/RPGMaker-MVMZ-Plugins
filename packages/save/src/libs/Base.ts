export interface FileType {
  name: string;
  data: string;
}

export abstract class SaveManager {
  static get available() {
    return false;
  }

  abstract get savefileIds(): number[];

  abstract load(savefileId: number, local?: boolean): Promise<string | null>;

  abstract loadWithKey(
    keyOrPath: string,
    local?: boolean
  ): Promise<string | null>;

  abstract save(savefileId: number, json: string): Promise<void>;

  abstract saveWithKey(keyOrPath: string, json: string): Promise<void>;

  abstract reset(savefileId: number): Promise<void>;

  abstract download(savefileId: number): Promise<FileType | null>;

  async loadLocalFile(path: string): Promise<string> {
    console.log("loadLocalFile", path);
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
