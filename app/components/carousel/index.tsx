import React from "react";
import Slider from "react-slick";
import Slide from "./Slide";
import { NextArrow, PrevArrow } from "./Arrows";

import { Box } from "@mui/material";

const Carousel = ({ sliderContent }: any) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <NextArrow to="next" />,
    prevArrow: <PrevArrow to="prev" />,
    appendDots: (dots: string) => (
      <div className="bg-transparent !pb-[40px]">
        <ul>{dots}</ul>
      </div>
    ),
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Slider {...settings}>
        {sliderContent.map((slideContent: any) => {
          return <Slide key={slideContent.ID} {...slideContent} />;
        })}
      </Slider>
    </Box>
  );
};

export default Carousel;
