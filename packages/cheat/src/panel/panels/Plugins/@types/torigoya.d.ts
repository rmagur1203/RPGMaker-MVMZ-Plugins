declare class Torigoya {
  static Achievement: TorigoyaMV_Achievement;
  static Achievement2: TorigoyaMZ_Achievement2;
}

declare class TorigoyaMV_Achievement {
  name: "Torigoya_Achievement";
  saveSlotID: string;
  Manager: TorigoyaMV_Achievement.AchievementManager;
  Scene_Achievement: TorigoyaMV_Achievement.Scene_Achievement;
  Window_AchievementList: TorigoyaMV_Achievement.Window_AchievementList;
  Window_AchievementPopup: TorigoyaMV_Achievement.Window_AchievementPopup;
}

declare class TorigoyaMZ_Achievement2 {
  name: "TorigoyaMZ_Achievement2";
  parameters: {
    version: string;
    baseAchievementData: TorigoyaMZ_Achievement2.Achievement[];
    baseSaveSlot: string;
    popupEnable: boolean;
    popupPosition: string;
    popupTopY: number;
    popupAnimationType: string;
    popupWait: number;
    popupWidth: number;
    popupPadding: number;
    popupTitleFontSize: number;
    popupTitleColor: number;
    popupMessage: string;
    popupMessageFontSize: number;
    popupSound: {
      soundName: string;
      soundVolume: number;
    };
    popupWindowImage: string;
    popupOpacity: number;
    titleMenuUseInTitle: boolean;
    titleMenuUseInMenu: boolean;
    titleMenuText: string;
    achievementMenuHiddenTitle: string;
    achievementMenuHiddenIcon: number;
    advancedFontFace: string;
    advancedOverwritable: boolean;
  };
  Manager: TorigoyaMZ_Achievement2.AchievementManager;
  PopupManager: TorigoyaMZ_Achievement2.AchievementPopupManager;
  Scene_Achievement: TorigoyaMZ_Achievement2.Scene_Achievement;
}

namespace TorigoyaMV_Achievement {
  declare class AchievementManager {
    // Unlocked achievements
    // (Date.now())[]
    private _achievements: number[];
    private _items: AchievementItem[];

    private _loadAchievements(): AchivementData[];

    getRawAchievements(): AchievementData[];
    setRawAchievements(achievements: AchievementData[]): void;

    data(id: number): AchievementData[];
    allData(): AchievementData[];

    isUnlocked(id: number): boolean;
    isAllUnlocked(): boolean;

    unlock(id: number): boolean;
    remove(id: number): void;

    on(callback: (achievement: AchievementData) => void): void;
    off(callback: (achievement: AchievementData) => void): void;
  }
}

namespace TorigoyaMZ_Achievement2 {
  type Achievement = {
    key: string;
    title: string;
    description: string;
    icon: number;
    hint: string;
    isSecret: boolean;
    note: string;
    meta: any;
  };

  type UnlockData = {
    date: number;
  };

  type Handler = (responseCode: { achievement: any; unlockInfo: any }) => void;

  declare class AchievementManager {
    private readonly _options: {
      onInit?: (manager: AchievementManager) => void;
      onSave?: (manager: AchievementManager) => void;
      overwritable?: boolean;
    };
    private _achievements: Achievement[];
    private _unlockInfo: Map<string, UnlockData>;
    private _handlers: Handler[];
    private _isReady: boolean;

    get achievements(): typeof this._achievements;

    get unlockInfo(): typeof this._unlockInfo;

    get options(): typeof this._options;

    /**
     * 生成
     * @param options
     */
    constructor(options: typeof this._options = {});

    /**
     * 初期化処理
     */
    init(): void;

    /**
     * 初期化完了
     * @returns {*}
     */
    isReady(): typeof this._isReady;

    /**
     * 実績マスター情報の登録
     */
    setAchievements(achievements: Achievement[]): void;

    /**
     * 獲得済み実績の保存
     * @returns {Promise}
     */
    save(): Promise<void>;

    /**
     * 実績リストを取得
     * @returns {{unlockInfo: any, achievement: *}[]}
     */
    data(): {
      achievement: Achievement;
      unlockInfo: UnlockData | null;
    }[];

    /**
     * 指定キーの実績情報を取得
     * @param {string} key  取得する実績のキー
     * @returns {Achievement|null}
     */
    getAchievement(key: string): Achievement | null;

