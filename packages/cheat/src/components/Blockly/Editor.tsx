import React, { useState, useEffect, useRef } from "react";
import Blockly from "blockly";
import BlocklyDrawer, {
  Tool,
  Mutation,
  Block,
  Category,
  Field,
  Value,
  Shadow,
  Sep,
} from "react-blockly-drawer";
import { DisableTopBlocks } from "@blockly/disable-top-blocks";
import tools from "./tools";
import styled from "styled-components";
import Toolbox from "./toolbox";
import Modal from "../Modal";

interface EditorProps {
  open: boolean;
  onClose: () => void;
}

export default function ({ open, onClose }: EditorProps) {
  const [json, setJson] = useState<object>();
  const areaRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const toolboxRef = useRef<HTMLElement>(null);
  const [workspace, setWorkspace] = useState<Blockly.WorkspaceSvg>();

  const onresize = function () {
    if (
      !workspace ||
      !areaRef.current ||
      !workspaceRef.current ||
      !toolboxRef.current
    )
      return;
    // Compute the absolute coordinates and dimensions of blocklyArea.
    let element: HTMLElement = areaRef.current!;
    let x = 0;
    let y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent! as HTMLElement;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    workspaceRef.current.style.left = x + "px";
    workspaceRef.current.style.top = y + "px";
    workspaceRef.current.style.width = areaRef.current.offsetWidth + "px";
    workspaceRef.current.style.height = areaRef.current.offsetHeight + "px";
    Blockly.svgResize(workspace);
  };

  useEffect(() => {
    console.log(areaRef.current, workspaceRef.current, toolboxRef.current);
    if (!areaRef.current || !workspaceRef.current || !toolboxRef.current)
      return;
    const workspace = Blockly.inject(workspaceRef.current, {
      toolbox: toolboxRef.current,
    });

    setWorkspace(workspace);

    window.addEventListener("resize", onresize, false);

    onresize();

    return () => {
      window.removeEventListener("resize", onresize);
    };
  }, []);

  useEffect(() => {
    onresize();
  });

  return (
    <Modal open={open} onClose={onClose} zIndex={11000}>
      <BlocklyArea ref={areaRef}>
        <BlocklyWorkspace ref={workspaceRef}>
          <Toolbox ref={toolboxRef} />
        </BlocklyWorkspace>
      </BlocklyArea>
    </Modal>
  );
}

const BlocklyArea = styled.div`
  /* position: relative; */
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
`;

const BlocklyWorkspace = styled.div`
  position: absolute;
`;
