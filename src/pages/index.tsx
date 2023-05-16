import React, { useState, FormEvent } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  CircularProgress,
  Button,
  Snackbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getCityWeather } from "src/services/getWeather";
import WeatherDisplay from "src/components/WeatherDisplay";
import { WeatherDataType } from "src/services/getWeather";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home(): JSX.Element {
  const [city, setCity] = useState<string>("");
  const [data, setData] = useState<WeatherDataType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const validateCity = (): boolean => {
    if (!city) {
      handleSnackbarOpen("Please enter a city name");
      return false;
    }
    if (city.length < 3 || city.length > 50) {
      handleSnackbarOpen("Please enter a valid city name");
      return false;
    }
    return true;
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Reset error state before performing the search
    setError(null);
    if (!validateCity()) {
      return;
    }
    setIsLoading(true);
    try {
      // Make API request to get weather data for the entered city
      const res = await getCityWeather(city);
      setData(res);
      if (res?.data?.error) {
        setError(res.data.error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarOpen = (message: string) => {
    setError(message);
    setOpen(true);
  };

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="primary" size={60} />
        </Box>
      );
    } else if (data) {
      if (error) {
        return (
          <Typography variant="h5" align="center" gutterBottom>
            {error}
          </Typography>
        );
      } else {
        return <WeatherDisplay data={data} />;
      }
    }
    return null;
  };

  return (
    <Container maxWidth="lg">
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="warning">
            {error}
          </Alert>
        </Snackbar>
      </Stack>
      <Typography variant="h4" mb={5} mt={3} align="center" gutterBottom>
        Weather App
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <form onSubmit={handleSearch}>
          <TextField
            fullWidth
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Stack>
      <Box mt={4}>{renderContent()}</Box>
    </Container>
  );
}
