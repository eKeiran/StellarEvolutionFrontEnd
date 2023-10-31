import React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Simulation = () => {
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

    const [bv, setBV] = useState('');
    const [plx, setPlx] = useState('');
    const [vmag, setVmag] = useState('');
    const [spType, setSpType] = useState('');
    const [predictions, setPredictions] = useState(null);
    const [csrfToken, setCSRFToken] = useState(''); // Initialize the CSRF token state
    const backendURL = 'http://localhost:8000';

    // Function to get CSRF token
    const getCSRFToken = async () => {
        try {
            const response = await axios.get(`${backendURL}/get_csrf_token/`, { withCredentials: true });
            return response.data.csrf_token;
        } catch (error) {
            console.error('Error getting CSRF token:', error);
            return null;
        }
    };

    useEffect(() => {
        async function fetchCSRFToken() {
            const token = await getCSRFToken();
            if (token) {
                console.log('CSRF Token:', token);
                setCSRFToken(token); // Set the CSRF token in the state
            }
        }
        fetchCSRFToken();
    }, []);

    const submitForm = async (event) => {
        event.preventDefault();

        const data = {
            bv,
            plx,
            vmag,
            spType,
        };
        const jsonData = JSON.stringify(data);

        const headers = {
            'X-CSRFToken': csrfToken, // Use the CSRF token obtained in your AJAX call
        };
        try {
            const response = await axios.post(`${backendURL}/predict/`, jsonData);
            setPredictions(response.data);
            console.log("REPSONSE MFFF", response.data)
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div
            style={{
                position: "relative",
                backgroundImage: 'url("/wallpaper.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
            className="relative bg-white w-full overflow-hidden text-center text-[0.7rem] lg:text-[1.7rem] text-white font-source-sans-pro"
        >
            <nav style={{
                zIndex: 2,
                background: 'rgba(255, 255, 255, 0.4)'
            }} className="absolute top-0 bg-gray w-full overflow-hidden p-2 lg:p-[0.5rem] flex flex-wrap justify-around items-center">

                <div className="flex-shrink-0 space-x-[0.3rem] lg:space-x-[1.5rem]">
                    <span onClick={onHomeTextClick} className="cursor-pointer">Home</span>
                    <span onClick={onApproachTextClick} className="cursor-pointer">Approach</span>
                    <span onClick={onSimulationTextClick} className="cursor-pointer">Simulation</span>
                </div>
            </nav>
            <div className="text-center mt-20 px-4">
                <h2 className="text-xl font-stars">Input your stellar data!</h2>
                <p className="text-sm mt-1 font-milky-way font-bold">
                    Our AI will estimate mass and simulate evolution for the star data you entered.
                    <br /><br />
                    <a href="https://vizier.cds.unistra.fr/cgi-bin/VizieR?-source=I/239/hip_main" className="text-blue-500 underline">Explore Gaia or Hipparcos catalogs</a>
                </p>
            </div>
            <form onSubmit={submitForm} className="mt-10 mx-auto w-1/3 p-8" style={{ border: "5px dotted white", backgroundColor: "rgba(0, 0, 0, 0.6)", justifyContent: "center", alignItems: "center", textAlign: "center", display: "flex", flexDirection: "column" }}>
                <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />

                <div className="mb-10 flex items-center">
                    <label htmlFor="bv" className="block text-sm font-medium text-gray-700">B-V index:</label>
                    <input type="text" id="bv" name="bv" value={bv}
                        onChange={(e) => setBV(e.target.value)} className="p-2 border border-gray-300 rounded w-20 ml-[6rem]" style={{ color: 'white', fontSize: 20 }} />
                </div>


                <div className="mb-10 flex items-center">
                    <label htmlFor="plx" className="block text-sm font-medium text-gray-700">Parallax (Plx):</label>
                    <input type="text" id="plx" value={plx}
                        onChange={(e) => setPlx(e.target.value)} name="plx" className="p-2 border border-gray-300 rounded w-20 ml-[3.4rem]" style={{ color: 'white', fontSize: 20 }} />
                </div>

                <div className="mb-10 flex items-center">
                    <label htmlFor="vmag" className="block text-sm font-medium text-gray-700">Visual Magnitude:</label>
                    <input type="text" id="vmag" value={vmag}
                        onChange={(e) => setVmag(e.target.value)} name="vmag" className="p-2 border border-gray-300 rounded w-20 ml-2" style={{ color: 'white', fontSize: 20 }} />
                </div>

                <div className="mb-4 flex items-center">
                    <label htmlFor="spType" className="block text-sm font-medium text-gray-700">Spectral Type:</label>
                    <input type="text" value={spType}
                        onChange={(e) => setSpType(e.target.value)} id="spType" name="spType" className="p-2 border border-gray-300 rounded w-20 ml-[3rem]" style={{ color: 'white', fontSize: 20 }} />
                </div>

                <div className="mt-10 flex justify-center items-center">
                    <button type="submit" className="bg-green-500 text-white font-milky-way font-bold text-[1.5rem] py-2 px-8 rounded">Submit</button>
                </div>
            </form>
            {/* Display predictions */}
            {predictions && (
                <div>
                    <h3>Predictions:</h3>
                    <h4 style={{ border: "8px double blue"}} class="mt-[-3rem] bg-gray border border-10 border-green-500 text-black rounded-lg p-3 shadow-2x1 inline-block">{predictions.mass_range}</h4>
                    <div class="mt-[-0.5rem]">
                        <button style={{ border: "4px dotted white"}} class="bg-blue-500 border text-white font-milky-way font-bold text-[2.2rem] py-2 px-10 rounded-[3rem]">EVOLVE!</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Simulation;
