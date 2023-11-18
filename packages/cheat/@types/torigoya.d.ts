declare class Torigoya {
  static Achievement: TorigoyaMV_Achievement;
}

declare class TorigoyaMV_Achievement {
  name: "Torigoya_Achievement";
  saveSlotID: string;
  Manager: TorigoyaMV_Achievement.AchievementManager;
  Scene_Achievement: TorigoyaMV_Achievement.Scene_Achievement;
  Window_AchievementList: TorigoyaMV_Achievement.Window_AchievementList;
  Window_AchievementPopup: TorigoyaMV_Achievement.Window_AchievementPopup;
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
