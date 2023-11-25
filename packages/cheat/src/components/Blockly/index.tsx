import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Blockly from "blockly";

type Props = {
  toolbox: React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
};

export default React.forwardRef<Blockly.WorkspaceSvg, Props>((props, ref) => {
  const areaRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const toolboxRef = useRef<HTMLElement>(null);
  const [workspace, setWorkspace] = useState<Blockly.WorkspaceSvg | null>(null);

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
    if (!areaRef.current || !workspaceRef.current || !toolboxRef.current)
      return;
    const workspace = Blockly.inject(workspaceRef.current, {
      toolbox: toolboxRef.current,
      renderer: "thrasos",
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
      },
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
    if (typeof ref === "function") ref(workspace);
    else if (ref) ref.current = workspace;
  });

  return (
    <BlocklyArea ref={areaRef}>
      <BlocklyWorkspace ref={workspaceRef}>
        <props.toolbox ref={toolboxRef} />
      </BlocklyWorkspace>
    </BlocklyArea>
  );
});

const BlocklyArea = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
`;

const BlocklyWorkspace = styled.div`
  position: absolute;
`;