    /**
     * 獲得済み実績の件数を取得
     * @returns {number}
     */
    getUnlockedCount(): number;

    /**
     * 実績獲得情報の取得
     * @param {string} key  取得するする実績のキー
     * @returns {any | null}
     */
    getUnlockInfo(key: string): UnlockData | null;

    /**
     * 指定キーの実績が獲得済みであるか？
     * @param {string} key  確認する実績のキー
     * @returns {boolean}
     */
    isUnlocked(...key: string[]): boolean;

    /**
     * すべての実績が獲得済みであるか？
     * @returns {boolean}
     */
    isAllUnlocked(): boolean;

    /**
     * 指定キーの実績が獲得可能であるか？
     * @param {string} key  確認する実績のキー
     * @returns {boolean}
     */
    isUnlockable(key: string): boolean;

    /**
     * 指定キーの実績を獲得する
     * @param {string} key  獲得する実績のキー
     * @returns {boolean}   実績獲得処理が実行されたか
     */
    unlock(key: string): boolean;

    /**
     * 実績獲得情報を生成する
     * ※アドオンプラグイン等で再定義・加工される想定
     * @param {string} _key 獲得する実績のキー
     * @returns {{date: number}}
     */
    makeUnlockData(_key: string): { date: number };

    /**
     * 指定キーの実績獲得イベントの通知
     * @param {string} key 獲得した実績のキー
     */
    notify(key: string);

    /**
     * 指定キーの実績を削除する
     * @param key
     */
    remove(key: any);

    /**
     * 全実績を削除する
     * @note 削除後にセーブ処理を呼び出す
     */
    clear();

    /**
     * 実績データのリセット
     */
    resetData();

    /**
     * 実績獲得通知イベントの購読開始
     * @param {Handler} handler
     */
    on(handler: Handler);

    /**
     * 実績獲得通知イベントの購読解除
     * @param {Handler} handler
     */
    off(handler: Handler);

    /**
     * keyの文字列化
     * @param key
     * @returns {string}
     * @private
     */
    normalizeKey(key: any): string;

    /**
     * 保存したいデータの出力
     */
    createSaveContents(): { unlockInfo: [string, UnlockData][] };

    /**
     * データのインポート
     * @param data
     */
    extractSaveContents(data: any);
  }

  declare class AchievementPopupManager {
    private readonly _manager: AchievementManager;
    private readonly _options: {
      popupPosition: string;
      popupWait: number;
      popupAnimationType: string;
      topY: number;
      createPopupWindow: (data: {
        achievement: Achievement;
        unlockInfo: UnlockData;
      }) => Window_AchievementPopup;
      playSe: () => void;
    };

    get options(): typeof this._options;

    /**
     * 生成
     * @param {AchievementManager} manager
     * @param {any} options
     */
    constructor(
      manager: AchievementManager,
      options: typeof this._options = {}
    );

    /**
     * 初期化処理
     */
    init();

    /**
     * リセット処理
     */
    reset();

    /**
     * 通知処理
     * @param {{achievement: Achievement, unlockInfo: any}} data
     */
    onNotify(data: { achievement: Achievement; unlockInfo: UnlockData });

    /**
     * Tweenを使った表示処理
     * @param {Window_AchievementPopup} popupWindow
     * @param {number} x
     * @param {number} y
     * @private
     */
    _showWithTween(popupWindow: Window_AchievementPopup, x: number, y: number);

    /**
     * Tweenを使わない表示処理
     * @param {Window_AchievementPopup} popupWindow
     * @param {number} x
     * @param {number} y
     * @private
     */
    _showWithoutTween(
      popupWindow: Window_AchievementPopup,
      x: number,
      y: number
    );

    /**
     * 一番左端
     * @returns {number}
     */
    leftX(): number;

    /**
     * 一番右端
     * @returns {number}
     */
    rightX(): number;

    /**
     * 表示Y座標:上端
     * @returns {number}
     */
    topY(): number;

    /**
     * ポップアップウィンドウの廃棄処理
     * @param popupWindow
     */
    destroyPopupWindow(popupWindow: Window_AchievementPopup);
  }

  declare class Scene_Achievement extends Scene_MenuBase {
    create();

    listWindowRect(): Rectangle;

    prepare(params: { isLaunchInTitle: true });

    start();

    onListOk();

    onListCancel();

    isLaunchInTitle(): boolean;
  }
}
