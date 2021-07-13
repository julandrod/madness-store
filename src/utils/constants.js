import React from "react";
import { IoHardwareChipOutline } from "react-icons/io5";
import { AiOutlinePrinter } from "react-icons/ai";
import { BsCodeSlash } from "react-icons/bs";

export const links = [
  {
    id: 1,
    text: "Home",
    url: "/",
  },
  {
    id: 2,
    text: "Products",
    url: "/products",
  },
  {
    id: 3,
    text: "About",
    url: "/about",
  },
  {
    id: 4,
    text: "Contact",
    url: "/contact",
  },
];

export const services = [
  {
    id: 1,
    icon: <IoHardwareChipOutline />,
    title: "hardware",
    text: "All the hardware you need for your projects, Arduino's, Raspberry Pi's, sensors, and much more...",
  },
  {
    id: 2,
    icon: <AiOutlinePrinter />,
    title: "3D Print",
    text: "Do you need a 3D printer? We got you cover, from full built 3D printers to all the hardware to build one yourself.",
  },
  {
    id: 3,
    icon: <BsCodeSlash />,
    title: "Software",
    text: "We can code the firmware you need.",
  },
];
