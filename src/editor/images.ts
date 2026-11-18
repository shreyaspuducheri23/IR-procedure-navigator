/**
 * Preparing a picked image for upload: shrink it in the browser so the
 * repository does not fill with multi-megabyte originals, and give it a safe,
 * unique file name.
 */
import { slugify, uniqueId } from "./model";

const MAX_EDGE = 2000;
/** Files already this small and within MAX_EDGE are uploaded untouched. */
const KEEP_BELOW_BYTES = 900 * 1024;
const MAX_UPLOAD_BYTES = 4.5 * 1024 * 1024;
const ACCEPTED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};

export const IMAGE_ACCEPT = [...ACCEPTED].join(",");

export type PreparedImage = {
  name: string;
  /** Base64 without the data: prefix, as the Worker expects. */
  data: string;
  /** For showing the image in the editor before it is published. */
  url: string;
};

function toBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.readAsDataURL(blob);
  });
}

function loadBitmap(file: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("unreadable"));
    };
    image.src = url;
  });
}

function canvasBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

async function shrink(file: File): Promise<Blob> {
  // Animated GIFs would lose their animation on a canvas; pass them through.
  if (file.type === "image/gif") return file;

  const image = await loadBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(image.naturalWidth, image.naturalHeight));
  if (scale === 1 && file.size <= KEEP_BELOW_BYTES) return file;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.naturalWidth * scale);
  canvas.height = Math.round(image.naturalHeight * scale);
  const context = canvas.getContext("2d");
  if (!context) return file;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Diagrams and screenshots stay crisp as PNG; fall back to JPEG when a PNG
  // would still be heavy (photographs, fluoroscopy captures).
  if (file.type === "image/png") {
    const png = await canvasBlob(canvas, "image/png");
    if (png && png.size <= KEEP_BELOW_BYTES) return png;
  }
  // JPEG has no transparency: paint onto white first.
  const flat = document.createElement("canvas");
  flat.width = canvas.width;
  flat.height = canvas.height;
  const flatContext = flat.getContext("2d");
  if (!flatContext) return file;
  flatContext.fillStyle = "#ffffff";
  flatContext.fillRect(0, 0, flat.width, flat.height);
  flatContext.drawImage(canvas, 0, 0);
  return (await canvasBlob(flat, "image/jpeg", 0.88)) ?? file;
}

export async function prepareImage(file: File, takenNames: Iterable<string>): Promise<PreparedImage | { error: string }> {
  if (!ACCEPTED.has(file.type)) {
    return { error: "That file type is not supported. Use a PNG, JPEG, WebP or GIF image." };
  }
  let blob: Blob;
  try {
    blob = await shrink(file);
  } catch {
    return { error: "That image could not be read. Try saving it again as a PNG or JPEG." };
  }
  if (blob.size > MAX_UPLOAD_BYTES) {
    return { error: "That image is too large even after shrinking. Try a smaller version." };
  }

  const extension = EXTENSIONS[blob.type] ?? "png";
  const stem = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
  const taken = new Set([...takenNames].map((name) => name.replace(/\.[^.]+$/, "")));
  const name = `${uniqueId(stem, taken)}.${extension}`;

  return { name, data: await toBase64(blob), url: URL.createObjectURL(blob) };
}

/** Rebuilds a preview URL for an image restored from a saved draft. */
export function previewUrl(name: string, data: string): string {
  const extension = name.split(".").pop() ?? "png";
  const type = extension === "jpg" || extension === "jpeg" ? "image/jpeg" : `image/${extension}`;
  return `data:${type};base64,${data}`;
}
