"use server";

export type WeatherData = {
  region: string;
  windSp: number;
  windDir: number;
  wave: number;
  windAdvisory: boolean;
  windWarning: boolean;
};

const fetchWeatherData = async (pageNo: string): Promise<WeatherData> => {
  const response = await fetch(`http://43.202.3.44:8080/data/v1/wind?pageNo=${pageNo}&numOfRows=1`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
};

export { fetchWeatherData };
