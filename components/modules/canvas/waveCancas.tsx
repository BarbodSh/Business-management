import { useEffect, useRef } from "react";

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = 0;
    let height = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const flakesCount = 150;
    const flakes: {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
    }[] = [];

    let mouseX = -9999;
    let mouseY = -9999;

    const init = () => {
      width = canvas.parentElement!.clientWidth;
      height = canvas.parentElement!.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      flakes.length = 0;
      for (let i = 0; i < flakesCount; i++) {
        flakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 3 + 2,
          speedY: Math.random() * 1 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "white";
      ctx.beginPath();
      for (let flake of flakes) {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    const update = () => {
      for (let flake of flakes) {
        // حرکت طبیعی
        flake.y += flake.speedY;
        flake.x += flake.speedX;

        // واکنش به موس (دافعه)
        const dx = flake.x - mouseX;
        const dy = flake.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = 80; // شعاع تأثیر موس

        if (dist < minDist) {
          const force = (minDist - dist) / minDist; // شدت دافعه
          const angle = Math.atan2(dy, dx);
          flake.x += Math.cos(angle) * force * 5;
          flake.y += Math.sin(angle) * force * 5;
        }

        // بازنشانی وقتی از پایین یا کنار بیرون رفت
        if (flake.y > height) {
          flake.y = -flake.radius;
          flake.x = Math.random() * width;
        }
        if (flake.x > width) flake.x = 0;
        if (flake.x < 0) flake.x = width;
      }
    };

    const animate = () => {
      update();
      draw();
      requestAnimationFrame(animate);
    };

    init();
    animate();

    // واکنش موس
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", () => {});
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="w-full h-full absolute top-0 left-0" />
  );
}
