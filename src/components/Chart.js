import React, { useEffect, useState, useRef } from 'react';
import { MagnifyingGlass } from "react-loader-spinner"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';
import * as htmlToImage from 'html-to-image';
import './Chart.css';

const Chart = ({ period }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const baseUrl = 'https://time-series-data-node-backend.onrender.com/api/time-series-data';
    const chartRef = useRef(null);

    const exportChart = () => {
        const chart = chartRef.current;
        if (chart) {
            htmlToImage
                .toPng(chart)
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = 'chart.png';
                    link.click();
                })
                .catch((error) => {
                    console.error('Failed to export chart as PNG:', error);
                });
        }
    };

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(`${baseUrl}?period=${period}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [period]);


    return (
        <>
            {error === true &&
                <p>Please refresh your page...</p>}
            {loading === true &&
                <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="magnifying-glass-loading"
                    wrapperStyle={{}}
                    wrapperClass="magnifying-glass-wrapper"
                    glassColor="#c0efff"
                    color="#e15b64"
                />}
            {loading === false &&


                <>
                    <ResponsiveContainer width="100%" height={600} ref={chartRef}>
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#c9225d" activeDot={{ r: 8 }} />
                            <Brush dataKey="day" height={30} stroke="#8fdbd9" />
                        </LineChart>
                    </ResponsiveContainer>
                    <button className="buttonEl" onClick={exportChart}>Export as PNG</button>
                </>}
        </>

    );
};

export default Chart;



