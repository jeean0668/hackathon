"use client";

import CanvasComponent from './CanvasComponent';
import { useWindAngle } from './useWindAngle';

interface DisplayProps {
  data: {
    region: string;
    windSp: number;
    windDir: number;
    wave: number;
    windAdvisory: boolean;
    windWarning: boolean;
  };
}

const Display: React.FC<DisplayProps> = ({ data }) => {
  const { angleBetweenDegrees, setAngleBetweenDegrees, windDir } = useWindAngle(data.windDir);

  const getWindType = (angle: number | null) => {
    if (angle === null) return '';
    return angle <= 180 ? '해풍' : '육풍';
  };

  return (
    <div className="p-6 max-w-md bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 text-center">Weather Information for {data.region}</h1>
      <ul className="space-y-2">
        <li className="flex justify-between p-4 bg-gray-100 rounded-lg shadow">
          <span className="font-medium text-gray-700">Wind Speed:</span>
          <span>{data.windSp} m/s</span>
        </li>
        <li className="flex justify-between p-4 bg-gray-100 rounded-lg shadow">
          <span className="font-medium text-gray-700">Wind Direction:</span>
          <span>{data.windDir}°</span>
        </li>
        <li className="flex justify-between p-4 bg-gray-100 rounded-lg shadow">
          <span className="font-medium text-gray-700">Wave Height:</span>
          <span>{data.wave} m</span>
        </li>
        <li className="flex justify-between p-4 bg-gray-100 rounded-lg shadow">
          <span className="font-medium text-gray-700">Wind Advisory:</span>
          <span>{data.windAdvisory ? "Yes" : "No"}</span>
        </li>
        <li className="flex justify-between p-4 bg-gray-100 rounded-lg shadow">
          <span className="font-medium text-gray-700">Wind Warning:</span>
          <span>{data.windWarning ? "Yes" : "No"}</span>
        </li>
      </ul>
      {angleBetweenDegrees !== null && (
        <div className="text-xl font-bold text-gray-900 text-center">
          Angle between wind direction and shore: {angleBetweenDegrees.toFixed(2)}° ({getWindType(angleBetweenDegrees)})
        </div>
      )}
      <div className="relative w-500 h-500">
        <CanvasComponent 
          windDir={windDir}
          lineLength={200}
          onAngleCalculated={(angle) => setAngleBetweenDegrees(angle)}
        />
      </div>
    </div>
  );
};

export default Display;
