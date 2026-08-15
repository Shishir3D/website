import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type WellCanvasProps = {
  progress: number;
  reducedMotion: boolean;
};

function createFrog() {
  const frog = new THREE.Group();
  const green = new THREE.MeshStandardMaterial({ color: 0x6f9d64, roughness: 0.9 });
  const lightGreen = new THREE.MeshStandardMaterial({ color: 0xa8c77a, roughness: 0.8 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x182b22, roughness: 1 });
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 12), green);
  body.scale.set(1.1, 0.8, 0.9);
  body.position.y = -0.12;
  frog.add(body);
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 12), lightGreen);
  belly.scale.set(1, 0.55, 0.75);
  belly.position.set(0, -0.2, 0.25);
  frog.add(belly);
  [-0.2, 0.2].forEach((x) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 8), lightGreen);
    eye.position.set(x, 0.16, 0.12);
    frog.add(eye);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), dark);
    pupil.position.set(x, 0.17, 0.22);
    frog.add(pupil);
  });
  [-0.24, 0.24].forEach((x) => {
    const foot = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 8), green);
    foot.scale.set(1.2, 0.45, 0.7);
    foot.position.set(x, -0.34, 0.08);
    frog.add(foot);
  });
  return frog;
}

export default function WellCanvas({ progress, reducedMotion }: WellCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  const motionRef = useRef(reducedMotion);

  useEffect(() => { progressRef.current = progress; }, [progress]);
  useEffect(() => { motionRef.current = reducedMotion; }, [reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    const world = new THREE.Group();
    scene.add(world);
    scene.add(new THREE.HemisphereLight(0xfff5ce, 0x24382f, 2.1));
    const key = new THREE.DirectionalLight(0xffd36e, 2.2);
    key.position.set(-3, 5, 4);
    scene.add(key);

    const ringMaterials = [0x6a6255, 0x7e725f, 0x554e46].map((color) => new THREE.MeshStandardMaterial({ color, roughness: 1 }));
    for (let i = 0; i < 9; i += 1) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.1 + (i % 3) * 0.3, 0.055 + (i % 2) * 0.02, 8, 56), ringMaterials[i % ringMaterials.length]);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -2.3 + i * 0.72;
      ring.position.z = -0.5 - i * 0.16;
      ring.rotation.z = (i % 2 ? 0.02 : -0.02);
      world.add(ring);
    }

    const sky = new THREE.Mesh(new THREE.CircleGeometry(2.15, 64), new THREE.MeshBasicMaterial({ color: 0xa8ddf0, transparent: true, opacity: 0.9 }));
    sky.position.set(0, 4.25, -2.05);
    world.add(sky);
    const sun = new THREE.Mesh(new THREE.CircleGeometry(0.3, 32), new THREE.MeshBasicMaterial({ color: 0xffd166 }));
    sun.position.set(0.72, 4.8, -1.95);
    world.add(sun);

    for (let i = 0; i < 10; i += 1) {
      const ledge = new THREE.Mesh(new THREE.BoxGeometry(0.7 + (i % 3) * 0.2, 0.12, 0.35), ringMaterials[(i + 1) % ringMaterials.length]);
      ledge.position.set((i % 2 ? 1 : -1) * (1.15 + (i % 3) * 0.13), -2 + i * 0.7, -0.2 - (i % 2) * 0.2);
      ledge.rotation.z = (i % 2 ? -0.08 : 0.08);
      world.add(ledge);
    }

    const frog = createFrog();
    frog.position.set(0, -1.85, 0.35);
    world.add(frog);

    const particlePositions = new Float32Array(90);
    for (let i = 0; i < particlePositions.length; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 4.7;
      particlePositions[i + 1] = Math.random() * 5 - 1.8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 1.8;
    }
    const particles = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({ color: 0xffe8a5, size: 0.025, transparent: true, opacity: 0.7 }));
    particles.geometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    world.add(particles);

    let animationFrame = 0;
    let visible = true;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 600 ? 1.25 : 1.6));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const render = (time = 0) => {
      const journey = progressRef.current;
      const eased = journey * journey * (3 - 2 * journey);
      camera.position.set(Math.sin(journey * 1.8) * 0.35, 1.45 + eased * 2.15, 7.3 - eased * 0.65);
      camera.lookAt(0, 1.35 + eased * 1.25, -0.7);
      frog.position.y = -1.85 + eased * 3.75;
      frog.position.x = Math.sin(journey * Math.PI * 3) * 0.68;
      frog.rotation.z = Math.sin(journey * Math.PI * 2) * 0.08;
      frog.scale.setScalar(0.9 + eased * 0.2);
      particles.rotation.y = time * 0.00003;
      world.rotation.z = Math.sin(time * 0.00018) * 0.006;
      renderer.render(scene, camera);
    };
    const tick = (time: number) => {
      if (visible) {
        render(time);
        if (!motionRef.current) animationFrame = window.requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !motionRef.current) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(tick);
      }
    }, { threshold: 0.05 });
    observer.observe(canvas);
    const onVisibility = () => { visible = document.visibilityState === 'visible'; };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', resize);
    resize();
    render();
    if (!motionRef.current) animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', resize);
      world.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="well-canvas" aria-hidden="true" />;
}
