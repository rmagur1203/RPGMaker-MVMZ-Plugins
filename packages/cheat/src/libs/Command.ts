import Blockly from "blockly";

type Generator = (
  this: BlocklyInterpreter,
  workspace: Blockly.WorkspaceSvg | Blockly.Workspace,
  command: RPG.EventCommand
) => Blockly.BlockSvg | Blockly.Block | null;

const COMMANDS: Record<number, Generator> = {};

export function CommandToBlock(
  this: BlocklyInterpreter,
  workspace: Blockly.WorkspaceSvg | Blockly.Workspace,
  command: RPG.EventCommand
) {
  const generator = COMMANDS[command.code];
  let block: Blockly.BlockSvg | Blockly.Block | null = null;
  if (generator) {
    block = generator.call(this, workspace, command);
  } else if (!(Game_Interpreter.prototype as any)[`command${command.code}`]) {
    block = workspace.newBlock("nop");
  } else if (!block) {
    block = workspace.newBlock("unknown_command");
    block.setFieldValue(command.code.toString(), "CODE");
  }
  (block as any).initSvg();
  return block;
}

COMMANDS[0] = function (workspace, command) {
  return workspace.newBlock("nop");
};

COMMANDS[101] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  let block = workspace.newBlock("command_101");
  block.setFieldValue(parameters[0], "FACE_NAME");
  block.setFieldValue(parameters[1], "FACE_INDEX");
  block.setFieldValue(parameters[2], "BACKGROUND");
  block.setFieldValue(parameters[3], "POSITION_TYPE");
  (block as any).initSvg();

  let lastConnection = block.getInput("CHILD")!.connection!;

  while (
    [401, 102, 103, 104].includes(this._instructions[this._index + 1].code)
  ) {
    this._index++;

    const inst = this._instructions[this._index];
    let child = null;
    switch (inst.code) {
      case 401:
        child = workspace.newBlock("command_101_401");
        child.setFieldValue(inst.parameters[0], "TEXT");
        break;
    }

    (child as any).initSvg();

    if (child) {
      lastConnection.connect(child.previousConnection!);
      lastConnection = child.nextConnection!;
    }

    if (inst.code !== 401) {
      break;
    }
  }

  return block;
};

COMMANDS[102] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  const block = workspace.newBlock("command_102");
  const ChoicesBlock = workspace.newBlock("lists_create_with");
  for (let i = 0; i < parameters[0].length; i++) {
    (
      ChoicesBlock.getInput(`ADD${i}`) ??
      ChoicesBlock.appendValueInput(`ADD${i}`)
    ).connection!.connect(StringBlock(parameters[0][i]).outputConnection!);
  }
  (ChoicesBlock as any).initSvg();
  block
    .getInput("CHOICES")
    ?.connection?.connect(ChoicesBlock.outputConnection!);
  block.setFieldValue(command.parameters[1], "CANCEL_TYPE");
  block.setFieldValue(command.parameters[2], "DEFAULT_TYPE");
  block.setFieldValue(command.parameters[3], "POSITION_TYPE");
  block.setFieldValue(command.parameters[4], "BACKGROUND");
  (block as any).initSvg();

  return block;
};

COMMANDS[112] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  const block = workspace.newBlock("command_112");
  let lastConnection = block.getInput("CHILD")!.connection!;

  while (this._instructions[this._index].indent > indent) {
    const child = CommandToBlock.call(
      this,
      workspace,
      this._instructions[this._index]
    );
    if (child) {
      lastConnection.connect(child.previousConnection!);
      lastConnection = child.nextConnection!;
    }
    this._index++;
  }

  return block;
};

