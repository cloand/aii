import React from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { THEMES } from "AII-GB/app/utils";

interface Props {
  ID?: number;
  title: string;
  description: string;
  bgImg: string;
  url: string;
}
const Slide: React.FC<Props> = ({ title, description, bgImg, url }) => {

  return (
    <>
      <Box
        className="carousel-slide"
        sx={{
          width: "100%",
          position: "relative",
          backgroundImage: `url(${url})`,
          height: { xs: "50vh", md: "70vh" },
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}>
        {/* <Link href={url}>
          <Box sx={{ display: "block" }}>
            <Box
              sx={{
                position: "absolute",
                top: { md: "45%" },
                bottom: { xs: "0", md: "auto" },
                right: { md: "25%" },
                backdropFilter: "blur(12px)",
                width: { md: "60%", lg: "50%" },
                padding: { xs: "0.75rem", md: "2rem", lg: "2.5rem" },
                borderRadius: { xs: "0", md: "0.375rem" },
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                backgroundColor: "rgba(252, 251, 255, 0.4)"
              }}>
              <Typography
                sx={{ fontSize: THEMES.DISPLAY_RESOLUTION.TITLE }}>
                {`${title}`}
              </Typography>

              <Typography
                sx={{
                  fontSize: THEMES.DISPLAY_RESOLUTION.PARAGRAPH,
                  marginTop: { sm: "1rem", lg: "2rem" }
                }}>
                {`${description}`}
              </Typography>
            </Box>
          </Box>
        </Link> */}
      </Box>
    </>
  );
};

export default Slide;
