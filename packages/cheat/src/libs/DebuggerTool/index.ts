import { unlockEvent, unlockRange } from "./unlock";
import { findEvent, pageHasCondition, selfSwitchTools } from "./utils";
import Plugin from "./plugin";

window.DebuggerTool = {
  unlockRange,
  unlockEvent,
  findEvent,
  pageHasCondition,
  selfSwitchTools,
  Plugin,
};
