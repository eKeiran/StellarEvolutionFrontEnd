import { useCallback, useState, useRef } from "react";
import styles from './LandingPage1.module.css'
import { useNavigate } from "react-router-dom";
const LandingPage1 = () => {
  const navigate = useNavigate();

  const onHomeTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onApproachTextClick = useCallback(() => {
    navigate("/Approach");
  }, [navigate]);


  const onSimulationTextClick = useCallback(() => {
    navigate("/Simulation");
  }, [navigate]);

  const [showIntro, setShowIntro] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [showRocket, setShowRocket] = useState(false);
  const [showText, setShowText] = useState(false);
  const videoRef = useRef();

  // Function to handle the video end event and pause the video
  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  const onLetsStartTextClick = useCallback(() => {
    console.log("Let's start button clicked!")
    setShowIntro(false);
    setTimeout(() => {
      setShowRocket(true);
    }, 300);

    setTimeout(() => {
      setShowText(true);
    }, 2300);

    setTimeout(() => {
      navigate("/Approach");
    }, 14800);
  }, [navigate]);

  return (
    <div className="relative bg-white w-full min-h-screen overflow-hidden text-center text-[0.7rem] lg:text-[1.7rem] text-black font-source-sans-pro">
      <div>
        <video id="videoElement" className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop>
          <source src="NGC2014&NGC2020.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {showIntro && (<>
        <div className="absolute top-[25rem] left-[10rem] lg:left-[6rem] sm:text-center lg:text-left text-[1rem] lg:text-[3rem] font-inter">
          <div className="mb-8 lg:mb-4  text-[3rem] md:text-6x1 lg:text-[10.5rem] text-white font-stars">
            STELLAR EVOLUTION
          </div>

          <div className="absolute sm:top-[15rem] lg:top-[15rem] left-[5rem] lg:left-[50rem] text-left text-[1rem] lg:text-[3rem] font-inter">

            <div
              style={{ filter: 'drop-shadow(0 0 20px white)' }}
              className="rounded-full lg:text-[2rem] w-auto h-auto bg-white p-2 lg:p-[2rem] cursor-pointer"
              onClick={onLetsStartTextClick}
            >

              <b className="tracking-wider lg:tracking-[0.04em] font-milky-way">Big Bang!</b>
            </div>
          </div>
        </div>
      </>
      )}
      {showRocket && (
        <>
          <img
            style={{
              width: '100vw',
              height: '120vh',
              position: 'absolute',
              zIndex: 1,
            }}
            className={`absolute ${showRocket ? styles.asteroidAnimation : ''}`}
            alt="Rocket And Asteroids"
            src="/asteroids.png"
          />
          <div className={`absolute ${showRocket ? styles.rocketContainer : ''}`}>
            <img
              className={`absolute ${showRocket ? styles.rocketAnimation : ''}`}
              alt="Rocket And Asteroids"
              src="/satellite2.png"
            />
          </div>
        </>
      )}/

      {showText && (
        <div className={`absolute ${showText ? styles.textAnimation : ''}`}>
          <span>Stellar evolution is the sequence of changes in a star's temperature, luminosity, and size as it progresses through life stages, influenced by gravitational collapse, nuclear fusion and delicate balance of all forces. </span>
        </div>
      )}

    </div>
  );
};

export default LandingPage1;