import Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "get_game_variable",
    message0: "$gameVariable %1",
    args0: [
      {
        type: "field_number",
        name: "NAME",
        value: 0,
        min: 0,
      },
    ],
    inputsInline: true,
    output: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "nop",
    message0: "NOP",
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "event_start",
    message0: "Event Start",
    inputsInline: true,
    nextStatement: null,
    colour: 45,
    tooltip: "",
    helpUrl: "",
  },
]);
