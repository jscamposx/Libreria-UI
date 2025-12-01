import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// Importación de Assets
import highlightFirstVideo from "../assets/videos/highlight-first.mp4";
import highlightSecondVideo from "../assets/videos/hightlight-third.mp4";
import highlightThirdVideo from "../assets/videos/hightlight-sec.mp4";
import highlightFourthVideo from "../assets/videos/hightlight-fourth.mp4";

import pauseImg from "../assets/images/pause.svg";
import playImg from "../assets/images/play.svg";
import replayImg from "../assets/images/replay.svg";

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------
// [CONFIGURACIÓN] EDITA AQUÍ LOS VIDEOS Y TEXTOS
// ----------------------------------------------------------------------
const HIGHLIGHTS_DATA = [
  {
    id: 1,
    textLists: [
      "Enter A17 Pro.",
      "Game‑changing chip.",
      "Groundbreaking performance."
    ],
    video: highlightFirstVideo,
    videoDuration: 4,
  },
  {
    id: 2,
    textLists: [
      "Titanium.",
      "So strong. So light. So Pro."
    ],
    video: highlightSecondVideo,
    videoDuration: 5,
  },
  {
    id: 3,
    textLists: [
      "iPhone 15 Pro Max has the",
      "longest optical zoom in",
      "iPhone ever. Far out."
    ],
    video: highlightThirdVideo,
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: [
      "All-new Action button.",
      "What will yours do?."
    ],
    video: highlightFourthVideo,
    videoDuration: 3.63,
  },
];

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  // Estado del video (reproducción, finalización, ID actual)
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  // ----------------------------------------------------------------------
  // [LÓGICA] ANIMACIONES GSAP (MOVIMIENTO DEL SLIDER)
  // ----------------------------------------------------------------------
  useGSAP(() => {
    // 1. Mover el contenedor del slider horizontalmente
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    // 2. Trigger para iniciar el video cuando aparece en pantalla
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  // ----------------------------------------------------------------------
  // [LÓGICA] BARRA DE PROGRESO (TICKER Y ANIMACIÓN)
  // ----------------------------------------------------------------------
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;
    let div = videoDivRef.current;

    if (span[videoId]) {
      // ANIMACIÓN A: Expandir la "píldora" activa (fondo gris oscuro)
      
      // [MEDIDA] Ancho de la barra de progreso activa según dispositivo
      const targetWidth = window.innerWidth < 760 
        ? "10vw" // Móvil
        : window.innerWidth < 1200 
          ? "10vw" // Tablet
          : "4vw"; // Desktop

      gsap.to(div[videoId], {
        width: targetWidth,
        backgroundColor: "#171717",
        duration: 0.5,
        ease: "power1.out"
      });
      
      // Resetear los otros puntos a su estado inactivo
      div.forEach((el, i) => {
        if (i !== videoId) {
          gsap.to(el, { width: "12px", backgroundColor: "#afafaf" });
          gsap.to(span[i], { backgroundColor: "transparent" });
        }
      });

      // ANIMACIÓN B: Llenado de la barra (color blanco) sincronizado con el video
      const animUpdate = () => {
        const currentVideo = videoRef.current[videoId];
        
        if (currentVideo) {
          const progress = (currentVideo.currentTime / HIGHLIGHTS_DATA[videoId].videoDuration) * 100;
          
          gsap.to(span[videoId], {
            width: `${progress}%`,
            backgroundColor: "white",
            duration: 0.1,
            ease: "none"
          });
        }
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }

      return () => {
        gsap.ticker.remove(animUpdate);
      };
    }
  }, [videoId, startPlay, isPlaying]);

  // ----------------------------------------------------------------------
  // [LÓGICA] CONTROL DE REPRODUCCIÓN (PLAY/PAUSE)
  // ----------------------------------------------------------------------
  useEffect(() => {
    if (loadedData.length > 3) {
      const currentVideo = videoRef.current[videoId];
      if (currentVideo) {
        if (!isPlaying) {
          currentVideo.pause();
        } else {
          startPlay && currentVideo.play();
        }
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // ----------------------------------------------------------------------
  // [HANDLERS] GESTIÓN DE EVENTOS
  // ----------------------------------------------------------------------
  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;
      case "pause":
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  return (
    <>
      {/* ---------------- [SECCIÓN] SLIDER DE VIDEOS ---------------- */}
      <div className="flex items-center">
        {HIGHLIGHTS_DATA.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]">
              
              {/* Contenedor del Video */}
              <div className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline={true}
                  className={`${list.id === 2 && "translate-x-44"} pointer-events-none`}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() =>
                    // CAMBIO: Detección dinámica del último video
                    i !== HIGHLIGHTS_DATA.length - 1
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              {/* Textos sobre el video */}
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, idx) => (
                  <p key={idx} className="md:text-2xl text-xl font-medium text-white">
                    {text}
                  </p>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ---------------- [SECCIÓN] CONTROLES INFERIORES ---------------- */}
      <div className="relative flex items-center justify-center mt-10">
        
        {/* Indicadores (Puntos / Barra de progreso) */}
        <div className="flex items-center justify-center py-5 px-7 bg-[#42424570] backdrop-blur rounded-full">
          {HIGHLIGHTS_DATA.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-[#afafaf] rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        {/* Botón de Play / Pause / Replay */}
        <button className="ml-4 p-4 rounded-full bg-[#42424570] backdrop-blur flex items-center justify-center">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;