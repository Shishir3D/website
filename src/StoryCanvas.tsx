import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type StoryCanvasProps = {
  progress: number;
  chapter: number;
  reducedMotion: boolean;
};

const artByChapter = [
  '/story/voice.webp',
  '/story/mobile.webp',
  '/story/transactions.webp',
  '/story/nepali-voice.webp',
  '/story/plant.webp',
];

function createPetals() {
  const positions = new Float32Array(54);
  for (let index = 0; index < positions.length; index += 3) {
    positions[index] = (Math.random() - 0.5) * 6.4;
    positions[index + 1] = (Math.random() - 0.2) * 5.2;
    positions[index + 2] = (Math.random() - 0.5) * 2.2;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ color: 0xfff2c7, size: 0.045, transparent: true, opacity: 0.8 }),
  );
}

function createStoneRing() {
  const ring = new THREE.Group();
  const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0x897b68, roughness: 0.94, metalness: 0 });
  const mossMaterial = new THREE.MeshStandardMaterial({ color: 0x759263, roughness: 1 });
  for (let index = 0; index < 15; index += 1) {
    const angle = (index / 15) * Math.PI * 2;
    const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.33 + (index % 3) * 0.035, 0), stoneMaterial);
    stone.position.set(Math.cos(angle) * 1.75, -1.55 + Math.sin(angle * 2) * 0.04, Math.sin(angle) * 0.46);
    stone.scale.set(1.2, 0.52, 0.86);
    stone.rotation.set(0.2 * Math.sin(index), angle, 0.15 * Math.cos(index));
    ring.add(stone);
    if (index % 3 === 0) {
      const moss = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), mossMaterial);
      moss.position.set(stone.position.x, stone.position.y + 0.18, stone.position.z + 0.12);
      moss.scale.set(1.7, 0.25, 0.8);
      ring.add(moss);
    }
  }
  return ring;
}

export default function StoryCanvas({ progress, chapter, reducedMotion }: StoryCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  const chapterRef = useRef(chapter);
  const motionRef = useRef(reducedMotion);

  useEffect(() => { progressRef.current = progress; }, [progress]);
  useEffect(() => { chapterRef.current = chapter; }, [chapter]);
  useEffect(() => { motionRef.current = reducedMotion; }, [reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch { return undefined; }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    const world = new THREE.Group();
    const artWorld = new THREE.Group();
    scene.add(world, artWorld);

    scene.add(new THREE.HemisphereLight(0xfff7da, 0x7b9b93, 2.1));
    const sunlight = new THREE.DirectionalLight(0xffd98d, 3);
    sunlight.position.set(-3, 5, 4);
    scene.add(sunlight);

    const textureLoader = new THREE.TextureLoader();
    const heroTexture = textureLoader.load('/story/hero-frog.webp');
    heroTexture.colorSpace = THREE.SRGBColorSpace;
    const heroPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(6.8, 3.83),
      new THREE.MeshBasicMaterial({ map: heroTexture, transparent: true, opacity: 0.98 }),
    );
    heroPlane.position.set(0.2, 0.9, -1.8);
    artWorld.add(heroPlane);

    const chapterTextures = artByChapter.map((path) => {
      const texture = textureLoader.load(path);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    });
    const chapterCard = new THREE.Mesh(
      new THREE.PlaneGeometry(1.08, 0.81),
      new THREE.MeshBasicMaterial({ map: chapterTextures[0], transparent: true, opacity: 0.36 }),
    );
    chapterCard.position.set(2.45, 0.25, -0.75);
    chapterCard.rotation.z = -0.12;
    artWorld.add(chapterCard);

    const ring = createStoneRing();
    world.add(ring);
    const water = new THREE.Mesh(
      new THREE.CircleGeometry(1.46, 64),
      new THREE.MeshStandardMaterial({ color: 0x2d6f78, roughness: 0.2, metalness: 0.1, transparent: true, opacity: 0.9 }),
    );
    water.rotation.x = -Math.PI / 2;
    water.position.set(0, -1.67, 0.02);
    world.add(water);

    const skyDisc = new THREE.Mesh(
      new THREE.CircleGeometry(2.02, 64),
      new THREE.MeshBasicMaterial({ color: 0x9eddf0, transparent: true, opacity: 0.76 }),
    );
    skyDisc.position.set(0, 3.42, -1.55);
    world.add(skyDisc);
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 18, 12),
      new THREE.MeshBasicMaterial({ color: 0xffcc70 }),
    );
    sun.position.set(1.15, 3.8, -1.25);
    world.add(sun);

    const foregroundLeaf = new THREE.Mesh(
      new THREE.SphereGeometry(0.78, 12, 8),
      new THREE.MeshStandardMaterial({ color: 0x6c965b, roughness: 0.9 }),
    );
    foregroundLeaf.scale.set(1.8, 0.14, 0.7);
    foregroundLeaf.position.set(-2.7, -0.8, 0.9);
    foregroundLeaf.rotation.z = -0.18;
    world.add(foregroundLeaf);

    const petals = createPetals();
    world.add(petals);

    let animationFrame = 0;
    let visible = true;
    let disposed = false;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 700 ? 1.25 : 1.6));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const render = (time = 0) => {
      if (disposed) return;
      const journey = progressRef.current;
      const eased = journey * journey * (3 - 2 * journey);
      const chapterIndex = chapterRef.current;
      camera.position.set(Math.sin(journey * Math.PI) * 0.42, 0.62 + eased * 1.24, 7.4 - eased * 0.84);
      camera.lookAt(0.1, 0.75 + eased * 1.04, -0.8);

      heroPlane.position.y = 0.8 + eased * 0.52;
      heroPlane.position.x = 0.1 + Math.sin(journey * Math.PI * 1.2) * 0.14;
      heroPlane.rotation.z = Math.sin(journey * Math.PI) * -0.018;
      heroPlane.scale.setScalar(1.02 - eased * 0.04);
      chapterCard.material = chapterCard.material as THREE.MeshBasicMaterial;
      chapterCard.material.map = chapterTextures[chapterIndex];
      chapterCard.material.needsUpdate = true;
      chapterCard.position.y = -0.05 + eased * 1.25;
      chapterCard.position.x = 2.42 - eased * 0.7;
      chapterCard.material.opacity = 0.22 + eased * 0.22;

      ring.position.y = -eased * 1.12;
      ring.rotation.y = eased * 0.32;
      water.position.y = -1.67 - eased * 1.12;
      skyDisc.position.y = 3.42 + eased * 0.7;
      sun.position.y = 3.8 + eased * 0.66;
      foregroundLeaf.position.x = -2.7 + eased * 1.2;
      petals.rotation.y = motionRef.current ? 0 : time * 0.00004;
      world.rotation.z = motionRef.current ? 0 : Math.sin(time * 0.00016) * 0.008;
      renderer.render(scene, camera);
    };

    const tick = (time: number) => {
      if (!visible || motionRef.current) return;
      render(time);
      animationFrame = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !motionRef.current) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(tick);
      }
    }, { threshold: 0.02 });
    observer.observe(canvas);
    const onVisibility = () => { visible = document.visibilityState === 'visible'; };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', resize);
    resize();
    render();
    if (!motionRef.current) animationFrame = window.requestAnimationFrame(tick);

    return () => {
      disposed = true;
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
      heroTexture.dispose();
      chapterTextures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, []);

  return <><div className="scene-fallback" style={{ backgroundImage: 'url(/story/hero-frog.webp)' }} /><canvas ref={canvasRef} className="story-canvas" /></>;
}
