import { useCallback, useRef } from "react";
import 'animate.css'
import { useNavigate } from "react-router-dom";
import styles from "./Approach.module.css"

const Approach = () => {

  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    videoRef.current.pause();

    videoRef.current.classList.add(styles.fadeOut);
  };
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

  return (
    <div className="relative bg-white w-full min-h-screen overflow-hidden text-center text-[0.7rem] lg:text-[1.7rem] text-black font-source-sans-pro">
      <div>
      <video ref={videoRef} id="videoElement" className="absolute top-0 left-0 w-full h-full object-cover" autoPlay looponEnded={handleVideoEnd}>
          <source src="BlenderHyperspaceJump.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <nav style={{
        zIndex: 2,
        background: 'rgba(255, 255, 255, 0.4)'
      }} className="absolute top-0 bg-gray w-full overflow-hidden p-2 lg:p-[2rem] flex flex-wrap justify-around items-center">
      
        <div className="flex-shrink-0 space-x-[0.3rem] lg:space-x-[1.5rem]">
          <span onClick={onHomeTextClick} className="cursor-pointer">Home</span>
          <span onClick={onApproachTextClick} className="cursor-pointer">Approach</span>
          <span onClick={onSimulationTextClick} className="cursor-pointer">Simulation</span>
        </div>
      </nav>
      
    </div>
  );
};

export default Approach;
