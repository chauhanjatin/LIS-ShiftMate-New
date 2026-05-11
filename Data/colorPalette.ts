export type ColorSwatch = {
  cssVar: string;
  hex: string;
  label: string;
};

export type PaletteGroup = {
  key: string;
  title: string;
  shades: ColorSwatch[];
};

export const paletteGroups: PaletteGroup[] = [
  {
    key: "blue",
    title: "Blue (Main)",
    shades: [
      { label: "Blue 50", hex: "#EAF2FF", cssVar: "--blue-50" },
      { label: "Blue 100", hex: "#C5DAFF", cssVar: "--blue-100" },
      { label: "Blue 200", hex: "#99BEFF", cssVar: "--blue-200" },
      { label: "Blue 300", hex: "#6AA1FF", cssVar: "--blue-300" },
      { label: "Blue 400", hex: "#3F86FF", cssVar: "--blue-400" },
      { label: "Blue 500 Main", hex: "#257BFC", cssVar: "--blue-500" },
      { label: "Blue 600", hex: "#1A64D6", cssVar: "--blue-600" },
      { label: "Blue 700", hex: "#124FAD", cssVar: "--blue-700" },
      { label: "Blue 800", hex: "#0C3A84", cssVar: "--blue-800" },
      { label: "Blue 900", hex: "#07265C", cssVar: "--blue-900" },
    ],
  },
  {
    key: "gray",
    title: "Gray",
    shades: [
      { label: "Gray 50", hex: "#F9FAFB", cssVar: "--gray-50" },
      { label: "Gray 100", hex: "#F2F4F7", cssVar: "--gray-100" },
      { label: "Gray 200", hex: "#E4E7EC", cssVar: "--gray-200" },
      { label: "Gray 300", hex: "#D0D5DD", cssVar: "--gray-300" },
      { label: "Gray 400", hex: "#98A2B3", cssVar: "--gray-400" },
      { label: "Gray 500", hex: "#667085", cssVar: "--gray-500" },
      { label: "Gray 600", hex: "#475467", cssVar: "--gray-600" },
      { label: "Gray 700", hex: "#344054", cssVar: "--gray-700" },
      { label: "Gray 800", hex: "#1D2939", cssVar: "--gray-800" },
      { label: "Gray 900 Main", hex: "#111827", cssVar: "--gray-900" },
    ],
  },
  {
    key: "green",
    title: "Green",
    shades: [
      { label: "Green 50", hex: "#EDFAF2", cssVar: "--green-50" },
      { label: "Green 100", hex: "#C7F0D6", cssVar: "--green-100" },
      { label: "Green 300", hex: "#7DD7A1", cssVar: "--green-300" },
      { label: "Green 500", hex: "#4DB949", cssVar: "--green-500" },
      { label: "Green 700", hex: "#2F8030", cssVar: "--green-700" },
      { label: "Green 900", hex: "#174D18", cssVar: "--green-900" },
    ],
  },
  {
    key: "orange",
    title: "Orange",
    shades: [
      { label: "Orange 50", hex: "#FFF6E8", cssVar: "--orange-50" },
      { label: "Orange 100", hex: "#FFE4B5", cssVar: "--orange-100" },
      { label: "Orange 300", hex: "#FFC966", cssVar: "--orange-300" },
      { label: "Orange 500", hex: "#FFA100", cssVar: "--orange-500" },
      { label: "Orange 700", hex: "#B36E00", cssVar: "--orange-700" },
      { label: "Orange 900", hex: "#663F00", cssVar: "--orange-900" },
    ],
  },
  {
    key: "purple",
    title: "Purple",
    shades: [
      { label: "Purple 50", hex: "#F0ECFE", cssVar: "--purple-50" },
      { label: "Purple 100", hex: "#D5CAFE", cssVar: "--purple-100" },
      { label: "Purple 300", hex: "#A98DF9", cssVar: "--purple-300" },
      { label: "Purple 500", hex: "#775AF4", cssVar: "--purple-500" },
      { label: "Purple 700", hex: "#4F35C2", cssVar: "--purple-700" },
      { label: "Purple 900", hex: "#2D1A80", cssVar: "--purple-900" },
    ],
  },
  {
    key: "cyan",
    title: "Cyan",
    shades: [
      { label: "Cyan 50", hex: "#E8F8FF", cssVar: "--cyan-50" },
      { label: "Cyan 100", hex: "#BDEAFF", cssVar: "--cyan-100" },
      { label: "Cyan 300", hex: "#7AD5FA", cssVar: "--cyan-300" },
      { label: "Cyan 500", hex: "#34AFF5", cssVar: "--cyan-500" },
      { label: "Cyan 700", hex: "#1A7DB5", cssVar: "--cyan-700" },
      { label: "Cyan 900", hex: "#0A4D75", cssVar: "--cyan-900" },
    ],
  },
  {
    key: "global",
    title: "Global",
    shades: [
      {
        label: "White",
        hex: "#FFFFFF",
        cssVar: "--global-white",
      },
      {
        label: "Black",
        hex: "#000000",
        cssVar: "--global-black",
      },
    ],
  },
];
