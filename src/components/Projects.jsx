function Projects() {
  const projectList = [
    {
      id: 1,
      title: "AI-Powered Document Intelligence Platform",
      description: "An advanced web platform that integrates neural language models to read, analyze, and format complex PDF documents dynamically with real-time text refactoring.",
      tags: ["React", "Express", "Python", "PyTorch"],
      link: "https://github.com/parth/ai-doc-intel",
    },
    {
      id: 2,
      title: "Interactive Space Mission Tracker",
      description: "A highly dynamic real-time telemetry visualizer for satellite launches, tracking orbit altitude, speed, and fuel status using high-fidelity rendering.",
      tags: ["Next.js", "Three.js", "WebSocket", "CSS Grid"],
      link: "https://github.com/parth/orbit-tracker",
    },
    {
      id: 3,
      title: "Smart Crop Disease Classifier",
      description: "An edge-computing AI application using lightweight convolutional neural networks (CNNs) to classify crop health conditions directly via mobile camera streams.",
      tags: ["React Native", "TensorFlow Lite", "FastAPI"],
      link: "https://github.com/parth/crop-classifier",
    }
  ];

  return (
    <section className="projects-container">
      <div className="projects-header">
        <h1>Featured Projects</h1>
        <p>A collection of some of the personal research and development projects I've built recently.</p>
      </div>
      <div className="projects-grid">
        {projectList.map((project) => (
          <div key={project.id} className="project-card glass-panel">
            <h3>{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link-btn"
            >
              View Repository →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
