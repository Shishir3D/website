import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Pfp from './assets/pfp.jpeg';
import Image1 from './assets/image 2.svg'; 
import Image2 from './assets/image 3.svg';
import Image3 from './assets/image 4.svg';
import Image4 from './assets/image 5.svg';

// Define the type for the rectangle properties
interface Rectangle {
  id: number;
  size: number; // Use size instead of width and height to make squares
  top: number;
  left: number;
  speedX: number; // Speed in horizontal direction
  speedY: number; // Speed in vertical direction
}

const App: React.FC = () => {
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);

  // Function to generate random position and size for rectangles (squares)
  const createRectangles = () => {
    const rects: Rectangle[] = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 30 + 10; // Random square size
      rects.push({
        id: i,
        size: size,
        top: Math.random() * 90 + 5,
        left: Math.random() * 90 + 5,
        speedX: Math.random() * 0.1 - 0.05, // Slower drift horizontally
        speedY: Math.random() * 0.1 - 0.05, // Slower drift vertically
      });
    }
    setRectangles(rects);
  };

  // Move the rectangles smoothly
  useEffect(() => {
    createRectangles();

    const intervalId = setInterval(() => {
      setRectangles((rects) =>
        rects.map((rect) => {
          let newTop = rect.top + rect.speedY;
          let newLeft = rect.left + rect.speedX;

          // Keep squares within bounds (between 0% and 100%)
          if (newTop < 0 || newTop > 95) {
            rect.speedY *= -1; // Reverse direction if out of bounds
            newTop = rect.top + rect.speedY;
          }
          if (newLeft < 0 || newLeft > 95) {
            rect.speedX *= -1; // Reverse direction if out of bounds
            newLeft = rect.left + rect.speedX;
          }

          return {
            ...rect,
            top: newTop,
            left: newLeft,
          };
        })
      );
    }, 100); // Smooth movement

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const projects = [
    {
      name: "Built a smart plant Irrigation System using ESP32",
      icon: Image1,
      link: "https://github.com/Shishir3D/RoboticsCW"
    },
    {
      name: "Made a weather app in flutter",
      icon: Image2,
      link: "https://github.com/Shishir3D/WeatherApp"
    },
    {
      name: "Created a game in unity for a hackathon",
      icon: Image3,
      link: "https://www.spaceappschallenge.org/2023/find-a-team/gravity-geeks/?tab=details"
    },
    {
      name: "Consistent in solving DSA problems",
      icon: Image4,
      link: "https://github.com/Shishir3D/leetcode"
    }
  ];

  return (
    <div className="relative flex justify-center items-center min-h-screen text-white p-4"
      style={{ backgroundColor: '#101010' }}>

      {/* Floating Squares (behind content) */}
      {rectangles.map((rect) => (
        <div
          key={rect.id}
          className="absolute bg-gray-500 opacity-50"
          style={{
            width: `${rect.size}px`,
            height: `${rect.size}px`, // Make height equal to width for squares
            top: `${rect.top}%`,
            left: `${rect.left}%`,
            zIndex: 0,  // Ensure squares are behind
            borderRadius: '10px', // Rounded corners
            transition: 'top 0.5s linear, left 0.5s linear', // Smooth movement
          }}
        />
      ))}

      {/* Main Content Div (with zIndex 1) */}
      <div
        className="relative z-10 max-w-[500px] w-full h-[95vh] rounded-lg shadow-lg flex flex-col justify-between p-6"
		style={{
			backgroundColor: '#212121',
			boxShadow: '0 0 5px #FFFFFF', // White shadow with 40px all around
	  }}>
	  <header className="flex justify-between items-center mb-6 pt-[50px]">
          <div>
            <h1 className="text-4xl font-bold">Shishir Poudel</h1>
            <p className="text-gray-400">A frog trying to escape the well. 🐸</p>
          </div>
          <img src={Pfp} alt="Shishir Poudel" className="w-40 h-40 rounded-full" />
        </header>

        <section className="mb-6 flex-grow mt-6">
          <h2 className="text-3xl font-semibold mb-3">Projects</h2>
          <p className="text-gray-400 mb-3">A list of stuff that I made</p>
          <ul className="space-y-2">
            {projects.map((project, index) => (
              <li key={index}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded p-3 transition duration-300"
                  style={{
                    backgroundColor: '#1C1C1C',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={e => (e.target as HTMLElement).style.backgroundColor = '#404040'}
                  onMouseLeave={e => (e.target as HTMLElement).style.backgroundColor = '#1C1C1C'}
                >
                  <img
                    src={project.icon}
                    alt={project.name}
                    className="inline-block mr-2 w-6 h-6"
                  />
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="flex justify-center space-x-4 mt-6 pt-4 border-t border-gray-700">
          <a href="https://x.com/shishir3d" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <Twitter size={24} />
          </a>
          <a href="https://linkedin.com/in/shishir3d" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/shishir3d" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <Github size={24} />
          </a>
        </footer>

        <p className="text-center text-gray-500 text-sm mt-4">
          © 2024 Shishir Poudel. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default App;
