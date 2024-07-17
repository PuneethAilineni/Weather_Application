import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [hourlyData, setHourlyData] = useState([]);
    const [place, setPlace] = useState('Hyderabad');
    const [thisLocation, setLocation] = useState('');

    // fetch api
    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}`,
            params: {
                unitGroup: 'us',
                key: 'V9YXH5AESX5KCMA46XXG42MD8',
            },
        };

        try {
            const response = await axios.request(options);
            const thisData = response.data;
            setLocation(thisData.resolvedAddress);
            setValues(thisData.days);
            setWeather(thisData.days[0]);
            setHourlyData(thisData.days[0].hours); 
        } catch (e) {
            console.error(e);
            alert('This place does not exist or API call failed');
        }
    };

    useEffect(() => {
        if (place) {
            fetchWeather();
        }
    }, [place]);

    useEffect(() => {
        console.log(values);
    }, [values]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place,
            hourlyData 
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
