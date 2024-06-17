import React from "react";
import { Box, Typography } from "@mui/material";
import { renderStars } from "../utils";

const MovieList = ({ movies }) => (
  <Box>
    {movies.map((movie, index) => (
      <Box
        key={index}
        display="flex"
        flexDirection="column"
        marginBottom="16px"
      >
        <Typography variant="h6">{movie.title}</Typography>
        <Box display="flex" alignItems="center">
          {renderStars(Math.floor(movie.rating))}
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginLeft: "8px" }}
          >
            {movie.category}
          </Typography>
        </Box>
      </Box>
    ))}
  </Box>
);

export default MovieList;
