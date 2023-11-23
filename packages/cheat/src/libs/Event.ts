import { ObservableProcedureModel } from "@blockly/block-shareable-procedures";
import Blockly from "blockly";

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
  root: Blockly.Block,
  event: RPG.CommonEvent
) {
  const instructions = event.list;
  let connection = root.nextConnection!;
  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    const code = instruction.code;
    const indent = instruction.indent;
    const parameters = instruction.parameters;

    const block = root.workspace.newBlock("nop");
    (block as any).initSvg();

    connection.connect(block.previousConnection!);
    connection = block.nextConnection!;
  }

  (root.workspace as any).render();
}
