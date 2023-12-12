import React, { useEffect, useState } from "react";

type Props = {
  bitmap: Bitmap;
  className?: string;
};

export function BitmapToImage({ bitmap, className }: Props) {
  const [blob, setBlob] = useState<Blob | null>(null);

  useEffect(() => {
    bitmap.addLoadListener(() => {
      const blob = bitmap.canvas.toBlob((blob) => {
        setBlob(blob);
      });
    });
  }, [bitmap]);

  return blob && <img className={className} src={URL.createObjectURL(blob)} />;
}