COMMANDS[113] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  const block = workspace.newBlock("command_113");
  let lastConnection = block.getInput("CHILD")!.connection!;

  const original413 = COMMANDS[413];
  COMMANDS[413] = function (workspace, command) {
    const block = workspace.newBlock("break");
    (block as any).initSvg();

    return block;
  };

  while (this._instructions[this._index + 1].indent > indent) {
    this._index++;
    const child = CommandToBlock.call(
      this,
      workspace,
      this._instructions[this._index]
    );
    if (child) {
      lastConnection.connect(child.previousConnection!);
      lastConnection = child.nextConnection!;
    }
  }

  COMMANDS[413] = original413;

  return block;
};

COMMANDS[117] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  const block = workspace.newBlock("command_117");
  block.setFieldValue(parameters[0], "NAME");
  (block as any).initSvg();

  return block;
};

COMMANDS[121] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  const block = workspace.newBlock("command_121");
  block.setFieldValue(parameters[0], "START");
  block.setFieldValue(parameters[1], "END");
  block
    .getInput("NAME")
    ?.connection?.connect(BooleanBlock(parameters[2] === 0).outputConnection!);
  (block as any).initSvg();

  return block;
};

COMMANDS[122] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  const block = workspace.newBlock("command_122");
  block
    .getInput("START")
    ?.connection?.connect(NumberBlock(parameters[0]).outputConnection!);
  block
    .getInput("END")
    ?.connection?.connect(NumberBlock(parameters[1]).outputConnection!);

  let value = null;
  switch (parameters[3]) {
    case 0: // Constant
      value = AutoBlock(parameters[4]);
      break;
    case 1: // Variable
      value = workspace.newBlock("get_game_variable");
      value.setFieldValue(parameters[4].toString(), "NAME");
      break;
    case 2: // Random
      value = workspace.newBlock("math_random_int");
      value
        .getInput("FROM")
        ?.connection?.connect(NumberBlock(parameters[4]).outputConnection!);
      value
        .getInput("TO")
        ?.connection?.connect(NumberBlock(parameters[5]).outputConnection!);
      break;
    case 3: // Game Data
      value = workspace.newBlock("unknown_value");
      break;
    case 4: // Script
      value = workspace.newBlock("eval_inline");
      value
        .getInput("SCRIPT")
        ?.connection?.connect(StringBlock(parameters[4]).outputConnection!);
      break;
  }
  (value as any).initSvg();

  let math = workspace.newBlock("custom_operation");
  switch (parameters[2]) {
    case 0: // Set
      math.setFieldValue("=", "OP");
      break;
    case 1: // Add
      math.setFieldValue("+=", "OP");
      break;
    case 2: // Sub
      math.setFieldValue("-=", "OP");
      break;
    case 3: // Mul
      math.setFieldValue("*=", "OP");
      break;
    case 4: // Div
      math.setFieldValue("/=", "OP");
      break;
    case 5: // Mod
      math.setFieldValue("%=", "OP");
      break;
  }
  math.getInput("VALUE")?.connection?.connect(value!.outputConnection!);
  (math as any).initSvg();

  block.getInput("VALUE")?.connection?.connect(math.outputConnection!);

  return block;
};

COMMANDS[222] = function (workspace, command) {
  let block = workspace.newBlock("command_222");
  (block as any).initSvg();

  return block;
};

COMMANDS[230] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  let block = workspace.newBlock("command_230");
  block.setFieldValue(parameters[0], "DURATION");
  (block as any).initSvg();

  return block;
};

COMMANDS[231] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  const block = workspace.newBlock("command_231");
  block.setFieldValue(parameters[0], "PICTURE_ID");
  block.setFieldValue(parameters[1], "NAME");
  block.setFieldValue(parameters[2], "ORIGIN");
  if (parameters[3] === 0) {
    block
      .getInput("X")
      ?.connection?.connect(NumberBlock(parameters[4]).outputConnection!);
    block
      .getInput("Y")
      ?.connection?.connect(NumberBlock(parameters[5]).outputConnection!);
  } else {
    block
      .getInput("X")
      ?.connection?.connect(VariableBlock(parameters[4]).outputConnection!);
    block
      .getInput("Y")
      ?.connection?.connect(VariableBlock(parameters[5]).outputConnection!);
  }
  block.setFieldValue(parameters[6], "SCALE_X");
  block.setFieldValue(parameters[7], "SCALE_Y");
  block.setFieldValue(parameters[8], "OPACITY");
  block.setFieldValue(parameters[9], "BLEND_MODE");
  (block as any).initSvg();

  return block;
};

