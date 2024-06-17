import React, { useState, useMemo } from "react";
import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { movies, categories, ratings } from "./data";
import MovieList from "./components/MovieList";
import MovieAutocomplete from "./components/MovieAutocomplete";
import withCheckboxSelect from "./hoc/withCheckboxSelect";
import { renderStars } from "./utils";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategories(
      value.includes("All")
        ? selectedCategories.length === categories.length
          ? []
          : categories.map((c) => c.value)
        : value
    );
  };

  const handleRatingChange = (event) => {
    const value = event.target.value;
    setSelectedRatings(
      value.includes("All")
        ? selectedRatings.length === ratings.length
          ? []
          : ratings.map((r) => r.value)
        : value
    );
  };

  const filteredMovies = useMemo(
    () =>
      movies.filter((movie) => {
        return (
          (selectedCategories.length === 0 ||
            selectedCategories.includes(movie.category)) &&
          (selectedRatings.length === 0 ||
            selectedRatings.includes(Math.floor(movie.rating))) &&
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }),
    [searchTerm, selectedCategories, selectedRatings]
  );

  const CategorySelect = withCheckboxSelect(
    Select,
    categories,
    selectedCategories,
    handleCategoryChange,
    (option) => option.label
  );
  const RatingSelect = withCheckboxSelect(
    Select,
    ratings,
    selectedRatings,
    handleRatingChange,
    (option) => renderStars(option.value)
  );

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MovieAutocomplete
            movies={movies}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedRatings={selectedRatings}
            selectedCategories={selectedCategories}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Rating</InputLabel>
            <RatingSelect label="Rating" />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Genre</InputLabel>
            <CategorySelect label="Genre" />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <MovieList movies={filteredMovies} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
