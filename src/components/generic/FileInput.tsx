import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface FileInputProps {
  photoUrl?: string;
  onChange: (files: FileList | null) => void;
  onClear?: () => void;
  placeholder: string;
  name?: string;
}

export const FileInput = ({
  photoUrl,
  onChange,
  onClear,
  placeholder,
  name,
}: FileInputProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? event.target.files : null;
    onChange(files);
  };

  const handleClear = () => {
    onChange(null);
    if (onClear) onClear();
  };

  return (
    <div className="relative">
      {photoUrl ? (
        <div className="relative inline-block">
          <img
            width={200}
            height={200}
            src={photoUrl}
            alt="Uploaded file"
            className="rounded border border-gray-300"
          />
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear"
            className="absolute -left-5 -top-5 rounded-full bg-slate-100/80 p-3 text-primary-500 hover:text-red-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          placeholder={placeholder}
          className="rounded bg-gray-50 p-2.5 text-sm"
        />
      )}
    </div>
  );
};
