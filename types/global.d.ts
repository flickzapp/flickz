type frameInputType = {
  text: string;
  id?: string;
  index: number;
  duration: number;
  entryAnimate: "grow" | "none" | "moveUp" | "slideFromRight";
  fontFamily?: "inter" | "roboto" | "poppins" | "notosans";
  fontWeight?: "font-bold" | "font-normal" | "font-semibold" | "font-extrabold";
  fontSize?: "text-lg" | "text-xl" | "text-2xl" | "text-3xl";
  align?: "text-left" | "text-center" | "text-right" | "text-justify";
  exitAnimate?: "fadeOut" | "shrink" | "none";
  backgroundColor?: string;
  projectId?: string;
  fontColor?: string;
  backgroundImgLink?: string;
  backgroundVideoLink?: string;
};

// the type of project used in editor
type EditorProjectType = {
  id: string;
  name: string;
  aspectRatio?: string;
  audioLink?: string;
};