COMMANDS[235] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  let block = workspace.newBlock("command_235");
  block.setFieldValue(parameters[0], "ID");
  (block as any).initSvg();

  return block;
};

COMMANDS[241] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  let block = workspace.newBlock("command_241");
  block.setFieldValue(JSON.stringify(parameters[0], null, 2), "PARAM");
  (block as any).initSvg();

  return block;
};

COMMANDS[250] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  const block = workspace.newBlock("command_250");
  block.setFieldValue(parameters[0], "NAME");
  (block as any).initSvg();

  return block;
};

COMMANDS[352] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  let block = workspace.newBlock("command_352");
  (block as any).initSvg();

  return block;
};

COMMANDS[355] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  const block = workspace.newBlock("command_355");
  block
    .getInput("SCRIPT")
    ?.connection?.connect(StringBlock(parameters[0]).outputConnection!);
  (block as any).initSvg();

  return block;
};

COMMANDS[356] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  const args = parameters[0].split(" ");
  const cmd = args.shift()!;

  const ArgsBlock = workspace.newBlock("lists_create_with");
  for (let i = 0; i < args.length; i++) {
    (
      ArgsBlock.getInput(`ADD${i}`) ?? ArgsBlock.appendValueInput(`ADD${i}`)
    ).connection!.connect(AutoBlock(args[i])!.outputConnection!);
  }
  (ArgsBlock as any).initSvg();

  const block = workspace.newBlock("command_356");
  block.setFieldValue(cmd, "COMMAND");
  block.getInput("ARGS")?.connection?.connect(ArgsBlock.outputConnection!);
  (block as any).initSvg();

  return block;
};

COMMANDS[402] = function (workspace, command) {
  const code = command.code;
  const indent = command.indent;
  const parameters = command.parameters;

  const block = workspace.newBlock("command_402");
  block.setFieldValue(parameters[0], "RESULT");
  let lastConnection = block.getInput("CHILD")!.connection!;

  while (this._instructions[this._index + 1].indent > indent) {
    this._index++;
    const child = CommandToBlock.call(
      this,
      workspace,
      this._instructions[this._index]
    );
    if (child) {
      lastConnection.connect(child.previousConnection!);
      lastConnection = child.nextConnection!;
    }
  }

  return block;
};

COMMANDS[413] = function (workspace, command) {
  const block = workspace.newBlock("command_413");
  (block as any).initSvg();

  return block;
};

const AutoBlock = (value: any) => {
  if (typeof value === "number") {
    return NumberBlock(value);
  }
  if (typeof value === "string") {
    return StringBlock(value);
  }
  if (typeof value === "boolean") {
    return BooleanBlock(value);
  }
  return null;
};

const NumberBlock = (value: number) => {
  const block = Blockly.common.getMainWorkspace().newBlock("math_number");
  block.setFieldValue(value.toString(), "NUM");
  (block as any).initSvg();
  return block;
};

const StringBlock = (value: string) => {
  const block = Blockly.common.getMainWorkspace().newBlock("text");
  block.setFieldValue(value, "TEXT");
  (block as any).initSvg();
  return block;
};

const BooleanBlock = (value: boolean) => {
  const block = Blockly.common.getMainWorkspace().newBlock("logic_boolean");
  block.setFieldValue(value ? "TRUE" : "FALSE", "BOOL");
  (block as any).initSvg();
  return block;
};

const VariableBlock = (variableId: number) => {
  const block = Blockly.common.getMainWorkspace().newBlock("get_game_variable");
  block.setFieldValue(variableId, "NAME");
  (block as any).initSvg();
  return block;
};
