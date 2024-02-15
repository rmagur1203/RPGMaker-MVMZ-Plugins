import Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "event_start",
    message0: "Event Start",
    inputsInline: true,
    nextStatement: null,
    colour: 45,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "event_page_start",
    message0:
      "Event Page Start %1 %2 Actor %3 %4 %5 Item %6 %7 %8 Self Switch %9 %10 %11 Switch 1 %12 %13 %14 Switch 2 %15 %16 %17 Switch 3 %18 %19 %20 Variable %21 = %22",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_checkbox",
        name: "ACTOR_VALID",
        checked: true,
      },
      {
        type: "field_number",
        name: "ACTOR",
        value: 0,
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_checkbox",
        name: "ITEM_VALID",
        checked: true,
      },
      {
        type: "field_number",
        name: "ITEM",
        value: 0,
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_checkbox",
        name: "SELF_SWITCH_VALID",
        checked: true,
      },
      {
        type: "field_dropdown",
        name: "SELF_SWITCH",
        options: [
          ["A", "A"],
          ["B", "B"],
          ["C", "C"],
          ["D", "D"],
        ],
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_checkbox",
        name: "SWITCH1_VALID",
        checked: true,
      },
      {
        type: "field_number",
        name: "SWITCH1",
        value: 0,
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_checkbox",
        name: "SWITCH2_VALID",
        checked: true,
      },
      {
        type: "field_number",
        name: "SWITCH2",
        value: 0,
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_checkbox",
        name: "SWITCH3_VALID",
        checked: true,
      },
      {
        type: "field_number",
        name: "SWITCH3",
        value: 0,
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_checkbox",
        name: "VARIABLE_VALID",
        checked: true,
      },
      {
        type: "field_number",
        name: "VARIABLE_ID",
        value: 0,
      },
      {
        type: "field_input",
        name: "VARIABLE_VALUE",
        text: "default",
      },
    ],
    nextStatement: null,
    colour: 45,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "get_game_switch",
    message0: "$gameSwitch %1",
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
    type: "eval",
    message0: "eval %1",
    args0: [
      {
        type: "input_value",
        name: "SCRIPT",
        check: "String",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "eval_inline",
    message0: "eval %1",
    args0: [
      {
        type: "input_value",
        name: "SCRIPT",
        check: "String",
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
    type: "unknown_value",
    message0: "Unknown",
    inputsInline: true,
    output: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "unknown_command",
    message0: "Command %1",
    args0: [
      {
        type: "field_label_serializable",
        name: "CODE",
        text: "1",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "custom_operation",
    message0: "%1 %2",
    args0: [
      {
        type: "field_input",
        name: "OP",
        text: "+=",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "break",
    message0: "break",
    previousStatement: null,
    nextStatement: null,
    colour: 345,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_101",
    message0:
      "Show Text %1 Face Image %2 %3 %4 Background %5 %6 Position Type %7 %8 %9",
    args0: [
      {
        type: "input_end_row",
      },
      {
        type: "field_input",
        name: "FACE_NAME",
        text: "faceName",
      },
      {
        type: "field_input",
        name: "FACE_INDEX",
        text: "faceIndex",
      },
      {
        type: "input_end_row",
      },
      {
        type: "field_input",
        name: "BACKGROUND",
        text: "background",
      },
      {
        type: "input_end_row",
      },
      {
        type: "field_input",
        name: "POSITION_TYPE",
        text: "positionType",
      },
      {
        type: "input_end_row",
      },
      {
        type: "input_statement",
        name: "CHILD",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 180,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_101_401",
    message0: "Add Text %1 %2",
    args0: [
      {
        type: "input_end_row",
      },
      {
        type: "field_input",
        name: "TEXT",
        text: "text",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 180,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_102",
    message0:
      "Show Choices %1 Choices: %2 Cancel Type: %3 %4 Default Type: %5 %6 Position Type: %7 %8 Background: %9",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_value",
        name: "CHOICES",
      },
      {
        type: "field_input",
        name: "CANCEL_TYPE",
        text: "0",
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_input",
        name: "DEFAULT_TYPE",
        text: "0",
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_input",
        name: "POSITION_TYPE",
        text: "2",
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_input",
        name: "BACKGROUND",
        text: "0",
      },
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_111_0",
    message0: "If %1 == %2 %3 %4",
    args0: [
      {
        type: "input_value",
        name: "VARIABLE",
      },
      {
        type: "field_input",
        name: "PARAM",
        text: "default",
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "CHILD",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_111_1",
    message0: "If %1 %2 %3 %4",
    args0: [
      {
        type: "input_value",
        name: "VARIABLE",
      },
      {
        type: "field_input",
        name: "OP",
        text: "==",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
      {
        type: "input_statement",
        name: "CHILD",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_112",
    message0: "Loop %1 %2",
    args0: [
      {
        type: "input_end_row",
      },
      {
        type: "input_statement",
        name: "CHILD",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 315,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_113",
    message0: "Loop %1 %2",
    args0: [
      {
        type: "input_end_row",
      },
      {
        type: "input_statement",
        name: "CHILD",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 315,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_115",
    message0: "Exit",
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_117",
    message0: "Call Common Event %1",
    args0: [
      {
        type: "field_number",
        name: "NAME",
        value: 0,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_121",
    message0: "Control Switches From %1 To %2 As %3 %4",
    args0: [
      {
        type: "field_number",
        name: "START",
        value: 0,
      },
      {
        type: "field_number",
        name: "END",
        value: 0,
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_value",
        name: "NAME",
        check: "Boolean",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_122",
    message0: "set variable range %1 %2 to %3 %4 as %5 %6",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_value",
        name: "START",
        check: "Number",
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_value",
        name: "END",
        check: "Number",
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_222",
    message0: "Fade In Screen",
    previousStatement: null,
    nextStatement: null,
    colour: 180,
    tooltip: "Fade In Effect",
    helpUrl: "",
  },
  {
    type: "command_230",
    message0: "Wait %1",
    args0: [
      {
        type: "field_number",
        name: "DURATION",
        value: 0,
      },
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 315,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_231",
    message0:
      "Show Image %1 Picture Id %2 %3 Name %4 %5 Origin %6 %7 x %8 y %9 Scale x:  %10 , y:  %11 %12 Opacity %13 %14 Blend mode %15 %16",
    args0: [
      {
        type: "input_end_row",
      },
      {
        type: "field_number",
        name: "PICTURE_ID",
        value: 0,
      },
      {
        type: "input_end_row",
      },
      {
        type: "field_input",
        name: "NAME",
        text: "",
      },
      {
        type: "input_end_row",
      },
      {
        type: "field_number",
        name: "ORIGIN",
        value: 0,
      },
      {
        type: "input_end_row",
      },
      {
        type: "input_value",
        name: "X",
      },
      {
        type: "input_value",
        name: "Y",
      },
      {
        type: "field_number",
        name: "SCALE_X",
        value: 0,
      },
      {
        type: "field_number",
        name: "SCALE_Y",
        value: 0,
      },
      {
        type: "input_end_row",
      },
      {
        type: "field_number",
        name: "OPACITY",
        value: 0,
      },
      {
        type: "input_end_row",
      },
      {
        type: "field_number",
        name: "BLEND_MODE",
        value: 0,
      },
      {
        type: "input_end_row",
      },
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_235",
    message0: "Erase Picture %1",
    args0: [
      {
        type: "field_number",
        name: "ID",
        value: 0,
      },
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_241",
    message0: "Play BGM %1 %2",
    args0: [
      {
        type: "input_end_row",
      },
      {
        type: "field_input",
        name: "PARAM",
        text: "{}",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 180,
    tooltip: "Fade In Effect",
    helpUrl: "",
  },
  {
    type: "command_250",
    message0: "AudioManager.playSe %1",
    args0: [
      {
        type: "field_number",
        name: "NAME",
        value: 0,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_352",
    message0: "Open Save",
    previousStatement: null,
    nextStatement: null,
    colour: 15,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_355",
    message0: "eval %1",
    args0: [
      {
        type: "input_value",
        name: "SCRIPT",
        check: "String",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_356",
    message0: "Call Plugin Command %1 Command:  %2 %3 Args:  %4",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_input",
        name: "COMMAND",
        text: "default",
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_value",
        name: "ARGS",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 180,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_402",
    message0: "When %1 %2 %3",
    args0: [
      {
        type: "field_input",
        name: "RESULT",
        text: "result",
      },
      {
        type: "input_end_row",
      },
      {
        type: "input_statement",
        name: "CHILD",
      },
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 315,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "command_413",
    message0: "Repeat Above",
    previousStatement: null,
    nextStatement: null,
    colour: 315,
    tooltip: "",
    helpUrl: "",
  },
]);
