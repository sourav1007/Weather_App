import axios from 'axios';
import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { IoIosPartlySunny } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";

function Weather() {
    const [value, setValue] = useState();
    const [data, setData] = useState(null);
    const [error, setError] = useState(""); // State to store error message

    function search() {
        fetchData(value);
    }

    async function fetchData(value) {
        const access_key = "df62abdd7f5bc4765aea642ce8b846cf";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${access_key}&units=metric`;

        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                setData(response.data);
                setError(""); // Clear any previous error
            }
        } catch (err) {
            console.error(err);
            setError("Enter the correct city"); // Set error message
            setData(null); // Clear weather data
        }
    }

    return (
        <div className='bg-purple-600  w-[100%]  md:w-[70%] md:h-[90%]   lg:w-[30%] md:shadow-xl lg:shadow-black lg:h-[80%] h-[100%] rounded-md p-2'>
            {/* Input Section */}
            <div className='relative w-[90%] m-auto flex items-center p-2'>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='rounded-md outline-none font-semibold px-4 py-3 w-full'
                    type="text"
                    placeholder="Enter city name"
                />
                <BsSearch onClick={search} className='absolute right-4 text-2xl cursor-pointer' />
            </div>

            {/* Error Message */}
            {error && <div ><h1 className='text-white text-2xl text-center font-bold'>Enter a valid city name</h1><img src={`./error.png`} alt="" /></div>}

            {/* Weather Data */}
            {data ? (
                <div>
                    {/* Weather Content */}
                    <div className='flex  justify-center flex-col items-center'>
                        <h1 className='text-xl text-white flex items-center px-3 gap-2 font-bold'>
                            {data.name} <MdLocationPin />
                        </h1>
                        <div className=' w-full  flex items-center justify-center'>
                            <img
                                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                                alt="Weather Icon"
                                className="w-[10rem] md:w-[6rem] text-white"
                            />

                        </div>
                        <h1 className='text-xl text-white font-bold'>{data.weather[0].main}</h1>
                    </div>

                    <div className='flex justify-center flex-col items-center'>
                        <span className='text-white md:text-[4rem] font-semibold text-[6rem]'>
                            {data.main.temp}°C
                        </span>
                    </div>

                    {/* Weather Details */}
                    <div className='p-2 flex flex-col gap-2 items-center'>
                        <div className='bg-purple-400 rounded-md w-full p-3 flex justify-between'>
                            <div>
                                <span className='font-semibold'>Max :</span>
                                <span>{data.main.temp_max}°C</span>
                            </div>
                            <div>
                                <span className='font-semibold'>Min :</span>
                                <span>{data.main.temp_min}°C</span>
                            </div>
                        </div>
                        <div className='bg-purple-400 rounded-md w-full p-3 flex justify-between'>
                            <div>
                                <span className='font-semibold'>Humidity :</span>
                                <span>{data.main.humidity}%</span>
                            </div>
                            <div>
                                <span className='font-semibold'>Wind Speed :</span>
                                <span>{data.wind.speed}m/s</span>
                            </div>
                        </div>
                        <div className='bg-purple-400 rounded-md w-full p-3 flex justify-between'>
                            <div>
                                <span className='font-semibold'>Pressure :</span>
                                <span>{data.main.pressure}pa</span>
                            </div>
                           
                        </div>
                    </div>
                </div>
            ) : <div>

            </div>
                // Empty Divs When No Data

            }
        </div>
    );
}

export default Weather;
