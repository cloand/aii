import { Box } from "@mui/material";
import React from "react";

interface Props {
  className?: string;
  style?: any;
  onClick?: () => void;
  to: string;
}
const arrowStyle = {
  position: "absolute !important",
  top: "50% !important",
  zIndex: 111,
}


export const NextArrow: React.FC<Props> = ({
  className,
  style,
  onClick,
  to,
}) => {
  return (
    <Box
      sx={{
        ...arrowStyle,
        right: { xs: "8% !important", md: "5% !important", },
      }}
      className={`${className}`}
      style={{ ...style }}
      onClick={onClick}
      aria-label={to}
    />

  );
};
export const PrevArrow: React.FC<Props> = ({
  className,
  style,
  onClick,
  to,
}) => {
  return (
    <Box
      sx={{
        ...arrowStyle,
        left: { xs: "2% !important", md: "5% !important", },
      }}
      className={`${className}`}
      style={{ ...style }}
      onClick={onClick}
      aria-label={to}
    />
  );
};
