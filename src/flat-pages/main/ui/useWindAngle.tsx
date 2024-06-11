import { useState } from 'react';

export const useWindAngle = (initialWindDir: number) => {
  const [angleBetweenDegrees, setAngleBetweenDegrees] = useState<number | null>(null);
  const windDir = initialWindDir + 90; // Adjust wind direction for the correct angle

  return { angleBetweenDegrees, setAngleBetweenDegrees, windDir };
};
