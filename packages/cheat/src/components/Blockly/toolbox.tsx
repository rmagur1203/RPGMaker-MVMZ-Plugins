import React from "react";

const Xml = React.forwardRef((props: any, ref) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("xml", { ...rest, ref }, children);
});

const Category = (props: any) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("category", rest, children);
};

const Block = (props: any) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("block", rest, children);
};

const Field = (props: any) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("field", rest, children);
};

const Value = (props: any) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("value", rest, children);
};

const Shadow = (props: any) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("shadow", rest, children);
};

const Sep = (props: any) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("sep", rest, children);
};

const Mutation = (props: any) => {
  const { children, ...rest } = props;
  rest.is = "blockly";
  return React.createElement("mutation", rest, children);
};

const Toolbox = React.forwardRef(function (props, ref) {
  return (
    <Xml
      ref={ref}
      xmlns="https://developers.google.com/Blockly/xml"
      id="toolbox"
      style={{ display: "none" }}
    >
      <Category name="Logic" colour="#5b80a5">
        <Block type="controls_if"></Block>
        <Block type="logic_compare">
          <Field name="OP">EQ</Field>
        </Block>
        <Block type="logic_operation">
          <Field name="OP">AND</Field>
        </Block>
        <Block type="logic_negate"></Block>
        <Block type="logic_boolean">
          <Field name="BOOL">TRUE</Field>
        </Block>
        <Block type="logic_null"></Block>
        <Block type="logic_ternary"></Block>
      </Category>
      <Category name="Loops" colour="#5ba55b">
        <Block type="controls_repeat_ext">
          <Value name="TIMES">
            <Shadow type="math_number">
              <Field name="NUM">10</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="controls_whileUntil">
          <Field name="MODE">WHILE</Field>
        </Block>
        <Block type="controls_for">
          <Field name="VAR" id="L_BxW$cVMRP+=@95uyQQ">
            i
          </Field>
          <Value name="FROM">
            <Shadow type="math_number">
              <Field name="NUM">1</Field>
            </Shadow>
          </Value>
          <Value name="TO">
            <Shadow type="math_number">
              <Field name="NUM">10</Field>
            </Shadow>
          </Value>
          <Value name="BY">
            <Shadow type="math_number">
              <Field name="NUM">1</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="controls_forEach">
          <Field name="VAR" id="ns:,fRZ6r|uN8VtMbg[+">
            j
          </Field>
        </Block>
        <Block type="controls_flow_statements">
          <Field name="FLOW">BREAK</Field>
        </Block>
      </Category>
      <Category name="Math" colour="#5b67a5">
        <Block type="math_number">
          <Field name="NUM">0</Field>
        </Block>
        <Block type="math_arithmetic">
          <Field name="OP">ADD</Field>
          <Value name="A">
            <Shadow type="math_number">
              <Field name="NUM">1</Field>
            </Shadow>
          </Value>
          <Value name="B">
            <Shadow type="math_number">
              <Field name="NUM">1</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="math_single">
          <Field name="OP">ROOT</Field>
          <Value name="NUM">
            <Shadow type="math_number">
              <Field name="NUM">9</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="math_trig">
          <Field name="OP">SIN</Field>
          <Value name="NUM">
            <Shadow type="math_number">
              <Field name="NUM">45</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="math_constant">
          <Field name="CONSTANT">PI</Field>
        </Block>
        <Block type="math_number_property">
          <Mutation divisor_input="false"></Mutation>
          <Field name="PROPERTY">EVEN</Field>
          <Value name="NUMBER_TO_CHECK">
            <Shadow type="math_number">
              <Field name="NUM">0</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="math_round">
          <Field name="OP">ROUND</Field>
          <Value name="NUM">
            <Shadow type="math_number">
              <Field name="NUM">3.1</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="math_on_list">
          <Mutation op="SUM"></Mutation>
          <Field name="OP">SUM</Field>
        </Block>
        <Block type="math_modulo">
          <Value name="DIVIDEND">
            <Shadow type="math_number">
              <Field name="NUM">64</Field>
            </Shadow>
          </Value>
          <Value name="DIVISOR">
            <Shadow type="math_number">
              <Field name="NUM">10</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="math_constrain">
          <Value name="VALUE">
            <Shadow type="math_number">
              <Field name="NUM">50</Field>
            </Shadow>
          </Value>
          <Value name="LOW">
            <Shadow type="math_number">
              <Field name="NUM">1</Field>
            </Shadow>
          </Value>
          <Value name="HIGH">
            <Shadow type="math_number">
              <Field name="NUM">100</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="math_random_int">
          <Value name="FROM">
            <Shadow type="math_number">
              <Field name="NUM">1</Field>
            </Shadow>
          </Value>
          <Value name="TO">
            <Shadow type="math_number">
              <Field name="NUM">100</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="math_random_float"></Block>
      </Category>
      <Category name="Text" colour="#5ba58c">
        <Block type="text">
          <Field name="TEXT"></Field>
        </Block>
        <Block type="text_join">
          <Mutation items="2"></Mutation>
        </Block>
        <Block type="text_append">
          <Field name="VAR" id="Ti2@t6l,$g{K,]FBOR:K">
            item
          </Field>
          <Value name="TEXT">
            <Shadow type="text">
              <Field name="TEXT"></Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="text_length">
          <Value name="VALUE">
            <Shadow type="text">
              <Field name="TEXT">abc</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="text_isEmpty">
          <Value name="VALUE">
            <Shadow type="text">
              <Field name="TEXT"></Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="text_indexOf">
          <Field name="END">FIRST</Field>
          <Value name="VALUE">
            <Block type="variables_get">
              <Field name="VAR" id="f*Ti#lQIMQ-oiB^b:?vF">
                text
              </Field>
            </Block>
          </Value>
          <Value name="FIND">
            <Shadow type="text">
              <Field name="TEXT">abc</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="text_charAt">
          <Mutation at="true"></Mutation>
          <Field name="WHERE">FROM_START</Field>
          <Value name="VALUE">
            <Block type="variables_get">
              <Field name="VAR" id="f*Ti#lQIMQ-oiB^b:?vF">
                text
              </Field>
            </Block>
          </Value>
        </Block>
        <Block type="text_getSubstring">
          <Mutation at1="true" at2="true"></Mutation>
          <Field name="WHERE1">FROM_START</Field>
          <Field name="WHERE2">FROM_START</Field>
          <Value name="STRING">
            <Block type="variables_get">
              <Field name="VAR" id="f*Ti#lQIMQ-oiB^b:?vF">
                text
              </Field>
            </Block>
          </Value>
        </Block>
        <Block type="text_changeCase">
          <Field name="CASE">UPPERCASE</Field>
          <Value name="TEXT">
            <Shadow type="text">
              <Field name="TEXT">abc</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="text_trim">
          <Field name="MODE">BOTH</Field>
          <Value name="TEXT">
            <Shadow type="text">
              <Field name="TEXT">abc</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="text_print">
          <Value name="TEXT">
            <Shadow type="text">
              <Field name="TEXT">abc</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="text_prompt_ext">
          <Mutation type="TEXT"></Mutation>
          <Field name="TYPE">TEXT</Field>
          <Value name="TEXT">
            <Shadow type="text">
              <Field name="TEXT">abc</Field>
            </Shadow>
          </Value>
        </Block>
      </Category>
      <Category name="Lists" colour="#745ba5">
        <Block type="lists_create_with">
          <Mutation items="0"></Mutation>
        </Block>
        <Block type="lists_create_with">
          <Mutation items="3"></Mutation>
        </Block>
        <Block type="lists_repeat">
          <Value name="NUM">
            <Shadow type="math_number">
              <Field name="NUM">5</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="lists_length"></Block>
        <Block type="lists_isEmpty"></Block>
        <Block type="lists_indexOf">
          <Field name="END">FIRST</Field>
          <Value name="VALUE">
            <Block type="variables_get">
              <Field name="VAR" id="gpr-vOUi[eZRiR5Wy/M:">
                list
              </Field>
            </Block>
          </Value>
        </Block>
        <Block type="lists_getIndex">
          <Mutation statement="false" at="true"></Mutation>
          <Field name="MODE">GET</Field>
          <Field name="WHERE">FROM_START</Field>
          <Value name="VALUE">
            <Block type="variables_get">
              <Field name="VAR" id="gpr-vOUi[eZRiR5Wy/M:">
                list
              </Field>
            </Block>
          </Value>
        </Block>
        <Block type="lists_setIndex">
          <Mutation at="true"></Mutation>
          <Field name="MODE">SET</Field>
          <Field name="WHERE">FROM_START</Field>
          <Value name="LIST">
            <Block type="variables_get">
              <Field name="VAR" id="gpr-vOUi[eZRiR5Wy/M:">
                list
              </Field>
            </Block>
          </Value>
        </Block>
        <Block type="lists_getSublist">
          <Mutation at1="true" at2="true"></Mutation>
          <Field name="WHERE1">FROM_START</Field>
          <Field name="WHERE2">FROM_START</Field>
          <Value name="LIST">
            <Block type="variables_get">
              <Field name="VAR" id="gpr-vOUi[eZRiR5Wy/M:">
                list
              </Field>
            </Block>
          </Value>
        </Block>
        <Block type="lists_split">
          <Mutation mode="SPLIT"></Mutation>
          <Field name="MODE">SPLIT</Field>
          <Value name="DELIM">
            <Shadow type="text">
              <Field name="TEXT">,</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="lists_sort">
          <Field name="TYPE">NUMERIC</Field>
          <Field name="DIRECTION">1</Field>
        </Block>
      </Category>
      <Category name="Colour" colour="#a5745b">
        <Block type="colour_picker">
          <Field name="COLOUR">#ff0000</Field>
        </Block>
        <Block type="colour_random"></Block>
        <Block type="colour_rgb">
          <Value name="RED">
            <Shadow type="math_number">
              <Field name="NUM">100</Field>
            </Shadow>
          </Value>
          <Value name="GREEN">
            <Shadow type="math_number">
              <Field name="NUM">50</Field>
            </Shadow>
          </Value>
          <Value name="BLUE">
            <Shadow type="math_number">
              <Field name="NUM">0</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="colour_blend">
          <Value name="COLOUR1">
            <Shadow type="colour_picker">
              <Field name="COLOUR">#ff0000</Field>
            </Shadow>
          </Value>
          <Value name="COLOUR2">
            <Shadow type="colour_picker">
              <Field name="COLOUR">#3333ff</Field>
            </Shadow>
          </Value>
          <Value name="RATIO">
            <Shadow type="math_number">
              <Field name="NUM">0.5</Field>
            </Shadow>
          </Value>
        </Block>
      </Category>
      <Sep></Sep>
      <Category name="Variables" colour="#a55b80" custom="VARIABLE"></Category>
      <Category name="Functions" colour="#995ba5" custom="PROCEDURE"></Category>
      <Sep></Sep>
      <Category name="Game Variables" colour="#a55b80"></Category>
    </Xml>
  );
});

export default Toolbox;
