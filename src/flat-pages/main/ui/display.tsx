"use client";

import CanvasComponent from './CanvasComponent';
import { useWindAngle } from './useWindAngle';
import { WeatherData } from './fetch';

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
      <h1 className="text-2xl font-bold text-gray-900 text-center"> {data.region} 풍향 시각화 자료입니다. </h1>
      <ul className="space-y-2">
        <li className="flex justify-between p-4 bg-gray-100 rounded-lg shadow">
          <span className="font-medium text-gray-700">풍속 (m/s)</span>
          <span>{data.windSp} m/s</span>
        </li>
        <li className="flex justify-between p-4 bg-gray-100 rounded-lg shadow">
          <span className="font-medium text-gray-700">풍향:</span>
          <span>{data.windDir}°</span>
        </li>
        <li className="flex justify-between p-4 bg-gray-100 rounded-lg shadow">
          <span className="font-medium text-gray-700">파고:</span>
          <span>{data.wave} m</span>
        </li>
        <li className="flex justify-between p-4 bg-gray-100 rounded-lg shadow">
          <span className="font-medium text-gray-700">풍랑 경보:</span>
          { data.windAdvisory ? (<span className='font-medium text-red-700'>O</span>) : (<span className='font-medium text-green-700'>X</span>) }
        </li>
        <li className="flex justify-between p-4 bg-gray-100 rounded-lg shadow">
          <span className="font-medium text-gray-700">풍랑 주의보:</span>
          { data.windWarning ? (<span className='font-medium text-red-700'>O</span>) : (<span className='font-medium text-green-700'>X</span>) }

        </li>
      </ul>
      {angleBetweenDegrees !== null && (
        <div className = "flex flex-col">
          <div className="text-xl font-semibold text-gray-900 text-center">
          Angle between wind direction and shore: {angleBetweenDegrees.toFixed(2)}°
        </div>
        <div className="text-xl font-bold text-gray-900 text-center">
          {getWindType(angleBetweenDegrees) !== '육풍' ? (
            <span className='text-xl font-bold text-blue-800 text-center'>해풍</span>
          ): (<span className='text-xl font-bold text-red-800 text-center'>육풍</span>)}
        </div>
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
