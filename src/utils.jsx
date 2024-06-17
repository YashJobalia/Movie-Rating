import React from "react";
import { Star, StarBorder } from "@mui/icons-material";
import { Box } from "@mui/material";

export const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 10; i++) {
    stars.push(
      i <= rating ? (
        <Star key={i} style={{ color: "black" }} />
      ) : (
        <StarBorder key={i} style={{ color: "black" }} />
      )
    );
  }
  return <Box display="flex">{stars}</Box>;
};
