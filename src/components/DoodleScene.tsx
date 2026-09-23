import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DoodleSceneProps = { progress: number; orbit: number; reducedMotion: boolean };

function stroke(points: THREE.Vector3[], material: THREE.Material, radius = 0.022) {
  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(8, points.length * 8), radius, 5, false), material);
}

function makeWell() {
  const sculpture = new THREE.Group();
  const ink = new THREE.MeshBasicMaterial({ color: 0x252c27 });
  const gray = new THREE.MeshBasicMaterial({ color: 0x838e80 });
  const lime = new THREE.MeshBasicMaterial({ color: 0xd9f26f, side: THREE.DoubleSide });
  const blue = new THREE.MeshBasicMaterial({ color: 0x91b7ef, side: THREE.DoubleSide });
  const paper = new THREE.MeshBasicMaterial({ color: 0xfaf8ee, side: THREE.DoubleSide });

  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(2.15, 2.25, 0.11, 48), paper);
  plinth.position.y = -1.52;
  sculpture.add(plinth);
  const pool = new THREE.Mesh(new THREE.CircleGeometry(1.42, 48), blue);
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = -1.35;
  sculpture.add(pool);
  for (let level = 0; level < 4; level += 1) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.025, 6, 72), level === 3 ? ink : gray);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.36 + level * 0.47;
    sculpture.add(ring);
  }
  for (let index = 0; index < 10; index += 1) {
    const angle = (index / 10) * Math.PI * 2;
    const x = Math.cos(angle) * 1.55;
    const z = Math.sin(angle) * 1.55;
    sculpture.add(stroke([new THREE.Vector3(x, -1.36, z), new THREE.Vector3(x, 0.05, z)], index % 2 ? gray : ink, 0.014));
  }
  // The small ladder is deliberately separate from the rim; the frog lives in the film.
  for (const x of [-0.45, 0.08]) {
    sculpture.add(stroke([new THREE.Vector3(x, -1.18, 1.4), new THREE.Vector3(x, 0.8, 1.4)], ink, 0.02));
  }
  for (let step = 0; step < 5; step += 1) {
    const y = -1 + step * 0.38;
    sculpture.add(stroke([new THREE.Vector3(-0.45, y, 1.42), new THREE.Vector3(0.08, y, 1.42)], ink, 0.019));
  }
  const star = new THREE.Group();
  const points: THREE.Vector3[] = [];
  for (let index = 0; index < 9; index += 1) {
    const angle = -Math.PI / 2 + index * Math.PI / 4;
    const radius = index % 2 ? 0.18 : 0.43;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
  }
  star.add(stroke(points, ink, 0.024));
  const center = new THREE.Mesh(new THREE.CircleGeometry(0.15, 24), lime);
  center.position.z = -0.015;
  star.add(center);
  star.position.set(1.8, 1.45, 0.1);
  sculpture.add(star);
  const arrow = stroke([
    new THREE.Vector3(-2.22, -0.1, 0.3),
    new THREE.Vector3(-2.35, 0.45, 0.3),
    new THREE.Vector3(-2.1, 0.95, 0.3),
    new THREE.Vector3(-1.73, 1.15, 0.3),
  ], ink, 0.019);
  sculpture.add(arrow);
  sculpture.add(stroke([
    new THREE.Vector3(-2.02, 1.17, 0.3),
    new THREE.Vector3(-1.73, 1.15, 0.3),
    new THREE.Vector3(-1.8, 0.87, 0.3),
  ], ink, 0.019));
  return { sculpture, star };
}

export default function DoodleScene({ progress, orbit, reducedMotion }: DoodleSceneProps) {
  const holderRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef({ progress, orbit, reducedMotion });
  const updateRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    settingsRef.current = { progress, orbit, reducedMotion };
    updateRef.current?.();
  }, [progress, orbit, reducedMotion]);

  useEffect(() => {
    const holder = holderRef.current;
    const canvas = canvasRef.current;
    if (!holder || !canvas) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      holder.dataset.webgl = 'unavailable';
      return;
    }
    holder.dataset.webgl = 'ready';
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 40);
    camera.position.set(0, 3.1, 8.5);
    camera.lookAt(0, 0, 0);
    const { sculpture, star } = makeWell();
    scene.add(sculpture);
    let frame = 0;
    let visible = true;
    let disposed = false;
    let angle = 0;
    const render = (time = 0) => {
      if (!visible || disposed) return;
      const { progress: p, orbit: o, reducedMotion: still } = settingsRef.current;
      const target = o * Math.PI / 4 + p * 0.35;
      angle = still ? target : THREE.MathUtils.lerp(angle, target, 0.11);
      sculpture.rotation.y = angle;
      sculpture.rotation.x = p * -0.08;
      star.position.y = 1.45 + p * 0.35 + (still ? 0 : Math.sin(time * 0.0015) * 0.06);
      renderer.render(scene, camera);
    };
    updateRef.current = () => {
      render(performance.now());
      if (settingsRef.current.reducedMotion && frame) { cancelAnimationFrame(frame); frame = 0; }
      if (!settingsRef.current.reducedMotion && visible && !frame) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const { width, height } = holder.getBoundingClientRect();
      if (!width || !height) return;
      const extent = width < 600 ? 2.65 : 3.05;
      const aspect = width / height;
      camera.left = -extent * aspect;
      camera.right = extent * aspect;
      camera.top = extent;
      camera.bottom = -extent;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 600 ? 1.25 : 1.5));
      renderer.setSize(width, height, false);
      render();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(holder);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) render(performance.now());
      else if (frame) { cancelAnimationFrame(frame); frame = 0; }
      if (visible && !settingsRef.current.reducedMotion && !frame) frame = requestAnimationFrame(tick);
    }, { threshold: 0.01 });
    intersectionObserver.observe(holder);
    function tick(time: number) {
      frame = 0;
      if (disposed || !visible || settingsRef.current.reducedMotion) return;
      render(time);
      frame = requestAnimationFrame(tick);
    }
    const onContextLost = (event: Event) => { event.preventDefault(); visible = false; holder.dataset.webgl = 'unavailable'; if (frame) cancelAnimationFrame(frame); frame = 0; };
    const onContextRestored = () => { holder.dataset.webgl = 'ready'; visible = true; resize(); if (!settingsRef.current.reducedMotion) frame = requestAnimationFrame(tick); };
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);
    resize();
    if (!settingsRef.current.reducedMotion) frame = requestAnimationFrame(tick);
    return () => {
      disposed = true;
      updateRef.current = null;
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);
          const list = Array.isArray(object.material) ? object.material : [object.material];
          list.forEach((material) => materials.add(material));
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }, []);

  return <div className="doodle-scene" ref={holderRef} aria-hidden="true">
    <svg className="doodle-scene-fallback" viewBox="0 0 400 400" fill="none" stroke="#252c27" strokeWidth="3"><ellipse cx="200" cy="265" rx="125" ry="48" /><ellipse cx="200" cy="215" rx="125" ry="48" /><path d="M75 215v50m250-50v50M160 195l-5 100m38-95-5 100m-31-75h34m-36 30h34m-37 30h35" /><path d="m306 78 9 25 25 9-25 9-9 25-9-25-25-9 25-9z" fill="#d9f26f" /></svg>
    <canvas ref={canvasRef} />
  </div>;
}
