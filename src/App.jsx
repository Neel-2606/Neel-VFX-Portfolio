import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { Volume2, VolumeX, X } from 'lucide-react';

const textData = [
  {
    id: "intro",
    start: 0.01, end: 0.06, align: "left",
    title: "NEEL PRAJAPATI",
    subtitle: "AI & Web Enthusiast",
    badges: ["AI Engineer", "Full Stack", "Innovator"],
    bullets: [
      "Email: neelprajapati2601@gmail.com",
      "Mobile: +91 9638209670",
      "Location: Vadodara, India"
    ],
    links: true
  },
  {
    id: "education",
    start: 0.08, end: 0.12, align: "right",
    title: "EDUCATION",
    subtitle: "MS University of Baroda",
    badges: ["B.E. Computer Science", "CGPA: 8.2", "2024-2028"],
    bullets: [
      "Bachelor of Engineering in Computer Science & Engineering",
      "Expected Graduation: May 2028"
    ]
  },
  {
    id: "skills",
    start: 0.14, end: 0.19, align: "left",
    title: "SKILLS & TECH",
    subtitle: "Core Competencies",
    badges: ["Java", "Python", "React", "AI/ML", "Gen AI"],
    bullets: [
      "Languages: Java, Python, C/C++, JavaScript, HTML5, CSS3",
      "Tools: Git, GitHub, Cloud AI Tools",
      "AI/ML: Machine Learning, Generative AI, Data Analysis",
      "Soft Skills: Leadership, Collaboration, Project Management"
    ]
  },
  {
    id: "nasa",
    start: 0.21, end: 0.25, align: "right",
    title: "NASA SPACE APPS",
    subtitle: "Winner 2025",
    badges: ["CityFage", "AI Data Analytics"],
    bullets: [
      "Built 'Mumbai Pulse', an AI-powered system analyzing NASA datasets to monitor air quality, heat, and environmental risks."
    ]
  },
  {
    id: "ingenius",
    start: 0.27, end: 0.31, align: "left",
    title: "INGENIUS 7.0",
    subtitle: "1st Runner Up",
    badges: ["Ahmedabad University", "Hackathon"],
    bullets: [
      "Ranked 2nd among 180+ teams for building the Urban Intel AI smart city governance system."
    ]
  },
  {
    id: "dotslash",
    start: 0.33, end: 0.37, align: "right",
    title: "DOTSLASH 9.0",
    subtitle: "Finalist",
    badges: ["Hackathon", "SVNIT Surat"],
    bullets: [
      "Participated and secured finalist position in Dotslash 9.0 at SVNIT Surat."
    ]
  },
  {
    id: "ibm",
    start: 0.39, end: 0.43, align: "left",
    title: "IBM AI CHALLENGE",
    subtitle: "2nd Rank - Gujarat",
    badges: ["AI Innovation", "Agriculture"],
    bullets: [
      "Secured 2nd position across Gujarat among shortlisted teams.",
      "Presented an AI solution focused on strengthening India's agricultural ecosystem."
    ]
  },
  {
    id: "hackovate",
    start: 0.45, end: 0.49, align: "right",
    title: "HACKOVATE",
    subtitle: "Finalist",
    badges: ["ML Pipeline", "IoT Data"],
    bullets: [
      "Built an ML pipeline predicting cow milk yield and health anomalies using sensor and historical data."
    ]
  },
  {
    id: "isro",
    start: 0.51, end: 0.55, align: "left",
    title: "ISRO SPACETECH",
    subtitle: "Geospatial Intelligence",
    badges: ["Satellite Data", "Innovation"],
    bullets: [
      "Developed satellite-data based geospatial solutions under national-level ISRO initiative."
    ]
  },
  {
    id: "gcp",
    start: 0.57, end: 0.61, align: "right",
    title: "GOOGLE PROGRAMS",
    subtitle: "Gen AI & Prototyping",
    badges: ["Diamond League", "Scaler", "Cloud AI"],
    bullets: [
      "Google Cloud Career Launchpad: Selected as a Diamond League contestant gaining hands-on experience with cloud-based AI tools.",
      "Prompt to Prototype (Scaler): Training focused on rapid AI product prototyping using modern generative AI workflows."
    ]
  },
  {
    id: "neuralize",
    start: 0.63, end: 0.67, align: "left",
    title: "NEURALIZE AI/ML",
    subtitle: "Core Team Member",
    badges: ["Leadership", "Community"],
    bullets: [
      "Active member of MSU's AI/ML club contributing to organizing workshops, hackathons, and AI learning initiatives."
    ]
  },
  {
    id: "codevimarsh",
    start: 0.69, end: 0.73, align: "right",
    title: "CODE VIMARSH",
    subtitle: "Web Team Member",
    badges: ["Web Dev", "Management"],
    bullets: [
      "Contributed to development and management of club web projects and technical initiatives."
    ]
  },
  {
    id: "agriforge",
    start: 0.75, end: 0.81, align: "left",
    title: "AGRIFORGE AI",
    subtitle: "KrishiMitra AI Pilot Stage",
    badges: ["Python", "EfficientNet", "SSIP Funded"],
    bullets: [
      "Developed an AI-powered platform providing 24x7 support to farmers in 10+ Indian languages through voice and text.",
      "Integrated AI models including EfficientNet for crop disease detection.",
      "Awarded Rs. 2.43 Lakh SSIP (Student Startup and Innovation Policy - Govt. of Gujarat) research funding."
    ]
  },
  {
    id: "urbanintel",
    start: 0.83, end: 0.88, align: "right",
    title: "URBAN INTEL AI",
    subtitle: "Smart City Governance Platform",
    badges: ["Hybrid AI", "TinyLlama LLM", "Random Forest"],
    bullets: [
      "Built a Hybrid AI system using 6 Random Forest models to predict urban risks such as traffic congestion, water scarcity, and health hazards.",
      "Integrated a private TinyLlama LLM to generate real-time policy recommendations while maintaining data sovereignty."
    ]
  },
  {
    id: "eunoia",
    start: 0.90, end: 0.94, align: "left",
    title: "EUNOIA HOMOEOPATHY",
    subtitle: "Client Project",
    badges: ["Web Dev", "UI/UX", "Deployment"],
    bullets: [
      "Developed and deployed a live client website for a homoeopathy clinic.",
      "Handled UI/UX design, domain setup, hosting, and deployment."
    ]
  },
  {
    id: "final",
    start: 0.95, end: 0.99, align: "center",
    title: "LET'S BUILD THE FUTURE",
    subtitle: "Open to Opportunities",
    badges: ["Hire Me", "Collaborate", "Connect"],
    bullets: [
      "I am actively looking for internships, freelance projects, and collaborations."
    ],
    links: true
  }
];

