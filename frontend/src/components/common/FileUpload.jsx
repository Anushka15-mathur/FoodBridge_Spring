import { Upload, FileText } from "lucide-react";

export default function FileUpload({
  label,
  accept,
  onChange,
  fileName,
}) {
  return (
    <div className="space-y-2">

      <label className="font-medium text-heading">
        {label}
      </label>

      <label
        className="
        flex
        cursor-pointer
        flex-col
        items-center
        justify-center
        rounded-xl
        border-2
        border-dashed
        border-primary/40
        bg-primary/5
        p-6
        transition
        hover:bg-primary/10
      "
      >

        <Upload
          className="mb-3 text-primary"
          size={32}
        />

        <p className="font-medium">
          Click to upload
        </p>

        <p className="text-sm text-muted-foreground">
          PDF, JPG, PNG
        </p>

        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={onChange}
        />

      </label>

      {fileName && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3">

          <FileText
            size={18}
            className="text-green-600"
          />

          <span className="text-sm">
            {fileName}
          </span>

        </div>
      )}

    </div>
  );
}