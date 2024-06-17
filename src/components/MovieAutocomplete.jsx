import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { renderStars } from "../utils";

const MovieAutocomplete = ({
  movies,
  searchTerm,
  setSearchTerm,
  selectedRatings,
  selectedCategories,
}) => {
  const filteredMovies = movies.filter((movie) => {
    return (
      (selectedCategories.length === 0 ||
        selectedCategories.includes(movie.category)) &&
      (selectedRatings.length === 0 ||
        selectedRatings.includes(Math.floor(movie.rating))) &&
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Autocomplete
      freeSolo
      options={filteredMovies}
      getOptionLabel={(option) => option.title}
      renderOption={(props, option) => (
        <li
          {...props}
          key={option.title}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>{option.title}</span>
            <span>{option.category}</span>
          </Box>
          <Box sx={{ display: "flex", mt: 1, alignSelf: "flex-start" }}>
            {renderStars(Math.floor(option.rating))}
          </Box>
        </li>
      )}
      inputValue={searchTerm}
      onInputChange={(event, newInputValue) => {
        setSearchTerm(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search Movies" variant="outlined" />
      )}
    />
  );
};

export default MovieAutocomplete;
