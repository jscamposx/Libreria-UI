import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// Importación de Componentes y Assets
import VideoCarousel from './VideoCarousel';
import watchImg from "../assets/images/watch.svg";
import rightImg from "../assets/images/right.svg";

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------
// [CONFIGURACIÓN] EDITA AQUÍ TEXTOS E ICONOS
// ----------------------------------------------------------------------
const HIGHLIGHTS_DATA = {
  heading: "Get the highlights.",
  links: [
    { text: "Watch the film", icon: watchImg, alt: "watch" },
    { text: "Watch the event", icon: rightImg, alt: "right" },
  ]
};

const Highlights = () => {
  
  // ----------------------------------------------------------------------
  // [LÓGICA] ANIMACIONES GSAP
  // ----------------------------------------------------------------------
  useGSAP(() => {
    // 1. Animación del Título
    gsap.from('#title', {
      scrollTrigger: {
        trigger: '#title',
        start: 'top 85%', // Inicia cuando el elemento está casi visible
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power2.inOut'
    })

    // 2. Animación de los Links (Botones)
    gsap.from('.link', {
      scrollTrigger: {
        // Usamos el mismo trigger '#title' para que aparezcan junto con el título
        trigger: '#title', 
        start: 'top 85%', 
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40, 
      duration: 1,
      stagger: 0.25, // Efecto cascada entre botones
      ease: 'power2.inOut'
    })
  }, [])

  return (
    <section id="highlights" className="w-full overflow-hidden h-full sm:py-32 py-20 sm:px-10 px-5 bg-[#101010]">
      <div className="mx-auto relative max-w-[1120px]">
        
        {/* ---------------- [SECCIÓN] ENCABEZADO (TÍTULO Y LINKS) ---------------- */}
        <div className="mb-12 w-full md:flex items-end justify-between">
          
          <h1 id="title" className="text-[#86868b] lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium">
            {HIGHLIGHTS_DATA.heading}
          </h1>

          <div className="flex flex-wrap items-end gap-5">
            {HIGHLIGHTS_DATA.links.map((link, index) => (
              <p 
                key={index} 
                className="link text-[#2997FF] hover:underline cursor-pointer flex items-center text-xl"
              >
                {link.text}
                <img src={link.icon} alt={link.alt} className="ml-2" />
              </p>
            ))}
          </div>

        </div>

        {/* ---------------- [SECCIÓN] CARRUSEL DE VIDEO ---------------- */}
        <VideoCarousel />
        
      </div>
    </section>
  )
}

export default Highlights