var rngd_recollection_mode_settings: rngd_recollection_mode_settings;
var rngdRecollectionModeMZSettings: rngdRecollectionModeMZSettings;
var rngdRecollectionGlobalContents: rngdRecollectionGlobalContents;
var Window_RecList: any;

interface Window {
  rngd_recollection_mode_settings: rngd_recollection_mode_settings;
  rngdRecollectionModeMZSettings: rngdRecollectionModeMZSettings;
}

type CGSet = Record<
  number,
  {
    title: string;
    thumbnail: string;
    switch_id: number;
    common_event_id: number;
    pictures: string[];
  }
>;

type rngd_recollection_mode_settings = {
  rec_cg_set: CGSet;
  rec_cg_switch: Record<string, number>;
  rec_list_window: {
    item_height: number;
    item_width: number;
    never_watch_picture_name: string;
    never_watch_title_text: string;
    show_title_text: boolean;
    title_text_align: string;
  };
  rec_mode_bgm: {
    bgm: {
      name: string;
      pan: number;
      pitch: number;
      volume: number;
    };
  };
  rec_mode_window: {
    x: number;
    y: number;
    recollection_title: string;
    str_select_recollection: string;
    str_select_cg: string;
    str_select_back_title: string;
  };
  sandbox_map_id: number;
  share_recollection_switches: boolean;
};

type rngdRecollectionModeMZSettings = {
  dataSystem_optTransparent: boolean;
  devParameterDevTools: boolean;

  recModeSelectWindow: {
    /**
     * @example 260
     */
    recModeSelectWindowX: number;
    /**
     * @example 180
     */
    recModeSelectWindowY: number;
    /**\
     * @example "클리어 특전"
     */
    recModeSelectWindowRecoTitle: string;
    /**
     * @example "회상을 본다"
     */
    recModeSelectWindowSelectReco: string;
    /**
     * @example "CG를 본다"
     */
    recModeSelectWindowSelectCg: string;
    /**
     * @example "타이틀에 돌아온다"
     */
    recModeSelectWindowBackTitle: string;
  };

  recoCgSettingList: string;
  sandboxMapId: number;
  shareSaveSwitches: boolean;
};

type rngdRecollectionGlobalContents = {
  switches: Record<number, boolean>;
};
