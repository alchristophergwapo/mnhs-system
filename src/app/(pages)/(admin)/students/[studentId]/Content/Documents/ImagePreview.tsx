import { JSX, useMemo } from "react";

/**
 * A React component that renders a preview of an image file.
 * It efficiently generates a temporary object URL for the file to avoid Base64 overhead
 * and automatically revokes the URL on unmount to prevent memory leaks.
 *
 * @param {Object} props - The component props.
 * @param {File} props.file - The image file to preview.
 * @returns {JSX.Element | null} The rendered image element, or null if the URL is not yet generated.
 */
function ImagePreview({ file }: { file: File }): JSX.Element | null {
  const objectUrl = useMemo(() => {
    if (!file) return null;

    const newObjectUrl = URL.createObjectURL(file);

    // Memory Management: Clean up the object URL to prevent memory leaks
    return newObjectUrl;
  }, [file]);

  if (!objectUrl) {
    return null; // Or a loading spinner
  }

  return <img src={objectUrl} alt="Card Image" width={300} height="auto" />;
}

export default ImagePreview;
