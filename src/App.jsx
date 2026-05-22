import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { Volume2, VolumeX, X } from 'lucide-react';

const textData = [
  {
    id: "intro",
    start: 0.01, end: 0.06, align: "center",
    title: "NEEL PRAJAPATI",
    subtitle: "AI Engineer",
    detail: "Full Stack Developer\nInnovator"
  },
  {
    id: "education",
    start: 0.08, end: 0.12, align: "left",
    title: "EDUCATION",
    subtitle: "MS University Baroda",
    detail: "B.E Computer Science Engineering\n2023 — 2027\nCGPA 8+"
  },
  {
    id: "skills",
    start: 0.14, end: 0.19, align: "right",
    title: "SKILLS & TECHNOLOGIES",
    subtitle: "Core Stack",
    detail: "Python • Java • JavaScript • React • Node.js\nMongoDB • AI/ML • Generative AI • Cloud AI"
  },
  {
    id: "nasa",
    start: 0.21, end: 0.25, align: "left",
    title: "NASA SPACE APPS CHALLENGE",
    subtitle: "Winner",
    detail: "Mumbai Pulse\nEnvironmental Intelligence"
  },
  {
    id: "ingenius",
    start: 0.27, end: 0.31, align: "right",
    title: "INGENIUS 7.0",
    subtitle: "1st Runner Up",
    detail: ""
  },
  {
    id: "dotslash",
    start: 0.33, end: 0.37, align: "left",
    title: "DOTSLASH 9.0",
    subtitle: "Finalist",
    detail: "SVNIT Surat"
  },
  {
    id: "ibm",
    start: 0.39, end: 0.43, align: "right",
    title: "IBM",
    subtitle: "AI Innovation Challenge",
    detail: "AI Systems\nMachine Learning"
  },
  {
    id: "hackovate",
    start: 0.45, end: 0.49, align: "left",
    title: "HACKOVATE",
    subtitle: "AI Innovation",
    detail: "Smart Agriculture"
  },
  {
    id: "isro",
    start: 0.51, end: 0.55, align: "right",
    title: "ISRO SPACETECH",
    subtitle: "Geospatial Intelligence",
    detail: ""
  },
  {
    id: "gcp",
    start: 0.57, end: 0.61, align: "left",
    title: "GOOGLE CLOUD",
    subtitle: "Career Launchpad",
    detail: ""
  },
  {
    id: "neuralize",
    start: 0.63, end: 0.67, align: "right",
    title: "NEURALIZE AI/ML CLUB",
    subtitle: "Leadership",
    detail: "Community"
  },
  {
    id: "codevimarsh",
    start: 0.69, end: 0.73, align: "left",
    title: "CODE VIMARSH",
    subtitle: "Coding Ecosystem",
    detail: ""
  },
  {
    id: "agriforge",
    start: 0.75, end: 0.81, align: "right",
    title: "AGRIFORGE",
    subtitle: "AI Agriculture Ecosystem",
    detail: "SSIP Government Funded\n10+ Regional Languages\nCrop Disease Detection"
  },
  {
    id: "urban",
    start: 0.83, end: 0.88, align: "left",
    title: "URBAN INTEL AI",
    subtitle: "Hybrid LLM Architecture",
    detail: "Smart City Intelligence"
  },
  {
    id: "eunoia",
    start: 0.90, end: 0.94, align: "right",
    title: "EUNOIA HOMOEOPATHY",
    subtitle: "Digital Presence",
    detail: "Healing Experience"
  },
  {
    id: "final",
    start: 0.95, end: 0.99, align: "center",
    title: "THE JOURNEY CONTINUES",
    subtitle: "Neel Prajapati",
    detail: "AI Engineer • Builder • Innovator",
    links: true
  }
];

const lerp = (start, end, factor) => start + (end - start) * factor;

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [muted, setMuted] = useState(true);
  const [activeSection, setActiveSection] = useState("intro");
  const [activeModal, setActiveModal] = useState(null);
  
  useEffect(() => {
    if (lenisRef.current) {
      if (activeModal) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [activeModal]);
  
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const textRefs = useRef([]);
  const lenisRef = useRef(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const reqAnimFrameRef = useRef(null);
  
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

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      
      // Calculate target frame
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
      
      // Determine active section for quest log
      let currentActive = "intro";
      
      textData.forEach((data, index) => {
        const el = textRefs.current[index];
        if (!el) return;
        
        const fadeWindow = 0.015;
        let opacity = 0;
        let scale = 0.95;
        let translateY = 30;
        
        if (progress >= data.start && progress <= data.end) {
          opacity = 1;
          scale = 1;
          translateY = 0;
          
          if (progress < data.start + fadeWindow) {
            const p = (progress - data.start) / fadeWindow;
            opacity = p;
            scale = 0.95 + 0.05 * p;
            translateY = 30 * (1 - p);
          } else if (progress > data.end - fadeWindow) {
            const p = (data.end - progress) / fadeWindow;
            opacity = p;
            scale = 1 + 0.05 * (1 - p);
            translateY = -30 * (1 - p);
          }
        }
        
        el.style.opacity = opacity;
        el.style.transform = `translateY(${translateY}px) scale(${scale})`;
        el.style.pointerEvents = opacity > 0.1 ? 'auto' : 'none';
        
        if (progress >= data.start && progress <= data.end) {
          currentActive = data.id;
        }
      });
      
      setActiveSection(currentActive);
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
        <div className="loading-text">Initializing 3D World...</div>
        <div style={{marginTop: '1rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Space Grotesk', fontSize: '1.2rem'}}>
          {loadingProgress}% Buffered
        </div>
      </div>

      {/* Persistent Navbar */}
      <nav className="persistent-nav">
        <a href="#" className="nav-brand" onClick={(e) => { e.preventDefault(); scrollToSection(0); }}>NEEL.</a>
        <div className="nav-links">
          <a href="https://github.com/Neel-2606" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
          <a href="https://www.linkedin.com/in/neel-prajapati-ai" target="_blank" rel="noopener noreferrer" className="nav-link">LinkedIn</a>
          <a href="#" className="nav-link">Resume</a>
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

      <div className="text-layer">
        {textData.map((data, index) => (
          <div 
            key={data.id}
            ref={el => textRefs.current[index] = el}
            className={`text-block ${data.align}`}
          >
            <h1 className="text-title">{data.title}</h1>
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
              
              {activeModal.detail && (
                <div className="modal-detail">
                  {activeModal.detail.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              )}
              
              {activeModal.links && (
                <div className="links-container modal-links">
                  <a href="https://github.com/Neel-2606" target="_blank" rel="noopener noreferrer" className="link-item">GitHub</a>
                  <a href="https://www.linkedin.com/in/neel-prajapati-ai" target="_blank" rel="noopener noreferrer" className="link-item">LinkedIn</a>
                  <a href="mailto:contact@neelprajapati.com" className="link-item">Contact</a>
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
