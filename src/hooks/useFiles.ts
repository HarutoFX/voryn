import type React from 'react';

export function useFiles(setAttachedFiles: React.Dispatch<React.SetStateAction<Array<{ name: string; content: string; size: string }>>>) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDragLeave = () => {};
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const removeFileAttachment = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };
  return { handleDragOver, handleDragLeave, handleDrop, handleFileSelect, removeFileAttachment };
}
