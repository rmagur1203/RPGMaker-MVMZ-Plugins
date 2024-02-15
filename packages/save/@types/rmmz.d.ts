declare var localforage: LocalForage;

interface StorageManagerStatic {
  loadObject(saveName: string): Promise<any>;
  loadZip(saveName: string): Promise<string>;
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
