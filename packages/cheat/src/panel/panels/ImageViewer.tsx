import { MZImage, MZImageFromUrl } from "@/components/RPGMaker/Image";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function () {
  const [folder, setFolder] = useState<string | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const folderInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  function onClick() {
    if (folderInput.current && fileInput.current) {
      setFolder(folderInput.current.value);
      setFile(fileInput.current.value);
    }
  }

  useEffect(() => {
    ref.current?.addEventListener("keydown", (event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
    });
    ref.current?.addEventListener("contextmenu", (event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
    });
  }, [ref.current]);

  return (
    <Wrapper ref={ref}>
      <InputGroup>
        <Input type="text" placeholder="folder" ref={folderInput} />
        <Input type="text" placeholder="filename" ref={fileInput} />
      </InputGroup>
      <Button onClick={onClick}>Load</Button>
      <br />
      {folder && file && <Image folder={folder} filename={file} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  height: 32px;
  padding: 0 8px;
  box-sizing: border-box;
`;

const Button = styled.button`
  height: 32px;
`;

const Image = styled(MZImage)`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
