import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------
// [MEDIDA] Definición de tamaños de tarjetas (Ancho)
// ----------------------------------------------------------------------
const CARD_SIZES = {
  narrow: "w-[352px] md:w-[400px]",
  large: "w-[352px] md:w-[620px]",
  wide: "w-[352px] md:w-[832px]",
};

// ----------------------------------------------------------------------
// [DATOS] Contenido de la galería
// ----------------------------------------------------------------------
const galleryItems = [
  {
    id: 1,
    type: "wide",
    title: "Modo Noche y fotos en lugares con poca luz.",
    description: "Lúcete con imágenes nítidas, repletas de detalles, brillantes y con colores naturales, incluso en la oscuridad.",
    imgSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=832&h=680&auto=format&fit=crop",
    imgPosition: "object-center",
  },
  {
    id: 2,
    type: "large",
    title: "Cámaras posteriores Pro.",
    description: "Toma fotos que sacan a la luz muchos más detalles gracias al motor Pro Fusion.",
    imgSrc: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=620&h=680&auto=format&fit=crop",
    imgPosition: "object-center",
  },
  {
    id: 3,
    type: "wide",
    title: "Ultra gran angular.",
    description: "Amplía los horizontes de tu creatividad con alucinantes tomas panorámicas.",
    imgSrc: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=832&h=680&auto=format&fit=crop",
    imgPosition: "object-center",
  },
  {
    id: 4,
    type: "narrow",
    title: "Retratos de última generación.",
    description: "Elige entre diferentes estilos predeterminados para personalizar el tono y el look.",
    imgSrc: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&h=680&auto=format&fit=crop",
    imgPosition: "object-center",
  },
];

export default function ApplePhotoGallery() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // [MEDIDA] Ancho máximo del contenedor de contenido (alineación Apple)
  const CONTENT_MAX_WIDTH = 1260;

  // ----------------------------------------------------------------------
  // [LÓGICA] Animaciones GSAP
  // ----------------------------------------------------------------------
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ----------------------------------------------------------------------
  // [LÓGICA] Control del Scroll
  // ----------------------------------------------------------------------
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const isMobile = window.innerWidth < 768;
    
    // [MEDIDA] Cantidad de píxeles que se mueve al hacer clic en flechas
    const scrollAmount = isMobile ? 352 + 16 : 650 + 32;

    if (direction === "left") {
      const currentScroll = scrollRef.current.scrollLeft;
      if (currentScroll - scrollAmount < 200) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
    setTimeout(checkScroll, 600);
  };

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="bg-black w-full md:min-h-screen min-h-[90vh] font-sans text-[#f5f5f7] pt-12 pb-0 md:py-20 overflow-hidden"
    >
      
      {/* ---------------- [SECCIÓN] TÍTULO ---------------- */}
      <div
        className="w-full mx-auto mb-6 md:mb-10 px-6"
        style={{ maxWidth: `${CONTENT_MAX_WIDTH}px` }}
      >
        <h2 className="text-[24px] leading-tight md:leading-tight font-semibold tracking-[-0.015em] md:text-[32px]">
          Fotos pro hasta el último pixel.
        </h2>
      </div>

      {/* ---------------- [SECCIÓN] CARRUSEL ---------------- */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-4 md:gap-8 pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Espaciador Izquierdo Dinámico */}
        <div
          className="shrink-0 snap-start w-6 md:w-auto"
          style={{ width: `max(0px, calc((100% - ${CONTENT_MAX_WIDTH}px) / 2 - 8px))` }}
        />

        {galleryItems.map((item) => (
          <div
            key={item.id}
            ref={addToRefs}
            className={`flex flex-col shrink-0 snap-start ${CARD_SIZES[item.type] || CARD_SIZES.narrow}`}
          >
            {/* [MEDIDA] Altura de la imagen (h-[...]) */}
            <div className="w-full h-[480px] md:h-[680px] rounded-3xl md:rounded-4xl overflow-hidden bg-[#1d1d1f] relative group cursor-pointer border border-white/5">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
              <img
                src={item.imgSrc}
                alt={item.title}
                loading="lazy"
                className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${item.imgPosition}`}
              />
            </div>

            {/* Texto debajo de la imagen */}
            <div className="max-w-[760px] mt-6 mx-[15px] mb-0">
              <p className="text-[14px] md:text-[17px] leading-snug tracking-[-0.022em]">
                <span className="font-semibold text-[#f5f5f7]">
                  {item.title}
                </span>{" "}
                <span className="font-normal text-[#86868b]">
                  {item.description}
                </span>
              </p>
            </div>
          </div>
        ))}

        {/* Espaciador Derecho Dinámico */}
        <div
          className="shrink-0 w-6 md:w-auto"
          style={{ width: `max(0px, calc((100% - ${CONTENT_MAX_WIDTH}px) / 2 - 8px))` }}
        />
      </div>

      {/* ---------------- [SECCIÓN] CONTROLES (BOTONES) ---------------- */}
      <div
        className="w-full mx-auto px-6 mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between relative"
        style={{ maxWidth: `${CONTENT_MAX_WIDTH}px` }}
      >
        <div className="hidden md:block w-[100px]" />

        <div className="flex gap-3 self-end md:self-auto">
          {/* Botón Izquierda */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-[#333336] hover:bg-[#464649] transition-all duration-200 text-[#f5f5f7] disabled:opacity-30 disabled:cursor-default"
          >
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M8.5 1.5L2 8L8.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Botón Derecha */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-[#333336] hover:bg-[#464649] transition-all duration-200 text-[#f5f5f7] disabled:opacity-30 disabled:cursor-default"
          >
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M1.5 1.5L8 8L1.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}