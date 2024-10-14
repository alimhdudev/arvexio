import React, { useState } from 'react';
import { Input, Button, Card, Loading } from '@nextui-org/react';
import { motion } from 'framer-motion';
import axios from 'axios';

const fs = require('fs');
const ytdl = require('ytdl-core');

const App = () => {
    const [url, setUrl] = useState('');
    const [resolution, setResolution] = useState('720p'); // Default resolution
    const [videoData, setVideoData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError('');
        setVideoData(null);
        setLoading(true);

        try {
            ytdl(url).pipe(fs.createWriteStream('video.mp4'));

            // const response = await axios.post(`http://127.0.0.1:5000/download/${resolution}`, { url });
            // If your backend returns some video data, handle it here
            console.log(response.data);
        } catch (err) {
            if (err.response) {
                // Handle error response from backend
                setError(err.response.data.error);
            } else {
                setError('An error occurred while processing your request.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInfoRequest = async () => {
        setError('');
        setVideoData(null);
        setLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:5000/video_info', { url });
            setVideoData(response.data);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error);
            } else {
                setError('An error occurred while processing your request.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center min-h-screen'>
            <motion.div
                style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <section className="text-center mt-6 sm:mt-12 mb-4 sm:mb-8">
                    <h1 className="text-center mx-auto text-[#0A0015] font-bold text-xl sm:text-3xl">
                        Paste link to YouTube video
                    </h1>
                </section>
            </motion.div>
            <Input
                type="text"
                color='secondary'
                label="Video URL"
                className='w-[50%] mx-auto'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <Input
                type="text"
                color='secondary'
                label="Resolution (e.g., 720p)"
                className='w-[50%] mx-auto mt-4'
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
            />
            <Button
                color="secondary"
                className='w-fit mx-auto mt-4'
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? <Loading size="sm" /> : "Download Video"}
            </Button>

            <Button
                color="secondary"
                className='w-fit mx-auto mt-4'
                onClick={handleInfoRequest}
                disabled={loading}
            >
                {loading ? <Loading size="sm" /> : "Get Video Info"}
            </Button>

            {error && <p className="text-red-500">{error}</p>}

            {videoData && (
                <Card className="mt-4 p-4 w-[50%] bg-white shadow-lg rounded">
                    <h2 className="text-lg font-bold">{videoData.title}</h2>
                    <p>Author: {videoData.author}</p>
                    <p>Length: {videoData.length} seconds</p>
                    <p>Views: {videoData.views}</p>
                    <p>Description: {videoData.description}</p>
                    <p>Publish Date: {videoData.publish_date}</p>
                </Card>
            )}
        </div>
    );
};

export default App;
