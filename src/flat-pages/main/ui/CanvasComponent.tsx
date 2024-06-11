"use client";

import { useEffect, useRef } from 'react';
import img0 from '../../../assets/Haeundae.png';

interface Props {
  windDir: number;
  lineLength: number;
  onAngleCalculated: (angle: number) => void;
}

const toRadians = (degree: number) => degree * (Math.PI / 180);
const toDegrees = (radians: number) => radians * (360 / Math.PI);

const CanvasComponent: React.FC<Props> = ({ windDir, lineLength, onAngleCalculated }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const windStartPosition = { x: 250, y: 250 }; // Center of the canvas
  const ShoreStartPosition = { x: 100, y: 300 }; // Shore starting point of the canvas
  const ShoreEndPosition = { x: 450, y: 220 }; // Shore end point of the canvas

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = img0.src;

      image.onload = () => {
        const canvasSize = 500;
        canvas.width = canvasSize;
        canvas.height = canvasSize;

        if (ctx) {
          // Draw the image scaled to 500x500
          ctx.drawImage(image, 0, 0, canvasSize, canvasSize);

          // Calculate the end position based on wind direction (reverse direction for wind)
          const windStartOpposite = {
            x: windStartPosition.x - lineLength * Math.cos(toRadians(windDir)),
            y: windStartPosition.y - lineLength * Math.sin(toRadians(windDir)),
          };
      
          const windEndPosition = {
            x: windStartPosition.x + lineLength * Math.cos(toRadians(windDir)),
            y: windStartPosition.y + lineLength * Math.sin(toRadians(windDir)),
          };

          // Draw a line on the canvas for wind direction
          ctx.beginPath();
          ctx.moveTo(windStartOpposite.x, windStartOpposite.y); // Starting point
          ctx.lineTo(windEndPosition.x, windEndPosition.y); // Ending point
          ctx.strokeStyle = 'blue';
          ctx.lineWidth = 2;
          ctx.stroke();
          drawArrow(ctx, windEndPosition.x, windEndPosition.y, windDir, 'blue'); // Adjust direction for arrow

          // Draw additional line
          ctx.beginPath();
          ctx.moveTo(ShoreStartPosition.x, ShoreStartPosition.y); // Starting point
          ctx.lineTo(ShoreEndPosition.x, ShoreEndPosition.y); // Ending point
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 2;
          ctx.stroke();
          drawArrow(ctx, ShoreEndPosition.x, ShoreEndPosition.y, toDegrees(Math.atan2(ShoreEndPosition.y - ShoreStartPosition.y, ShoreEndPosition.x - ShoreStartPosition.x)), 'red');

          // Calculate angle between lines
          const windVector = { x: windEndPosition.x - windStartPosition.x, y: windEndPosition.y - windStartPosition.y };
          const shoreVector = { x: ShoreEndPosition.x - ShoreStartPosition.x, y: ShoreEndPosition.y - ShoreStartPosition.y };

          const dotProduct = windVector.x * shoreVector.x + windVector.y * shoreVector.y;
          const magnitudeWind = Math.sqrt(windVector.x ** 2 + windVector.y ** 2);
          const magnitudeShore = Math.sqrt(shoreVector.x ** 2 + shoreVector.y ** 2);

          const angleBetween = Math.acos(dotProduct / (magnitudeWind * magnitudeShore));
          const angleBetweenDegrees = toDegrees(angleBetween);

          onAngleCalculated(angleBetweenDegrees);
        }
      };
    }
  }, [windDir, lineLength, onAngleCalculated]);

  const drawArrow = (ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, color: string) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(toRadians(angle));
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-10, -5);
    ctx.lineTo(-10, 5);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto pointer-events-none"
    />
  );
};

export default CanvasComponent;
