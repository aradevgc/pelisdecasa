import React, { useRef, useState } from "react";
import { Play, Pause, Upload } from "lucide-react";

export default function NetflixPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoURL, setVideoURL] = useState(null);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoURL(url);
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-2xl mb-4 font-bold">Netflix Style Player</h1>

      <div className="relative w-[800px] max-w-full bg-black">
        {videoURL ? (
          <video
            ref={videoRef}
            src={videoURL}
            className="w-full rounded-2xl"
          />
        ) : (
          <div className="w-full h-[450px] flex items-center justify-center bg-gray-900 rounded-2xl">
            <p>Select a video to start</p>
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="bg-red-600 hover:bg-red-700 p-2 rounded-full"
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
}

