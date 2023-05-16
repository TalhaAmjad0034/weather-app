import axios from "axios";

export const getCityWeather = (city: string) => {
  return axios
    .post(
      `${process.env.API_BASE_URL}?key=${process.env.WEATHER_API_ACCESS_KEY}&q=${city}`
    )
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export interface WeatherDataType {
  current: {
    condition: {
      icon: string;
      text: string;
    };
    temp_c: number;
    wind_kph: number;
    pressure_mb: number;
    feelslike_c: number;
    vis_km: number;
  };
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  data: {
    error: {
      message: string;
    };
  };
}
