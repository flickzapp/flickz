import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// takes normal json string of canvas
// translates type:text to i-type
export function transformTextToItext(textString: string): JSON {
  const canvas = JSON.parse(textString);
  canvas.objects.forEach((obj: any) => {
    if (obj.type === "text") {
      obj.type = "i-text";
    }
  });
  return canvas;
}
