export const aspectRatioWidthHeight = (
  size = 0,
  aspectRatio = 0,
  command = ""
) => {
  if (command === "width") {
    return { width: size, height: size / aspectRatio };
  }
  if (command === "height") {
    return { width: size * aspectRatio, height: size };
  }
  // return 'No '
};

export const randomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16) + 90}`;
