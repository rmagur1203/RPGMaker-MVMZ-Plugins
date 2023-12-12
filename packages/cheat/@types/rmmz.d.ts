declare var localforage: LocalForage;

interface StorageManagerStatic {
  loadFromForage(saveName: string): Promise<string>;
  saveToForage(saveName: string, zip: string): Promise<void>;
  zipToJson(data: string | null): Promise<string>;
  jsonToZip(data: string): Promise<string>;
  objectToJson(object: any): Promise<string>;
  jsonToObject(json: string): Promise<any>;
  fileDirectoryPath(): string;
  filePath(saveName: string): string;
  forageKey(saveName: string): string;
}

type MVImageManagerStatic = ImageManagerStatic;

namespace MZ {
  interface ImageManagerStatic extends MVImageManagerStatic {
    /**
     * Loads a Bitmap object from any folder and returns it.
     *
     * @param {string} folder
     * @param {string} filename
     * @returns {Bitmap}
     * @memberof ImageManagerStatic
     */
    loadBitmap(folder: string, filename: string): Bitmap;

    /**
     * Loads a Bitmap object from any folder and returns it.
     * @param url The image url of the texture
     * @returns {Bitmap}
     * @memberof ImageManagerStatic
     */
    loadBitmapFromUrl(url: string): Bitmap;
  }
}
