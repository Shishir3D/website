import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DoodleSceneProps = { progress: number; reducedMotion: boolean };

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
  const stoneMaterials = [
    new THREE.MeshStandardMaterial({ color: 0xd7e1cf, roughness: 0.92, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: 0xbacbb7, roughness: 0.95, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: 0xe7e9d8, roughness: 0.93, side: THREE.DoubleSide }),
  ];
  for (let row = 0; row < 3; row += 1) {
    for (let brick = 0; brick < 16; brick += 1) {
      const start = (brick + (row % 2) * 0.5) * Math.PI / 8 + 0.014;
      const segment = new THREE.Mesh(
        new THREE.CylinderGeometry(1.55, 1.55, 0.45, 3, 1, true, start, Math.PI / 8 - 0.028),
        stoneMaterials[(row + brick) % stoneMaterials.length],
      );
      segment.position.y = -1.13 + row * 0.47;
      sculpture.add(segment);
    }
  }
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
  const frog = new THREE.Group();
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 14), lime);
  body.scale.set(0.86, 1.15, 0.55);
  frog.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 22, 16), lime);
  head.position.y = 0.38;
  head.scale.z = 0.68;
  frog.add(head);
  const eyeWhite = new THREE.MeshBasicMaterial({ color: 0xfffefa });
  for (const x of [-0.15, 0.15]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 8), eyeWhite);
    eye.position.set(x, 0.66, 0.19);
    frog.add(eye);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.036, 10, 8), ink);
    pupil.position.set(x + 0.012, 0.66, 0.27);
    frog.add(pupil);
    frog.add(stroke([
      new THREE.Vector3(x, -0.12, 0.1),
      new THREE.Vector3(x * 1.7, -0.48, 0.16),
      new THREE.Vector3(x * 2.1, -0.55, 0.22),
    ], ink, 0.019));
  }
  frog.add(stroke([
    new THREE.Vector3(-0.11, 0.28, 0.24),
    new THREE.Vector3(0, 0.22, 0.27),
    new THREE.Vector3(0.11, 0.28, 0.24),
  ], ink, 0.017));
  frog.position.set(1.87, -1.05, 1.92);
  sculpture.add(frog);
  const waterRing = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.015, 5, 64), ink);
  waterRing.rotation.x = Math.PI / 2;
  waterRing.position.y = -1.33;
  sculpture.add(waterRing);
  const clouds = new THREE.Group();
  for (const [x, y, scale] of [[-1.8, 1.54, 0.8], [1.65, 1.8, 0.6]] as const) {
    clouds.add(stroke([
      new THREE.Vector3(x - scale, y, -1.4),
      new THREE.Vector3(x - scale * 0.42, y + scale * 0.13, -1.4),
      new THREE.Vector3(x, y + scale * 0.25, -1.4),
      new THREE.Vector3(x + scale * 0.5, y + scale * 0.13, -1.4),
      new THREE.Vector3(x + scale, y, -1.4),
    ], gray, 0.02));
  }
  sculpture.add(clouds);
  return { sculpture, star, frog, clouds, waterRing };
}

