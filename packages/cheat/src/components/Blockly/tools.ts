import Blockly from "blockly";
import { Tool } from "react-blockly-drawer";

const variables: Tool[] = [
  {
    name: "get_game_variable",
    block: {
      init() {
        this.appendDummyInput()
          .appendField("$gameVariable")
          .appendField(new Blockly.FieldNumber(0, 0), "NAME");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
      },
    },
    category: "Game Variable",
    generator(block) {
      const variableId = block.getFieldValue("variable_id");
      const code = `this.gameVariables[${variableId}]`;
      return [code, Blockly.JavaScript.ORDER_MEMBER];
    },
  },
];

export default [...variables];
