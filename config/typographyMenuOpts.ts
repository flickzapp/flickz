"use client";

export const fonts = [
  {
    name: "Inter",
    value: "inter",
  },
  {
    name: "Noto Sans",
    value: "sans",
  },
  {
    name: "Roboto",
    value: "serif",
  },
];

export const fontSizes = [
  {
    name: "1",
    value: "7rem",
  },
  {
    name: "2",
    value: "8rem",
  },
  {
    name: "3",
    value: "9rem",
  },
  {
    name: "4",
    value: "10rem",
  },
  {
    name: "5",
    value: "12rem",
  },
  {
    name: "6",
    value: "13.5rem",
  },
  {
    name: "7",
    value: "15rem",
  },
  {
    name: "8",
    value: "16.5rem",
  },
  {
    name: "9",
    value: "18rem",
  },
  {
    name: "10",
    value: "19.5rem",
  },
  {
    name: "11",
    value: "20rem",
  },
  {
    name: "12",
    value: "24rem",
  },
];

export const fontWeights = [
  {
    name: "Bold",
    value: "font-bold",
  },
  {
    name: "Regular",
    value: "font-normal",
  },
  {
    name: "Medium",
    value: "font-semibold",
  },
  {
    name: "Extra Bold",
    value: "font-extrabold",
  },
];

export const defaultFontSize = fontSizes[0].value;

export const googleFonts = [
  { family: "Inter", load: () => import("@remotion/google-fonts/Inter") },
  { family: "Kanit", load: () => import("@remotion/google-fonts/Kanit") },
  { family: "Lato", load: () => import("@remotion/google-fonts/Lato") },
  { family: "Lora", load: () => import("@remotion/google-fonts/Lora") },
  {
    family: "Merriweather",
    load: () => import("@remotion/google-fonts/Merriweather"),
  },
  {
    family: "Montserrat",
    load: () => import("@remotion/google-fonts/Montserrat"),
  },
  { family: "Mukta", load: () => import("@remotion/google-fonts/Mukta") },
  {
    family: "Noto Sans",
    load: () => import("@remotion/google-fonts/NotoSans"),
  },
  {
    family: "Noto Sans JP",
    load: () => import("@remotion/google-fonts/NotoSansJP"),
  },
  {
    family: "Noto Sans KR",
    load: () => import("@remotion/google-fonts/NotoSansKR"),
  },
  { family: "Nunito", load: () => import("@remotion/google-fonts/Nunito") },
  {
    family: "Nunito Sans",
    load: () => import("@remotion/google-fonts/NunitoSans"),
  },
  {
    family: "Open Sans",
    load: () => import("@remotion/google-fonts/OpenSans"),
  },
  { family: "Oswald", load: () => import("@remotion/google-fonts/Oswald") },
  { family: "PT Sans", load: () => import("@remotion/google-fonts/PTSans") },
  {
    family: "Playfair Display",
    load: () => import("@remotion/google-fonts/PlayfairDisplay"),
  },
  { family: "Poppins", load: () => import("@remotion/google-fonts/Poppins") },
  { family: "Raleway", load: () => import("@remotion/google-fonts/Raleway") },
  { family: "Roboto", load: () => import("@remotion/google-fonts/Roboto") },
  {
    family: "Roboto Condensed",
    load: () => import("@remotion/google-fonts/RobotoCondensed"),
  },
  {
    family: "Roboto Mono",
    load: () => import("@remotion/google-fonts/RobotoMono"),
  },
  {
    family: "Roboto Slab",
    load: () => import("@remotion/google-fonts/RobotoSlab"),
  },
  { family: "Rubik", load: () => import("@remotion/google-fonts/Rubik") },
  { family: "Ubuntu", load: () => import("@remotion/google-fonts/Ubuntu") },
  {
    family: "Work Sans",
    load: () => import("@remotion/google-fonts/WorkSans"),
  },
];
