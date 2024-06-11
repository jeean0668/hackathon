declare module 'gifencoder' {
    import { Readable } from 'stream';
  
    class GIFEncoder {
      constructor(width: number, height: number);
      createReadStream(): Readable;
      start(): void;
      setRepeat(repeat: number): void;
      setDelay(delay: number): void;
      setQuality(quality: number): void;
      addFrame(ctx: CanvasRenderingContext2D): void;
      finish(): void;
    }
  
    export = GIFEncoder;
  }
  