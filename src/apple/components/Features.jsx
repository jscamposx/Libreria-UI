import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/all";

// --- IMPORTACIÓN DE ASSETS ---
import exploreVideo from "../assets/videos/explore.mp4";
import explore1Img from "../assets/images/explore1.jpg";
import explore2Img from "../assets/images/explore2.jpg";

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------
// [CONFIGURACIÓN] EDITA AQUÍ TEXTOS, RUTAS Y CONTENIDO
// ----------------------------------------------------------------------
const FEATURES_DATA = {
  header: {
    title: "Explore the full story."
  },
  hero: {
    line1: "iPhone.",
    line2: "Forged in titanium."
  },
  media: {
    mainVideo: exploreVideo,
    galleryImage1: explore1Img,
    galleryImage2: explore2Img,
  },
  features: [
    {
      id: 1,
      prefix: "iPhone 15 Pro is ",
      highlight: "the first iPhone to feature an aerospace-grade titanium design",
      suffix: ", using the same alloy that spacecrafts use for missions to Mars."
    },
    {
      id: 2,
      prefix: "Titanium has one of the best strength-to-weight ratios of any metal, making these our ",
      highlight: "lightest Pro models ever.",
      suffix: " You'll notice the difference the moment you pick one up."
    }
  ]
};

const Features = () => {
  const videoRef = useRef();
  const scrollRef = useRef();

  // ----------------------------------------------------------------------
  // [LÓGICA] ANIMACIONES GSAP
  // ----------------------------------------------------------------------
  useGSAP(() => {
    // Helper para animaciones reutilizables
    const animateWithGsap = (target, animationProps, scrollProps) => {
      gsap.to(target, {
        ...animationProps,
        scrollTrigger: {
          trigger: target,
          toggleActions: 'play none none reverse',
          start: 'top 85%',
          ...scrollProps,
        }
      })
    }

    // 1. Animación del Título Principal
    animateWithGsap('#features_title', { y: 0, opacity: 1 });

    // 2. Animación de Imágenes (Efecto Grow)
    animateWithGsap(
      '.g_grow',
      { scale: 1, opacity: 1, ease: 'power1' },
      { scrub: 0.5 }
    );

    // 3. Animación de Bloques de Texto
    gsap.utils.toArray('.g_text').forEach((text) => {
      animateWithGsap(
        text,
        { y: 0, opacity: 1, ease: 'power2.inOut', duration: 1 }
      )
    });

    // 4. Control del Video Principal
    ScrollTrigger.create({
      trigger: '#exploreVideo',
      toggleActions: 'play pause play restart',
      start: '-10% bottom',
      onEnter: () => videoRef.current.play(),
      onLeave: () => videoRef.current.pause(),
      onEnterBack: () => videoRef.current.play(),
      onLeaveBack: () => videoRef.current.pause(),
    });

  }, { scope: scrollRef });

  return (
    <section ref={scrollRef} className="h-full sm:py-32 py-20 sm:px-10 px-5 bg-[#101010] relative overflow-hidden">
      <div className="mx-auto relative max-w-[1120px]">
        
        {/* SECCIÓN: HEADER */}
        <div className="mb-12 w-full">
          <h1 id="features_title" className="text-[#86868b] lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20">
            {FEATURES_DATA.header.title}
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center overflow-hidden">
          
          {/* SECCIÓN: TITULARES PRINCIPALES */}
          <div className="mt-32 mb-24 pl-0 md:pl-24 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#86868b]">
              {FEATURES_DATA.hero.line1}
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#86868b]">
              {FEATURES_DATA.hero.line2}
            </h2>
          </div>

          {/* SECCIÓN: VIDEO Y GALERÍA */}
          <div className="flex items-center justify-center flex-col sm:px-10">
            
            {/* Video Principal */}
            <div className="relative h-[50vh] w-full flex items-center">
              <video 
                playsInline 
                id="exploreVideo" 
                className="w-full h-full object-cover object-center" 
                preload="none" 
                muted 
                autoPlay 
                ref={videoRef}
              >
                <source src={FEATURES_DATA.media.mainVideo} type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col w-full relative">
              {/* Imágenes Secundarias */}
              <div className="w-full flex flex-col md:flex-row gap-5 items-center">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img 
                    src={FEATURES_DATA.media.galleryImage1} 
                    alt="feature 1" 
                    className="w-full h-full object-cover object-center scale-150 opacity-0 g_grow" 
                  />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img 
                    src={FEATURES_DATA.media.galleryImage2} 
                    alt="feature 2" 
                    className="w-full h-full object-cover object-center scale-150 opacity-0 g_grow" 
                  />
                </div>
              </div>

              {/* Textos Descriptivos */}
              <div className="w-full flex items-center justify-center flex-col md:flex-row mt-10 md:mt-16 gap-5">
                {FEATURES_DATA.features.map((feature) => (
                  <div key={feature.id} className="flex-1 flex items-center justify-center">
                    <p className="text-[#86868b] max-w-md text-lg md:text-xl font-semibold opacity-0 translate-y-[100px] g_text">
                      {feature.prefix}
                      <span className="text-white">
                        {feature.highlight}
                      </span>
                      {feature.suffix}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Features