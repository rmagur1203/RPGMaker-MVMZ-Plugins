import { ArrowDownward } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

declare let ImageManager: MZ.ImageManagerStatic;

const rawPrototype = Game_Picture.prototype;

export function ImageHistory() {
  const onAttach = () => {
    window.cheat.imageHistory = [];
    Game_Picture.prototype = new Proxy(rawPrototype, {
      get(target, key, receiver) {
        if (key === "show") {
          return function (this: Game_Picture, name: string) {
            console.log("Show", name);
            const bitmap = ImageManager.loadBitmap("img/pictures/", name);
            bitmap.addLoadListener(() => {
              bitmap.canvas.toBlob((blob) => {
                if (!blob) return;
                window.cheat.imageHistory = window.cheat.imageHistory || [];
                window.cheat.imageHistory.push({
                  name,
                  src: URL.createObjectURL(blob),
                });
              });
            });
            // @ts-expect-error - Call original function
            // eslint-disable-next-line prefer-rest-params
            return Reflect.get(target, key, receiver).apply(this, arguments);
          };
        }
        return Reflect.get(target, key, receiver);
      },
    });
  };

  const onDetach = () => {
    Game_Picture.prototype = rawPrototype;
  };

  const onClear = () => {
    window.cheat.imageHistory = [];
  };

  return (
    <div className="flex flex-col h-full overflow-auto">
      <h1>Image Histories</h1>
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-none gap-2">
            <Button variant="text" onClick={onAttach}>
              Attach
            </Button>
            <Button variant="text" onClick={onDetach}>
              Detach
            </Button>
            <Button variant="text" onClick={onClear}>
              Clear
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>Pictures</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Pictures />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownward />}>
          <Typography>Picture Histories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PictureHistories />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

function PictureHistories() {
  const [, setUpdate] = React.useState(0);

  useEffect(() => {
    const onImageHistory = () => {
      setUpdate((v) => v + 1);
    };
    const interval = setInterval(onImageHistory, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-1 gap-2 flex-nowrap overflow-auto">
      {window.cheat.imageHistory?.map((image, i) => {
        return (
          <div key={i} className="flex flex-col gap-2">
            <h3 className="text-nowrap">{image.name}</h3>
            <img className="h-full" src={image.src} alt={image.name} />
          </div>
        );
      })}
    </div>
  );
}

function Pictures() {
  const [, setUpdate] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => setUpdate((v) => v + 1), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-1 gap-2 flex-nowrap overflow-auto">
      {
        // @ts-expect-error - Access private property
        $gameScreen._pictures.map((picture, i) => {
          if (!picture) return null;
          return (
            <div key={i} className="flex flex-col gap-2">
              <h3 className="text-nowrap">{picture.name()}</h3>
              <PictureByName className="h-full" name={picture.name()} />
            </div>
          );
        })
      }
    </div>
  );
}

function PictureByName({
  name,
  ...props
}: {
  name: string;
  className: string;
}) {
  const [url, setUrl] = React.useState<string | null>(null);
  const bitmap = ImageManager.loadBitmap("img/pictures/", name);
  bitmap.addLoadListener(() => {
    bitmap.canvas.toBlob((blob) => {
      if (!blob) return;
      setUrl(URL.createObjectURL(blob));
    });
  });

  return url ? <img src={url} alt={name} {...props} /> : null;
}
