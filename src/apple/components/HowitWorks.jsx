import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/all";

// Importaciones de Assets
import chipImg from "../assets/images/chip.jpeg";
import frameImg from "../assets/images/frame.png";
import frameVideo from "../assets/videos/frame.mp4";

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------
// [CONFIGURACIÓN] EDITA AQUÍ TEXTOS Y ASSETS
// ----------------------------------------------------------------------
const HOW_IT_WORKS_DATA = {
  assets: {
    chip: chipImg,
    frame: frameImg,
    video: frameVideo,
  },
  header: {
    title: "A17 Pro chip.",
    subtitle: "A monster win for gaming.",
    description: "It's here. The biggest redesign in the history of Apple GPUs."
  },
  videoSection: {
    caption: "Honkai: Star Rail"
  },
  // Bloque de texto izquierdo (Párrafos)
  featureText: [
    {
      id: 1,
      prefix: "A17 Pro is an entirely new class of iPhone chip that delivers our ",
      highlight: "best graphic performance by far",
      suffix: "."
    },
    {
      id: 2,
      prefix: "Mobile ",
      highlight: "games will look and feel so immersive",
      suffix: ", with incredibly detailed environments and characters."
    }
  ],
  // Bloque de texto derecho (Especificaciones)
  specs: {
    label: "New",
    title: "Pro-class GPU",
    subtitle: "with 6 cores"
  }
};

const HowItWorks = () => {
  const videoRef = useRef();
  const scrollRef = useRef();

  // ----------------------------------------------------------------------
  // [LÓGICA] ANIMACIONES GSAP
  // ----------------------------------------------------------------------
  useGSAP(() => {
    // 1. Animación del Chip (Zoom In)
    gsap.from('#chip', {
      scrollTrigger: {
        trigger: '#chip',
        start: '20% bottom',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power2.inOut'
    })

    // 2. Control del Video (Play/Pause al hacer scroll)
    ScrollTrigger.create({
      trigger: '#videoContainer',
      toggleActions: 'play pause play restart',
      start: '-10% bottom',
      onEnter: () => videoRef.current.play(),
      onLeave: () => videoRef.current.pause(),
      onEnterBack: () => videoRef.current.play(),
      onLeaveBack: () => {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    });

    // 3. Textos del final (Fade In desde abajo)
    gsap.utils.toArray('.g_fadeIn').forEach((target) => {
      gsap.from(target, {
        scrollTrigger: {
          trigger: target,
          start: 'top 95%', 
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 100, 
        duration: 1,
        ease: 'power2.inOut'
      })
    });
    
  }, { scope: scrollRef });

  return (
    <section ref={scrollRef} className="sm:py-32 py-20 sm:px-10 px-5 bg-black overflow-hidden">
      <div className="mx-auto relative max-w-[1120px]">
        
        {/* ---------------- [SECCIÓN] HEADER / CHIP ---------------- */}
        <div id="chip" className="flex items-center justify-center w-full my-10 md:my-20">
          <img src={HOW_IT_WORKS_DATA.assets.chip} alt="chip" width={180} height={180} />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-4xl md:text-7xl font-semibold text-center text-white">
            {HOW_IT_WORKS_DATA.header.title}
            <br /> {HOW_IT_WORKS_DATA.header.subtitle}
          </h2>
          <p className="text-[#86868b] font-semibold text-xl md:text-2xl py-10 text-center">
            {HOW_IT_WORKS_DATA.header.description}
          </p>
        </div>

        {/* ---------------- [SECCIÓN] VIDEO FRAME ---------------- */}
        <div className="mt-10 md:mt-20 mb-14">
          <div id="videoContainer" className="relative h-full flex items-center justify-center">
            <div className="overflow-hidden">
              <img src={HOW_IT_WORKS_DATA.assets.frame} alt="frame" className="bg-transparent relative z-10" />
            </div>
            <div className="absolute w-[95%] h-[90%] md:rounded-[56px] overflow-hidden">
              <video 
                className="pointer-events-none" 
                playsInline 
                preload="none" 
                muted 
                autoPlay 
                ref={videoRef}
              >
                <source src={HOW_IT_WORKS_DATA.assets.video} type="video/mp4" />
              </video>
            </div>
          </div>
          <p className="text-[#86868b] font-semibold text-center mt-3">
            {HOW_IT_WORKS_DATA.videoSection.caption}
          </p>
        </div>

        {/* ---------------- [SECCIÓN] CARACTERÍSTICAS (TEXTOS) ---------------- */}
        <div className="flex md:flex-row flex-col justify-between items-start gap-10 md:gap-24 pb-10">
          
          {/* Columna Izquierda: Descripción */}
          <div className="flex flex-1 justify-center flex-col">
            {HOW_IT_WORKS_DATA.featureText.map((item, index) => (
              <p 
                key={item.id} 
                className={`text-[#86868b] text-xl font-normal md:font-semibold g_fadeIn ${index > 0 ? 'mt-10' : ''}`}
              >
                {item.prefix}
                <span className="text-white">
                  {item.highlight}
                </span>
                {item.suffix}
              </p>
            ))}
          </div>

          {/* Columna Derecha: Specs (GPU) */}
          <div className="flex-1 flex justify-center flex-col g_fadeIn">
            <p className="text-[#86868b] text-xl font-normal md:font-semibold">
              {HOW_IT_WORKS_DATA.specs.label}
            </p>
            <p className="text-white text-3xl md:text-5xl font-normal md:font-semibold my-2">
              {HOW_IT_WORKS_DATA.specs.title}
            </p>
            <p className="text-[#86868b] text-xl font-normal md:font-semibold">
              {HOW_IT_WORKS_DATA.specs.subtitle}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HowItWorks