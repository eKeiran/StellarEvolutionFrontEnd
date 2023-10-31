import { useCallback } from "react";
import 'animate.css'
import { useNavigate } from "react-router-dom";
import WOW from 'wowjs';


const About = () => {
  const navigate = useNavigate(); 

  const onHomeTextClick = useCallback(() => {
    navigate("/"); // Navigate to "LandingPage1"
  }, [navigate]);

  const onAboutTextClick = useCallback(() => {
    navigate("/About");
  }, [navigate]);

  const onEventsTextClick = useCallback(() => {

  }, []);

  return (
    <div className="relative bg-white w-full min-h-screen text-center text-[0.7rem] lg:text-[1.7rem] text-black font-source-sans-pro">
     
      <nav style={{
        zIndex: 2,
        background: 'rgba(255, 255, 255, 0.4)'
      }} className="absolute top-0 bg-gray w-full overflow-hidden p-2 lg:p-[2rem] flex flex-wrap justify-around items-center">
        <img
          className="w-20 h-auto lg:w-[11.69rem] lg:h-[6.75rem]"
          alt="Logo"
          src="/logo-3-1@2x.png"
        />
        <div className="flex-shrink-0 space-x-[0.3rem] lg:space-x-[1.5rem]">
          <span onClick={onHomeTextClick} className="cursor-pointer">Home</span>
          <span onClick={onAboutTextClick} className="cursor-pointer">About</span>
          <span>Team</span>
          <span onClick={onEventsTextClick} className="cursor-pointer">Events</span>
          <span>Contact</span>
        </div>
        <img
          className="flex-shrink-0 w-20 h-auto lg:w-[11.75rem] lg:h-[6.31rem]"
          alt="Another Image"
          src="/image-7@2x.png"
        />
      </nav>
      <img  style={{
              width: '100vw',  //full screen
              position: 'absolute', 
              zIndex: 1,
            }}
        className="animate__animated animate__fadeInDown absolute top-[11rem] left-0 object-contain"
        alt="mascot"
        src="/headeraboutpage.png"
      />
      <img style={{
              zIndex: 2,
            }}
        className="animate__animated animate__fadeInLeft absolute top-[30rem] left-[10rem]"
        alt="mascot"
        src="/aboutimg1.png"
      />
      <img
        className="animate__animated animate__fadeInRight absolute top-[30rem] left-[45rem]"
        alt="Text"
        src="/textabout.png"
      />
      <img
        className="animate__animated animate__fadeInUp absolute top-[30rem] left-[-35rem]"
        alt="Text"
        src="/aboutshapes1.png"
      />
       <img  style={{
              width: '100vw',  
              position: 'absolute', 
              zIndex: 1,
            }}
        className="wow animate__animated animate__fadeInDown absolute top-[61rem] left-0 object-contain"
        alt="mascot"
        src="/headeraboutpage2.png"
      />
      <img style={{
             
              zIndex: 2,
            }}
        className="wow animate__animated animate__fadeInLeft absolute top-[80rem] left-[7rem]"
        alt="mascot"
        src="/aboutimg2.png"
      />
      <img
        className="wow animate__animated animate__fadeInRight absolute top-[85rem] left-[45rem]"
        alt="Text"
        src="/textabout2.png"
      />
      <img
        className="wow animate__animated animate__fadeInUp absolute top-[70rem] left-[-20rem]"
        alt="Text"
        src="/aboutshapes2.png"
      />

    </div>
  );
};

export default About;
