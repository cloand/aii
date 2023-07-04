// import { BsLaptop, BsBook } from "react-icons/bs";
// import { IoShirtOutline, IoShirtSharp } from "react-icons/io5";
// import { MdOutlineToys } from "react-icons/md";
// import { RiHeartPulseLine, RiFireLine } from "react-icons/ri";
// import { AiOutlineHome, AiOutlinePercentage } from "react-icons/ai";
// import { BiFootball } from "react-icons/bi";

import { ICONS } from "../utils";

// import { ImMobile } from "react-icons/im";
// import { FiMonitor, FiHeadphones } from "react-icons/fi";

// import { GiLargeDress } from "react-icons/gi";
// import { FaBaby, FaRedhat } from "react-icons/fa";

const menuItems = [
  {
    category: "digital",
    // icon: ICONS.forwardArraow,
    productsGroup: [
      {
        title: "laptop",
        // icon: ICONS.forwardArraow,
        subtitles: [
          "asus",
          "apple",
          "dell",
          "lenovo",
          "samsung",
          "hp",
          "huawei",
          "acer",
          "msi",
        ],
      },
      {
        title: "mobile",
        // icon: ICONS.forwardArraow,
        subtitles: [
          "samsung",
          "apple",
          "nokia",
          "xiaomi",
          "motorola",
          "lg",
          "sony",
        ],
      },
      {
        title: "computer",
        // icon: ICONS.forwardArraow,
        subtitles: ["monitor", "mouse", "keyboard", "hard"],
      },
      {
        title: "other",
        // icon: ICONS.forwardArraow,
        subtitles: ["tablet", "powerBank", "speaker", "headphones"],
      },
    ],
  },
  {
    category: "fashion",
    // icon: ICONS.forwardArraow,
    productsGroup: [
      {
        title: "women",
        // icon: ICONS.forwardArraow,
        subtitles: [
          "dress",
          "skirt",
          "jeans",
          "pants",
          "tShirt",
          "shoes",
          "scarf",
        ],
      },
      {
        title: "men",
        // icon: ICONS.forwardArraow,
        subtitles: ["shirt", "pants", "tie", "tShirt", "shoes", "jeans"],
      },
      {
        title: "child",
        // icon: ICONS.forwardArraow,
        subtitles: ["overalls", "mittens", "babyApron", "shoes", "tShirt"],
      },
      {
        title: "other",
        // icon: ICONS.forwardArraow,
        subtitles: ["watch", "wallet", "hat", "belt"],
      },
    ],
  },
  // { category: "toys", icon: ICONS.forwardArraow },
  // { category: "cosmetic", icon: ICONS.forwardArraow },
  // { category: "home", icon: ICONS.forwardArraow },
  // { category: "sport", icon: ICONS.forwardArraow },
  // { category: "stationery", icon: ICONS.forwardArraow },
];

export default menuItems;

export const extraMenu = [
  // { title: "offer", icon: ICONS.forwardArraow, href: "/offers" },
  // { title: "bestSells", icon: ICONS.forwardArraow, href: "/" },
];