const lerp = (start, end, factor) => start + (end - start) * factor;

const bootSequence = [
  { threshold: 0, text: "BIOS Date 10/24/2026 15:43:21 Ver 1.00" },
  { threshold: 10, text: "CPU: Neural Processing Unit Gen 4... OK" },
  { threshold: 20, text: "Memory Test: 64GB... OK" },
  { threshold: 30, text: "Initializing Random Forest Ensembles..." },
  { threshold: 40, text: "Loading TinyLlama LLM parameters..." },
  { threshold: 50, text: "Mounting AgriForge AI module..." },
  { threshold: 60, text: "Establishing secure connection to Urban Intel..." },
  { threshold: 70, text: "Fetching NASA Space Apps datasets..." },
  { threshold: 80, text: "Compiling glassmorphism UI shaders..." },
  { threshold: 90, text: "Waking the Dragon..." },
  { threshold: 100, text: "SYSTEM ONLINE. ENTERING 3D WORLD." }
];

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [muted, setMuted] = useState(true);
  const [activeSection, setActiveSection] = useState("intro");
  const [activeModal, setActiveModal] = useState(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    if (lenisRef.current) {
      if (activeModal) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [activeModal]);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('button') || target.closest('a') || target.classList.contains('quest-node')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const textRefs = useRef([]);
  const lenisRef = useRef(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const reqAnimFrameRef = useRef(null);
  const progressRef = useRef(null);
  
  const framesRef = useRef([]);
  const TOTAL_FRAMES = 800; // Extracted via python script

  // Preload frames into memory
  useEffect(() => {
    let loaded = 0;
    const frames = [];

    const loadFrame = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        const paddedIndex = String(index).padStart(4, '0');
        img.src = `/frames/frame_${paddedIndex}.webp`;
        img.onload = () => {
          loaded++;
          setLoadingProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
          frames[index] = img;
          resolve();
        };
        img.onerror = () => {
          // If a frame fails, just skip it to keep going
          loaded++;
          setLoadingProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
          resolve();
        };
      });
    };

    const loadAllFrames = async () => {
      // Load in chunks to not overwhelm the browser's network queue
      const chunkSize = 20;
      for (let i = 0; i < TOTAL_FRAMES; i += chunkSize) {
        const promises = [];
        for (let j = 0; j < chunkSize && i + j < TOTAL_FRAMES; j++) {
          promises.push(loadFrame(i + j));
        }
        await Promise.all(promises);
      }
      
      framesRef.current = frames;
      setLoading(false);
    };

    loadAllFrames();
  }, []);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.2,
      smoothTouch: true,
      touchMultiplier: 2.0,
    });
    lenisRef.current = lenis;

    const updateTextOverlay = (progress) => {
      // Choose the section whose center is nearest to the displayed progress
      let closestIndex = 0;
      let minDist = Infinity;

      textData.forEach((data, index) => {
        const center = (data.start + data.end) / 2;
        const dist = Math.abs(progress - center);
        if (dist < minDist) {
          minDist = dist;
          closestIndex = index;
        }
      });

      const fadeWindow = 0.015;

      // For each text block, compute a smooth opacity/transform based on strict start/end bounds
      textData.forEach((data, index) => {
        const el = textRefs.current[index];
        if (!el) return;

        let opacity = 0;
        let scale = 0.95;
        let translateY = 30 * (index % 2 === 0 ? 1 : -1);

        if (progress >= data.start - fadeWindow && progress <= data.end + fadeWindow) {
          if (progress < data.start) {
            // fading in before start
            const p = (progress - (data.start - fadeWindow)) / fadeWindow;
            opacity = p;
            scale = 0.95 + 0.05 * p;
            translateY = 30 * (1 - p) * (index % 2 === 0 ? 1 : -1);
          } else if (progress > data.end) {
            // fading out after end
            const p = ((data.end + fadeWindow) - progress) / fadeWindow;
            opacity = p;
            scale = 0.95 + 0.05 * p;
            translateY = 30 * (1 - p) * (index % 2 === 0 ? 1 : -1);
          } else {
            // fully visible and stable inside the [start, end] window
            opacity = 1;
            scale = 1;
            translateY = 0;
          }
        }

        el.style.opacity = opacity;
        el.style.transform = `translateY(${translateY}px) scale(${scale})`;
        // Only allow clicking when mostly visible to prevent accidental clicks on fading elements
        el.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
      });

      const newActiveId = textData[closestIndex]?.id || 'intro';
      setActiveSection((previous) => (previous === newActiveId ? previous : newActiveId));
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      
      // Calculate target frame
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    lenis.on('scroll', onScroll);

    const renderCanvas = () => {
      // Lerp frame
      currentFrameRef.current = lerp(currentFrameRef.current, targetFrameRef.current, 0.08);
      
      const exactFrame = currentFrameRef.current;
      const frameIndex = Math.floor(exactFrame);
      const nextFrameIndex = Math.min(frameIndex + 1, TOTAL_FRAMES - 1);
      const fraction = exactFrame - frameIndex;
      
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      
      if (ctx && framesRef.current[frameIndex]) {
        // Draw the image filling the canvas (object-fit: cover equivalent)
        const img = framesRef.current[frameIndex];
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw base frame
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
      
      if (progressRef.current) {
        const prog = (currentFrameRef.current / (TOTAL_FRAMES - 1)) * 100;
        progressRef.current.style.height = `${prog}%`;
      }

      updateTextOverlay(currentFrameRef.current / (TOTAL_FRAMES - 1));
      
      lenis.raf(performance.now());
      reqAnimFrameRef.current = requestAnimationFrame(renderCanvas);
    };
    
    reqAnimFrameRef.current = requestAnimationFrame(renderCanvas);

    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Init size

    return () => {
      lenis.destroy();
      if (reqAnimFrameRef.current) cancelAnimationFrame(reqAnimFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [loading]);

  const toggleMute = () => {
    setMuted(!muted);
    if (audioRef.current) {
      if (muted) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  };

  const scrollToSection = (startProgress) => {
      if (lenisRef.current) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        // Scroll exactly to the middle of the section's visible window
        lenisRef.current.scrollTo(maxScroll * (startProgress + 0.025), { duration: 2.0 });
      }
    };

  return (
    <>
      <div className={`loading-screen ${!loading ? 'hidden' : ''}`}>
        <div className="terminal-boot">
          {bootSequence.filter(log => loadingProgress >= log.threshold).map((log, i) => (
            <div key={i} className="terminal-line">&gt; {log.text}</div>
          ))}
          <div className="terminal-progress">
             [{'█'.repeat(Math.floor(loadingProgress / 5))}{' '.repeat(20 - Math.floor(loadingProgress / 5))}] {loadingProgress}%
          </div>
        </div>
      </div>

      {/* Persistent Navbar */}
      <nav className="persistent-nav">
        <a href="#" className="nav-brand" onClick={(e) => { e.preventDefault(); scrollToSection(0); }}>NEEL.</a>
        <div className="nav-links">
          <a href="https://github.com/Neel-2606" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
          <a href="https://www.linkedin.com/in/neel-prajapati" target="_blank" rel="noopener noreferrer" className="nav-link">LinkedIn</a>
          <a href="https://neelprajapatiportfolio.work" target="_blank" rel="noopener noreferrer" className="nav-link">Portfolio</a>
        </div>
      </nav>

      {/* Quest Log Navigation */}
      <div className="quest-log">
        {textData.map((data) => (
          <div 
            key={data.id} 
            className={`quest-node ${activeSection === data.id ? 'active' : ''}`}
            onClick={() => scrollToSection(data.start)}
          >
            <div className="quest-label">{data.title}</div>
          </div>
        ))}
      </div>

      {/* Streaming background audio */}
      <audio 
        ref={audioRef} 
        src="/dragon.mp4" 
        loop 
        muted={muted} 
        style={{ display: 'none' }}
      />

      <button className="audio-control" onClick={toggleMute} aria-label="Toggle Audio">
        {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* HTML5 Canvas instead of heavy video element */}
      <div className="video-container">
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="overlay overlay-gradient" />
      <div className="overlay overlay-vignette" />
      <div className="overlay overlay-grain" />

      <div className="scroll-container" />

      {/* Custom Cursor */}
      <div 
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{ left: mousePosition.x, top: mousePosition.y }}
      />
      <div 
        className={`custom-cursor-follower ${isHovering ? 'hover' : ''}`}
        style={{ left: mousePosition.x, top: mousePosition.y }}
      />

      {/* Scroll Timeline */}
      <div className="scroll-timeline-container">
        <div className="scroll-timeline-bar" ref={progressRef} />
      </div>

      <div className="text-layer">
        {textData.map((data, index) => (
          <div 
            key={data.id}
            ref={el => textRefs.current[index] = el}
            className={`text-block lower-third ${data.align}`}
          >
            <h1 className="text-title typing-effect">{data.title}</h1>
            <button 
              className="read-more-btn"
              onClick={() => setActiveModal(data)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)} aria-label="Close modal">
              <X size={24} />
            </button>
            <div className="modal-body">
              <h2 className="modal-title">{activeModal.title}</h2>
              {activeModal.subtitle && <h3 className="modal-subtitle">{activeModal.subtitle}</h3>}
              
              {activeModal.badges && (
                <div className="modal-badges">
                  {activeModal.badges.map((badge, i) => (
                    <span key={i} className="badge">{badge}</span>
                  ))}
                </div>
              )}
              
              {activeModal.bullets && (
                <ul className="modal-bullets">
                  {activeModal.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
              
              {activeModal.links && (
                <div className="links-container modal-links">
                  <a href="https://github.com/Neel-2606" target="_blank" rel="noopener noreferrer" className="link-item">GitHub</a>
                  <a href="https://www.linkedin.com/in/neel-prajapati" target="_blank" rel="noopener noreferrer" className="link-item">LinkedIn</a>
                  <a href="https://neelprajapatiportfolio.work" target="_blank" rel="noopener noreferrer" className="link-item">Portfolio</a>
                  <a href="mailto:neelprajapati2601@gmail.com" className="link-item">Email</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
