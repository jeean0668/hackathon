"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Display from '@/flat-pages/main/ui/display';
import { fetchWeatherData, WeatherData } from './fetch';

export function MainPage() {
  const searchParams = useSearchParams();
  const pageNum = searchParams.get('pageNum');
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pageNum) {
      fetchWeatherData(pageNum)
        .then((result) => setData(result))
        .catch((error) => setError(error.message));
    }
  }, [pageNum]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {error ? (
        <p>{error}</p>
      ) : data ? (
        <div className="flex flex-row space-x-4">
          <Display data={data} />
        </div>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
}
