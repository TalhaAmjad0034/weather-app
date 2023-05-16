import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import { WeatherDataType } from "src/services/getWeather";

// Component for displaying a single weather detail
interface WeatherDetailProps {
  label: string;
  value: string | number;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ label, value }) => (
  <Typography variant="subtitle1" gutterBottom>
    {label}: {value}
  </Typography>
);

// Component for displaying the weather information
const WeatherDisplay: React.FC<{ data: WeatherDataType }> = ({ data }) => {
  // Common styling for weather details
  const detailTextStyle = {
    display: "flex",
    alignItems: "center",
    gap: 1,
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {/* Display weather condition icon */}
      <Avatar
        src={data.current.condition.icon}
        sx={{
          width: 100,
          height: 100,
        }}
        variant="square"
      />
      {/* Display location name, region, and country */}
      <Typography variant="h5" gutterBottom>
        {`${data.location.name}, ${data.location?.region}, ${data.location?.country}`}
      </Typography>
      {/* Display temperature with a temperature icon */}
      <Typography sx={detailTextStyle} variant="h6" gutterBottom>
        Temperature: {data.current.temp_c}°C <DeviceThermostatIcon />
      </Typography>
      {/* Display weather condition text */}
      <Typography variant="subtitle1" gutterBottom>
        Condition: {data.current.condition.text}
      </Typography>
      {/* Display wind speed with an air icon */}
      <Typography sx={detailTextStyle} variant="subtitle1" gutterBottom>
        Wind Speed: {data.current.wind_kph} km/h <AirIcon />
      </Typography>
      {/* Display pressure */}
      <WeatherDetail
        label="Pressure"
        value={`${data.current.pressure_mb} mb`}
      />
      {/* Display feels like temperature */}
      <WeatherDetail
        label="Feels Like"
        value={`${data.current.feelslike_c}°C`}
      />
      {/* Display visibility */}
      <WeatherDetail label="Visibility" value={`${data.current.vis_km} km`} />
      {/* Display local time */}
      <Typography variant="subtitle1" gutterBottom>
        Local Time: {data.location.localtime}
      </Typography>
    </Box>
  );
};

export default WeatherDisplay;