export default function DoodleScene({ progress, reducedMotion }: DoodleSceneProps) {
  const holderRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef({ progress, reducedMotion });
  const updateRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    settingsRef.current = { progress, reducedMotion };
    updateRef.current?.();
  }, [progress, reducedMotion]);

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
    const { sculpture, star, frog, clouds, waterRing } = makeWell();
    scene.add(sculpture);
    scene.add(new THREE.AmbientLight(0xffffff, 2.1));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
    keyLight.position.set(-3, 7, 6);
    scene.add(keyLight);
    let frame = 0;
    let visible = true;
    let disposed = false;
    let angle = 0;
    const render = (time = 0) => {
      if (!visible || disposed) return;
      const { progress: p, reducedMotion: still } = settingsRef.current;
      const eased = p * p * (3 - 2 * p);
      const target = -0.18 + eased * 0.65;
      angle = still ? target : THREE.MathUtils.lerp(angle, target, 0.11);
      sculpture.rotation.y = angle;
      sculpture.rotation.x = p * -0.09;
      frog.position.set(1.87 + eased * 0.16, -1.05 + eased * 2.24, 1.92);
      frog.rotation.z = eased * -0.16 + (still ? 0 : Math.sin(time * 0.003) * 0.045);
      frog.scale.setScalar(0.82 + eased * 0.24);
      clouds.position.x = -eased * 0.46;
      clouds.position.y = eased * 0.16;
      waterRing.scale.setScalar(1 + (still ? 0 : Math.sin(time * 0.002) * 0.025));
      camera.position.y = 3.1 + eased * 0.7;
      camera.lookAt(0, eased * 0.25, 0);
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
      const extent = width < 600 ? 2.5 : 2.65;
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
    <svg className="doodle-scene-fallback" viewBox="0 0 600 420" role="presentation" aria-hidden="true">
      <defs><pattern id="paper-speck" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="4" cy="8" r="0.8" fill="#bcc9b4" opacity=".55"/><circle cx="21" cy="19" r=".6" fill="#bcc9b4" opacity=".45"/></pattern></defs>
      <rect width="600" height="420" fill="url(#paper-speck)"/>
      <circle cx="455" cy="92" r="34" fill="#d9f26f" stroke="#252c27" strokeWidth="2"/>
      <path d="M0 240 Q75 205 150 240 T300 238 T450 225 T600 236 V420 H0Z" fill="#e1ead8" stroke="#8b9d88" strokeWidth="2"/>
      <path d="M0 300 Q120 262 230 300 T440 292 T600 296 V420 H0Z" fill="#c9ddbd" stroke="#849d7b" strokeWidth="2"/>
      <path d="M40 95q24-20 47 0t48-2m340 79q24-16 45 0t46-2" fill="none" stroke="#839989" strokeWidth="3" strokeLinecap="round"/>
      <path d="M458 330 C510 265 500 205 459 156" stroke="#607e60" strokeWidth="2" strokeDasharray="5 9" fill="none"/>
      <path d="m450 165 9-12 12 10" fill="none" stroke="#607e60" strokeWidth="2"/>
      <ellipse cx="290" cy="351" rx="150" ry="27" fill="#abc3a9" opacity=".45"/>
      <path d="M160 199v122 Q290 370 420 321V199" fill="#b9cab4" stroke="#252c27" strokeWidth="3"/>
      <path d="M160 240 Q290 277 420 240M160 281 Q290 320 420 281M160 321 Q290 366 420 321" fill="none" stroke="#667c69" strokeWidth="2"/>
      <path d="M210 218v38m54 11v42m62-86v37m49 10v43M200 290v42m90-28v45m65-52v41" stroke="#667c69" strokeWidth="2"/>
      <ellipse cx="290" cy="200" rx="130" ry="37" fill="#fffdf5" stroke="#252c27" strokeWidth="4"/>
      <ellipse cx="290" cy="208" rx="110" ry="25" fill="#8bb4dc" stroke="#252c27" strokeWidth="2"/>
      <path d="M210 193v126m20-126v132m-20-97h20m-20 36h20m-20 36h20" stroke="#252c27" strokeWidth="4" strokeLinecap="round"/>
      <ellipse cx="290" cy="200" rx="130" ry="37" fill="none" stroke="#252c27" strokeWidth="4"/>
      <g style={{ transform: `translate(${progress * 2}px, ${-progress * 167}px) rotate(${-progress * 12}deg)`, transformOrigin: '465px 317px', transition: reducedMotion ? 'none' : 'transform .14s linear' }}>
        <ellipse cx="467" cy="327" rx="24" ry="6" fill="#738d73" opacity=".45"/>
        <path d="m453 294-15 34 21-14m22-21 19 35-23-13" fill="none" stroke="#252c27" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <ellipse cx="468" cy="291" rx="22" ry="30" fill="#d9f26f" stroke="#252c27" strokeWidth="4"/>
        <circle cx="468" cy="262" r="25" fill="#d9f26f" stroke="#252c27" strokeWidth="4"/>
        <circle cx="455" cy="242" r="10" fill="#d9f26f" stroke="#252c27" strokeWidth="3"/>
        <circle cx="481" cy="242" r="10" fill="#d9f26f" stroke="#252c27" strokeWidth="3"/>
        <circle cx="457" cy="251" r="3" fill="#252c27"/><circle cx="480" cy="251" r="3" fill="#252c27"/>
        <path d="M460 269q8 8 17 0" fill="none" stroke="#252c27" strokeWidth="2.5" strokeLinecap="round"/>
      </g>
      <path d="m93 160 8-17 8 17 17 8-17 8-8 17-8-17-17-8z" fill="#d9f26f" stroke="#252c27" strokeWidth="2"/>
    </svg>
    <canvas ref={canvasRef} />
  </div>;
}
