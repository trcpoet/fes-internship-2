import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";

export default function Player() {
  const { id } = useParams();
  const { fontSize } = useSettings();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Audio state
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Fetch book data
  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        if (!res.ok) throw new Error("Failed to load book");
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchBook();
  }, [id]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", onEnded);
    };
  }, [loading]); // Re-bind when loading finishes/audio tag appears

  // Controls
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const skipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime -= 10;
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  if (loading) {
    return (
        <div className="player__wrapper">
            <div className="summary">
                <div className="audio__book--summary">
                    <div className="audio__book--summary-title">Loading...</div>
                </div>
            </div>
        </div>
    );
  }

  if (!book) {
      return (
        <div className="player__wrapper">
            <div className="summary">
                <div className="audio__book--summary">
                    <div className="audio__book--summary-title">Book not found</div>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="player__wrapper">
      <div className="summary">
        <div className="audio__book--summary" style={{ fontSize: fontSize }}>
          <div className="audio__book--summary-title">
            <b>{book.title}</b>
          </div>
          <div className="audio__book--summary-text">
             {book.summary}
          </div>
        </div>
        
        <div className="audio__wrapper">
          <audio 
            ref={audioRef} 
            src={book.audioLink} 
            autoPlay 
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          ></audio>
          
          <div className="audio__track--wrapper">
            <figure className="audio__track--image-mask">
              <figure className="book__image--wrapper" style={{ height: 48, width: 48, minWidth: 48 }}>
                <img
                  className="book__image"
                  src={book.imageLink}
                  alt="book"
                  style={{ display: "block" }}
                />
              </figure>
            </figure>
            <div className="audio__track--details-wrapper">
              <div className="audio__track--title">{book.title}</div>
              <div className="audio__track--author">{book.author}</div>
            </div>
          </div>

          <div className="audio__controls--wrapper">
            <div className="audio__controls">
              <button className="audio__controls--btn" onClick={skipBackward}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" stroke="#000" strokeWidth="2" d="M3.11111111,7.55555556 C4.66955145,4.26701301 8.0700311,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 L12,22 C6.4771525,22 2,17.5228475 2,12 M2,4 L2,8 L6,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"></path>
                </svg>
              </button>

              <button className="audio__controls--btn audio__controls--btn-play" onClick={togglePlay}>
                {isPlaying ? (
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h24v24H0z" stroke="none"/>
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                ) : (
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="audio__controls--play-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                     <path d="M96 448l320-192L96 64v384z"></path>
                    </svg>
                )}
              </button>

              <button className="audio__controls--btn" onClick={skipForward}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" stroke="#000" strokeWidth="2" d="M20.8888889,7.55555556 C19.3304485,4.26701301 15.9299689,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 L12,22 C17.5228475,22 22,17.5228475 22,12 M22,4 L22,8 L18,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="audio__progress--wrapper">
            <div className="audio__time">{formatTime(currentTime)}</div>
            <input 
                type="range" 
                className="audio__progress--bar" 
                value={currentTime} 
                max={duration} 
                onChange={handleSeek}
                style={{ background: `linear-gradient(to right, rgb(43, 217, 124) ${(currentTime / duration) * 100}%, rgb(109, 120, 125) ${(currentTime / duration) * 100}%)` }} 
            />
            <div className="audio__time">{formatTime(duration)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}