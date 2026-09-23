type LoopVideoProps = {
  src: string;
  poster: string;
  className?: string;
  reducedMotion: boolean;
};

export default function LoopVideo({ src, poster, className = '', reducedMotion }: LoopVideoProps) {
  if (reducedMotion) return <img className={className} src={poster} alt="" />;
  return (
    <video className={className} autoPlay muted loop playsInline preload="metadata" poster={poster} aria-hidden="true">
      <source src={src} type="video/mp4" />
    </video>
  );
}
