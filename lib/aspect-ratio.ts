export const getDimensionsForAspectRatio = (aspectRatio: string) => {
  const baseWidth = 1920;
  let width, height;

  switch (aspectRatio) {
    case "16:9":
      width = baseWidth;
      height = baseWidth * (9 / 16);
      break;
    case "4:3":
      width = baseWidth;
      height = baseWidth * (3 / 4);
      break;
    case "1:1":
      width = baseWidth;
      height = baseWidth;
      break;
    case "4:5":
      width = baseWidth;
      height = baseWidth * (5 / 4);
      break;
    case "9:16":
      width = baseWidth * (9 / 16);
      height = baseWidth;
      break;
    default:
      width = baseWidth;
      height = baseWidth * (9 / 16);
  }

  return { width, height };
};