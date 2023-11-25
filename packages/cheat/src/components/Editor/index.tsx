import React, { useState, useEffect, useRef, useCallback } from "react";
import Blockly from "blockly";
import { DisableTopBlocks } from "@blockly/disable-top-blocks";
import {
  blocks,
  unregisterProcedureBlocks,
} from "@blockly/block-shareable-procedures";
import * as BlockDynamicConnection from "@blockly/block-dynamic-connection";
import { ZoomToFitControl } from "@blockly/zoom-to-fit";
import Modal from "../Modal";
import BlocklyWorkspace from "../Blockly";
import toolbox from "./toolbox";
import "./blocks";
import { CommonEventToBlocks, EventToBlocks } from "@/libs/Event";

interface EditorProps {
  open: boolean;
  onClose: () => void;
  event: RPG.CommonEvent | RPG.Event | null;
}

export default function ({ open, onClose, event }: EditorProps) {
  const [json, setJson] = useState<object>();
  const workspaceRef = useRef<Blockly.WorkspaceSvg>(null);
  const [topBlock, setTopBlock] = useState<Blockly.Block | null>(null);

  const setup = useCallback((workspace: Blockly.WorkspaceSvg) => {
    workspace.addChangeListener(() => {
      const json = Blockly.serialization.workspaces.save(workspace);
      setJson(json);
      // console.log(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)));
      setTopBlock(
        workspace.getTopBlocks().filter((x: any) => !x.disabled)[0] || null
      );
    });

    workspace.addChangeListener(Blockly.Events.disableOrphans);
    const disableTopBlocksPlugin = new DisableTopBlocks();
    disableTopBlocksPlugin.init();

    const zoomToFit = new ZoomToFitControl(workspace);
    zoomToFit.init();

    BlockDynamicConnection.overrideOldBlockDefinitions();

    unregisterProcedureBlocks();
    Blockly.common.defineBlocks(blocks);

    (window as any).workspace = workspace;
  }, []);

  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    setup(workspace);
  }, [workspaceRef.current]);

  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace || !event) return;
    if (isCommonEvent(event)) {
      CommonEventToBlocks(workspace, event);
    } else {
      EventToBlocks(workspace, event);
    }
  }, [event]);

  return (
    <Modal open={open} onClose={onClose} zIndex={11000}>
      <BlocklyWorkspace toolbox={toolbox} ref={workspaceRef} />
    </Modal>
  );
}

function isCommonEvent(
  event: RPG.CommonEvent | RPG.Event
): event is RPG.CommonEvent {
  return (event as RPG.CommonEvent).list !== undefined;
}
