"use server";

import { revalidatePath } from 'next/cache';
import Display from './display';

const fetchWeatherData = async (pageNo : number) => {
  const response = await fetch(`http://43.202.3.44:8080/data/v1/wind?pageNo=${pageNo}&numOfRows=1`); // 여기에 실제 API URL을 넣으세요.
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
};

export const MainPage = async () => {

  revalidatePath('/');
  const data = await fetchWeatherData(361);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-row space-x-4">
        <Display data={data} />
      </div>
    </div>
  );
};
