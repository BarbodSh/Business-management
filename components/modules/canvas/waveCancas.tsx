import { useEffect, useRef } from "react";

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = 0;
    let height = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointsCount = 40;
    const points: { x: number; y: number; targetY: number }[] = [];

    const init = () => {
      width = canvas.parentElement!.clientWidth;
      height = canvas.parentElement!.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 20 + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      points.length = 0;
      const gap = width / (pointsCount - 1);
      for (let i = 0; i < pointsCount; i++) {
        const y = height / 2;
        points.push({ x: i * gap, y, targetY: y });
      }
    };

    const updateTargets = () => {
      for (let point of points) {
        point.targetY = height / 2 + (Math.random() - 0.5) * height * 0.7;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const midX = (prev.x + curr.x) / 2;
        const midY = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
      }

      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.lineTo(width, 0);
      ctx.lineTo(0, 0);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(94,234,212,0.6)");
      gradient.addColorStop(0.3, "rgba(56,189,248,0.5)");
      gradient.addColorStop(0.6, "rgba(168,85,247,0.5)");
      gradient.addColorStop(1, "rgba(236,72,153,0.4)");

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      for (let point of points) {
        point.y += (point.targetY - point.y) * 0.02;
      }
      draw();
      requestAnimationFrame(animate);
    };

    init();
    updateTargets();
    animate();

    const targetInterval = setInterval(updateTargets, 1000);
    window.addEventListener("resize", init);

    return () => {
      clearInterval(targetInterval);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="w-full h-full absolute top-0 left-0" />
  );
}
