import { JSX, useEffect, useRef, useState } from "react";

function ImagePreview({ file }: { file: File }): JSX.Element | null {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!file) return;

    // Performance: Use createObjectURL instead of readAsDataURL to avoid Base64 overhead
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setImageUrl(objectUrl);

    // Memory Management: Clean up the object URL to prevent memory leaks
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, [file]);

  if (!imageUrl) {
    return null; // Or a loading spinner
  }

  return <img src={imageUrl} alt="Card Image" width={300} height="auto" />;
}

export default ImagePreview;
