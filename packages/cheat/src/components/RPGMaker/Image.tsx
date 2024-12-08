import React, { useEffect } from "react";

declare var ImageManager: MZ.ImageManagerStatic;

type Props = {
  folder: string;
  filename: string;
};

export function MZImage({ folder, filename }: Props) {
  const [blob, setBlob] = React.useState<Blob | null>(null);

  useEffect(() => {
    const bitmap = ImageManager.loadBitmap(folder, filename);

    bitmap.addLoadListener(() => {
      bitmap.canvas.toBlob((blob) => {
        setBlob(blob);
      });
    });
  }, [folder, filename]);

  return (
    blob && (
      <img
        src={URL.createObjectURL(blob)}
        alt={`${folder}/${filename}`}
        title={`${folder}/${filename}`}
      />
    )
  );
}

export function MZImageFromUrl({ url }: { url: string }) {
  const [blob, setBlob] = React.useState<Blob | null>(null);

  useEffect(() => {
    const bitmap = ImageManager.loadBitmapFromUrl(url);

    bitmap.addLoadListener(() => {
      const blob = bitmap.canvas.toBlob((blob) => {
        setBlob(blob);
      });
    });
  }, [url]);

  return blob && <img src={URL.createObjectURL(blob)} alt={url} title={url} />;
}
