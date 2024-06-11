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
  const data1 = await fetchWeatherData(1); 
  const data2 = await fetchWeatherData(61);
  const data3 = await fetchWeatherData(121);
  const data4 = await fetchWeatherData(181);
  const data5 = await fetchWeatherData(241);
  const data6 = await fetchWeatherData(301);
  const data7 = await fetchWeatherData(361);
  const data8 = await fetchWeatherData(421);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-row space-x-4">
        <Display data={data1} />
        <Display data={data2} />
        <Display data={data3} />
        <Display data={data4} />
        <Display data={data5} />
      </div>
    </div>
  );
};
