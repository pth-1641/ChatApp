import { useState, useEffect } from 'react';

function useGiphy(queryValue, type) {
    const [giphyData, setGiphyData] = useState([]);
    const giphyApiKey = import.meta.env.VITE_GIPHY_API_KEY;

    useEffect(() => {
        setGiphyData('Loading...');
    }, [queryValue]);

    useEffect(() => {
        const fetchData = setTimeout(async () => {
            const res = await fetch(
                queryValue
                    ? `https://api.giphy.com/v1/${type}/search?api_key=${giphyApiKey}&q=${queryValue}`
                    : `https://api.giphy.com/v1/${type}/trending?api_key=${giphyApiKey}&limit=30`
            );
            const { data } = await res.json();
            data.length === 0 ? setGiphyData('No Result') : setGiphyData(data);
        }, 500);

        return () => clearInterval(fetchData);
    }, [type, queryValue]);

    return giphyData;
}

export default useGiphy;
