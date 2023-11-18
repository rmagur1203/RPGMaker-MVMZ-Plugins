import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Option from "./components/option";
import JSZip from "jszip";
import { GetSaveManager, SaveManager } from "./libs";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [saveManager, setSaveManager] = useState<SaveManager>();

  const toggle = () => setIsOpen(!isOpen);

  function load() {
    if (!saveManager) return;
    console.log("load", saveManager);
    Promise.all(
      saveManager.savefileIds.map(async (id) => {
        const data = await saveManager.load(id, true);
        if (!data) return;
        await saveManager.save(id, data);
      })
    ).then(() => {
      DataManager.loadGlobalInfo();
      ConfigManager.load();
      SceneManager.push(Scene_Title);
    });
  }

  async function download() {
    if (!saveManager) return;
    const zip = new JSZip();

    for (const id of saveManager.savefileIds) {
      const data = await saveManager.download(id);
      if (!data) continue;
      zip.file(data.name, data.data);
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      const a = document.createElement("a");
      const url = URL.createObjectURL(content);
      a.href = url;
      a.download = "save.zip";
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function reset() {
    if (!saveManager) return;
    Promise.all(
      saveManager.savefileIds.map(async (id) => {
        await saveManager.reset(id);
      })
    ).then(() => {
      DataManager.loadGlobalInfo();
      ConfigManager.load();
      SceneManager.push(Scene_Title);
    });
  }

  useEffect(() => {
    setSaveManager(GetSaveManager());
  }, []);

  return (
    <Menu onClick={() => toggle()}>
      <Button>
        <span>LocalSave</span>
        <Icon className="bx bx-chevron-down" $active={isOpen}></Icon>
      </Button>
      {isOpen && (
        <Options>
          <Option icon="bx-save" text="Load" onClick={load} />
          <Option icon="bx-download" text="Download" onClick={download} />
          <Option icon="bx-reset" text="Reset" onClick={reset} />
        </Options>
      )}
    </Menu>
  );
};

export default App;

const Menu = styled.div`
  cursor: pointer;
`;

const Button = styled.div`
  display: flex;
  background: #fff;
  padding: 16px;
  font-size: 18px;
  font-weight: 400;
  border-radius: 8px;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  i {
    font-size: 25px;
    transition: 0.3s;
  }
`;

const Options = styled.ul`
  position: relative;
  padding: 8px;
  margin-top: 10px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
`;

const Icon = styled.i<{ $active: boolean }>`
  transform: ${({ $active }) => ($active ? "rotate(-180deg)" : "rotate(0)")};
`;
