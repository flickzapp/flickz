type frameInputType = {
  text: string;
  id?: string;
  index: number;
  duration: number;
  entryAnimate: string;
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: string;
  align?: string;
  exitAnimate?: string;
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
  aspectRatio?: string | null;
  audioLink?: string;
};

type RenderVideoProps = {
  frames: frameInputType[];
};

type RenderVideoAPIBody = {
  id: string;
  inputProps: RenderVideoProps;
};

type SavingStatusType = "init" | "saving" | "saved";
type SetSavingStatusType = React.Dispatch<React.SetStateAction<SavingStatus>>;
