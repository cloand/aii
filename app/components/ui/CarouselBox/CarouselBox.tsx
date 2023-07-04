import React from "react";
import { NextArrow, PrevArrow } from "./CarouselBoxArrows";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";

interface Props {
  label: string;
  className?: string;
  href?: string;
  children?: React.ReactNode;
  full?: boolean;
}
const CarouselBox: React.FC<Props> = ({
  label,
  children,
  full,
}) => {

  const settings = {
    className: ` px-4 ${full ? "bg-palette-fill" : "bg-[#37bccef9]"}`,
    infinite: true,
    speed: 600,
    centerPadding: "60px",
    slidesToShow: 5,
    slidesToScroll: 5,
    // initialSlide: 0,
    swipeToSlide: true,
    // rtl: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
    >
      <Typography variant="h4" component="h4" sx={{
        textAlign: "center",
        fontFamily: "Playfair Display",
        fontSize: { xs: "24px", md: "40px", lg: "60px" },
        marginBottom: { xs: "20px", md: "30px" },
      }}>
        {label}
      </Typography>
      <Box
        sx={{
          "& .slick-next:before": {
            marginLeft: "13px",
          }
        }}
      >
        <Slider {...settings}>{children}</Slider>
      </Box>
    </Box>
  );
};

export default CarouselBox;
