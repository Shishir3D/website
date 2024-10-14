import { Github, Linkedin, Twitter } from 'lucide-react';
import Pfp from './assets/pfp.jpeg';

const App = () => {
  const projects = [
    {
      name: "Built a smart plant Irrigation System using ESP32",
      icon: "🌱",
      link: "https://github.com/Shishir3D/RoboticsCW"
    },
    {
      name: "Made a weather app in flutter",
      icon: "🌤️",
      link: "https://github.com/Shishir3D/WeatherApp"
    },
    {
      name: "Created a game in unity for a hackathon",
      icon: "🎮",
      link: "https://www.spaceappschallenge.org/2023/find-a-team/gravity-geeks/?tab=details"
    },
    {
      name: "Consistent in solving DSA problems",
      icon: "</>",
      link: "https://github.com/Shishir3D/leetcode"
    }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen text-white p-4"
    style={{ backgroundColor: '#101010' }}>
      <div
        className="max-w-[500px] w-full h-[95vh] rounded-lg shadow-lg flex flex-col justify-between p-6"
        style={{ backgroundColor: '#212121' }}>
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
                  <span className="mr-2">{project.icon}</span>
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
