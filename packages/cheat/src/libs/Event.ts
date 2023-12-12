import { ObservableProcedureModel } from "@blockly/block-shareable-procedures";
import Blockly from "blockly";
import { CommandToBlock } from "./Command";

export function generateCommonEventProcedures() {
  const commonEvents = $dataCommonEvents;

  Blockly.Blocks["my_procedure_def"] = {
    init: function () {
      this.model = new ObservableProcedureModel(
        Blockly.common.getMainWorkspace(),
        "default name"
      );
      this.workspace.getProcedureMap().add(this.model);
      // etc...
    },

    destroy: function () {
      // Optionally:
      // Destroy the model when the definition block is deleted.
      this.workpace.getProcedureMap().delete(this.model.getId());
    },
  };
}

export function CommonEventToBlocks(
  workspace: Blockly.Workspace,
  event: RPG.CommonEvent
) {
  const root = workspace.newBlock("event_start");
  (root as any).initSvg();

  const instructions = event.list;
  const interpreter: BlocklyInterpreter = {
    _index: 0,
    _instructions: instructions,
    _stack: [],
  };
  let connection = root.nextConnection!;
  while (interpreter._index < instructions.length) {
    const instruction = instructions[interpreter._index++];
    const code = instruction.code;
    const indent = instruction.indent;
    const parameters = instruction.parameters;

    const block = CommandToBlock.call(interpreter, root.workspace, instruction);
    (block as any).initSvg();

    connection.connect(block!.previousConnection!);
    connection = block!.nextConnection!;
  }

  (workspace as any).render();
}

export function EventToBlocks(workspace: Blockly.Workspace, event: RPG.Event) {
  for (const page of event.pages) {
    const start = workspace.newBlock("event_page_start");
    start.setFieldValue(page.conditions.actorId, "ACTOR");
    start.setFieldValue(page.conditions.actorValid, "ACTOR_VALID");
    start.setFieldValue(page.conditions.itemId, "ITEM");
    start.setFieldValue(page.conditions.itemValid, "ITEM_VALID");
    start.setFieldValue(page.conditions.selfSwitchCh, "SELF_SWITCH");
    start.setFieldValue(page.conditions.selfSwitchValid, "SELF_SWITCH_VALID");
    start.setFieldValue(page.conditions.switch1Id, "SWITCH1");
    start.setFieldValue(page.conditions.switch1Valid, "SWITCH1_VALID");
    start.setFieldValue(page.conditions.switch2Id, "SWITCH2");
    start.setFieldValue(page.conditions.switch2Valid, "SWITCH2_VALID");
    start.setFieldValue(page.conditions.switch3Id, "SWITCH3");
    start.setFieldValue(page.conditions.switch3Valid, "SWITCH3_VALID");
    start.setFieldValue(page.conditions.variableId, "VARIABLE_ID");
    start.setFieldValue(page.conditions.variableValue, "VARIABLE_VALUE");
    start.setFieldValue(page.conditions.variableValid, "VARIABLE_VALID");
    start.setNextStatement(true, null);
    start.setColour(45);
    start.setTooltip("");
    start.setHelpUrl("");
    (start as any).initSvg();

    workspace.addTopBlock(start);

    const instructions = page.list;
    const interpreter: BlocklyInterpreter = {
      _index: 0,
      _instructions: instructions,
      _stack: [],
    };
    let connection = start.nextConnection!;
    while (interpreter._index < instructions.length) {
      const instruction = instructions[interpreter._index++];
      const code = instruction.code;
      const indent = instruction.indent;
      const parameters = instruction.parameters;

      const block = CommandToBlock.call(interpreter, workspace, instruction);
      (block as any).initSvg();

      connection.connect(block!.previousConnection!);
      connection = block!.nextConnection!;
    }

    (workspace as any).render();
  }
}
