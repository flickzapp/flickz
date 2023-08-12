type frameInputType = {
  text: string;
  id?: string;
  index: number;
  duration: number;
  entryAnimate: "grow" | "none" | "moveUp" | "slideFromRight";
  fontFamily?: string;
  fontWeight?: "font-bold" | "font-normal" | "font-semibold" | "font-extrabold";
  fontSize?: string;
  align?: "text-left" | "text-center" | "text-right" | "text-justify";
  exitAnimate?: "fadeOut" | "shrink" | "none";
  backgroundColor?: string;
  projectId?: string;
  fontColor?: string;
  backgroundImgLink?: string;
  backgroundVideoLink?: string;
};
