import React, { useState, useEffect, useRef, useCallback } from "react";
import Blockly from "blockly";
import { DisableTopBlocks } from "@blockly/disable-top-blocks";
import {
  blocks,
  unregisterProcedureBlocks,
} from "@blockly/block-shareable-procedures";
import Modal from "../Modal";
import BlocklyWorkspace from "../Blockly";
import toolbox from "./toolbox";
import "./blocks";
import { CommonEventToBlocks } from "@/libs/Event";

interface EditorProps {
  open: boolean;
  onClose: () => void;
  event: RPG.CommonEvent;
}

export default function ({ open, onClose }: EditorProps) {
  const [json, setJson] = useState<object>();
  const workspaceRef = useRef<Blockly.WorkspaceSvg>(null);
  const [topBlock, setTopBlock] = useState<Blockly.Block | null>(null);

  const setup = useCallback((workspace: Blockly.WorkspaceSvg) => {
    Blockly.Xml.domToWorkspace(
      Blockly.utils.xml.textToDom(
        `<xml xmlns="https://developers.google.com/blockly/xml"><block type="event_start" id="OO!i/_ow;KDho_(Er!FZ" x="150" y="77"></block></xml>`
      ),
      workspace
    );
    CommonEventToBlocks(workspace.getTopBlocks()[0], $dataCommonEvents[1]);
    workspace.addChangeListener(() => {
      const json = Blockly.serialization.workspaces.save(workspace);
      setJson(json);
      console.log(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)));
      setTopBlock(
        workspace.getTopBlocks().filter((x: any) => !x.disabled)[0] || null
      );
    });
    workspace.addChangeListener(Blockly.Events.disableOrphans);
    const disableTopBlocksPlugin = new DisableTopBlocks();
    disableTopBlocksPlugin.init();
    unregisterProcedureBlocks();
    Blockly.common.defineBlocks(blocks);
    (window as any).workspace = workspace;
  }, []);

  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    setup(workspace);
  }, [workspaceRef.current]);

  return (
    <Modal open={open} onClose={onClose} zIndex={11000}>
      <BlocklyWorkspace toolbox={toolbox} ref={workspaceRef} />
    </Modal>
  );
}
