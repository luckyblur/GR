"use client";

import { motion, useAnimationFrame, useMotionValue, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import Grainient from "./components/Grainient";

const navItems = [
  { label: "经历", href: "#about" },
  { label: "项目", href: "#projects" },
  { label: "技能", href: "#strengths" },
  { label: "联系", href: "#contact" },
];

const decorImages = [
  { src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png", className: "top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]", x: -80 },
  { src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png", className: "bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]", x: -80 },
  { src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png", className: "top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]", x: 80 },
  { src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png", className: "bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]", x: 80 },
];

const marqueeImages = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
];

const strengths = [
  ["01", "即梦", "用于 AI 图片生成、视频生成、风格探索、视觉分镜和创意方向快速验证。"],
  ["02", "Runway", "用于视频生成、动态镜头、AI 抠像、画面延展和影像后期实验。"],
  ["03", "ChatGPT", "用于创意策略、提示词结构、文案推演、方案整理和设计流程提效。"],
  ["04", "Gemini", "用于多模态分析、资料理解、视觉参考拆解和跨工具创作辅助。"],
  ["05", "Midjourney / ComfyUI", "用于视觉风格探索、角色设定、概念图生成和可控工作流搭建。"],
];

const projects = [
  { number: "01", category: "商业项目", name: "AI 品牌系统", videos: ["/project-01.mp4", "/project-01.mp4", "/project-01.mp4"] },
  { number: "02", category: "个人实验", name: "动态视觉实验", videos: ["/project-02.mp4", "/project-02.mp4", "/project-02.mp4"] },
  { number: "03", category: "商业项目", name: "界面视觉规范", videos: ["/hero-video.mp4", "/hero-video.mp4", "/hero-video.mp4"] },
  { number: "04", category: "影像项目", name: "连续影像实验", videos: ["/project-04.mp4", "/project-04.mp4", "/project-04.mp4"] },
];

type ShinyTextProps = {
  text: string;
  className?: string;
  speed?: number;
  color?: string;
  shineColor?: string;
  spread?: number;
  delay?: number;
};

function ShinyText({ text, className = "", speed = 7.5, color = "#ffffff", shineColor = "#ffffff", spread = 96, delay = 1.2 }: ShinyTextProps) {
  const phase = useMotionValue(-spread);
  useAnimationFrame((time) => {
    phase.set(((time / (speed * 1000) + delay) % 1) * (200 + spread * 2) - spread);
  });
  const textShadow = useTransform(phase, (value) => {
    const distance = Math.abs(value - 50);
    const intensity = Math.max(0, 1 - distance / 80);
    return `0 0 ${Math.round(intensity * 18)}px ${shineColor}${Math.round(intensity * 38).toString(16).padStart(2, "0")}`;
  });
  return (
    <motion.span
      className={className}
      style={{
        color,
        WebkitTextFillColor: color,
        textShadow,
        display: "inline-block",
      }}
    >
      {text}
    </motion.span>
  );
}

function FadeIn({ children, className = "", delay = 0, x = 0, y = 30 }: { children: ReactNode; className?: string; delay?: number; x?: number; y?: number }) {
  return <motion.div initial={{ opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: "easeOut", delay }} className={className}>{children}</motion.div>;
}

function ContactButton() {
  return <a className="contact-button" href="mailto:hello@portfolio.design">联系我</a>;
}

function VideoStill({ src, variant, seed = 0, label }: { src: string; variant: "first" | "middle"; seed?: number; label: string }) {
  const [poster, setPoster] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    const video = document.createElement("video");
    video.src = src;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.preload = "metadata";
    video.playsInline = true;
    const capture = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const ratio = variant === "first" ? 0.02 : 0.44 + (seed % 5) * 0.035;
      video.currentTime = Math.min(video.duration - 0.08, Math.max(0.04, video.duration * ratio));
    };
    const draw = () => {
      if (cancelled || video.videoWidth === 0 || video.videoHeight === 0) return;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setPoster(canvas.toDataURL("image/jpeg", 0.84));
    };
    video.addEventListener("loadedmetadata", capture, { once: true });
    video.addEventListener("seeked", draw, { once: true });
    video.load();
    return () => {
      cancelled = true;
      video.removeAttribute("src");
      video.load();
    };
  }, [src, variant, seed]);

  return (
    <div className="project-still" aria-label={label} role="img">
      {poster ? <img src={poster} alt="" draggable={false} onContextMenu={(event) => event.preventDefault()} /> : <video src={src} muted preload="metadata" playsInline aria-hidden="true" controlsList="nodownload" disablePictureInPicture onContextMenu={(event) => event.preventDefault()} />}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero-section" id="home" aria-label="首页">
      <img className="hero-full-image" src="/hero-landscape.jpg" alt="悬崖城市风景背景" draggable={false} onContextMenu={(event) => event.preventDefault()} />
      <div className="hero-overlay" />
      <div className="hero-frost-sweep" aria-hidden="true" />
      <motion.nav className="portfolio-nav" aria-label="主导航" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="portfolio-nav-links">{navItems.map((item) => <a className="portfolio-nav-link" href={item.href} key={item.label}>{item.label}</a>)}</div>
        <a className="portfolio-nav-contact" href="#contact">联系我</a>
      </motion.nav>
      <div className="hero-copy">
        <FadeIn delay={0.25} y={36}><h1><ShinyText text="用克制的视觉系统，为品牌建立可被记住的未来感。" speed={7.5} /></h1></FadeIn>
      </div>
    </section>
  );
}

function FeaturedVideoSection() {
  return (
    <section className="featured-video-section" aria-label="视频作品展示" id="about">
      <div className="featured-video-copy"><h2><ShinyText text="Seedance2.0" speed={7.5} color="#ffffff" shineColor="#ffffff" spread={96} /></h2></div>
      <div className="featured-video-frame">
        <video src="/hero-video.mp4" autoPlay muted loop playsInline preload="auto" controlsList="nodownload" disablePictureInPicture aria-label="自动播放的视频作品" onContextMenu={(event) => event.preventDefault()} />
      </div>
    </section>
  );
}

function MarqueeSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);
  const rowOne = marqueeImages.slice(0, 6);
  const rowTwo = marqueeImages.slice(6, 12);
  useAnimationFrame((time) => setOffset((time / 32) % 1200));
  return (
    <section ref={ref} className="bg-transparent pt-24 pb-10 sm:pt-32 md:pt-40" aria-label="动态视觉作品">
      <div className="flex flex-col gap-3 overflow-hidden">
        <div className="marquee-row" style={{ transform: `translateX(${offset - 200}px)` }}>{[...rowOne, ...rowOne, ...rowOne].map((src, index) => <MarqueeTile src={src} key={`${src}-${index}`} />)}</div>
        <div className="marquee-row" style={{ transform: `translateX(${-offset}px)` }}>{[...rowTwo, ...rowTwo, ...rowTwo].map((src, index) => <MarqueeTile src={src} key={`${src}-${index}`} />)}</div>
      </div>
    </section>
  );
}

function MarqueeTile({ src }: { src: string }) {
  return <div className="marquee-tile"><img src={src} alt="动态视觉项目预览" loading="lazy" draggable={false} onContextMenu={(event) => event.preventDefault()} /></div>;
}

function AnimatedChar({ char, progress, range }: { char: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <span className={char === " " ? "animated-char animated-char-space" : "animated-char"}><span aria-hidden="true" style={{ opacity: 0 }}>{char}</span><motion.span style={{ opacity }} className="absolute inset-0">{char}</motion.span></span>;
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.45"] });
  return <p ref={ref} className="max-w-[620px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]">{text.split("").map((char, index, chars) => <AnimatedChar char={char} progress={scrollYProgress} range={[index / chars.length, Math.min(1, index / chars.length + 0.12)]} key={`${char}-${index}`} />)}</p>;
}

function AboutSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent px-5 py-20 sm:px-8 md:px-10">
      {decorImages.map((item, index) => <FadeIn key={item.src} delay={index * 0.1} x={item.x} y={0} className={`absolute ${item.className}`}><img className="decor-image" src={item.src} alt="装饰性三维视觉元素" loading="lazy" draggable={false} onContextMenu={(event) => event.preventDefault()} /></FadeIn>)}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn><h2 className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black leading-none tracking-tight"><ShinyText text="关于我" speed={7.5} /></h2></FadeIn>
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText text="我拥有视觉设计、AI 设计与品牌设计的复合经验，擅长在策略、影像、版式和数字界面之间建立统一的视觉秩序。我希望用更克制、更准确的设计语言，帮助品牌呈现清晰而有记忆点的形象。" />
          <ContactButton />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, total }: { project: (typeof projects)[number]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0.35, 1], [1, 1 - (total - 1 - index) * 0.03]);
  return (
    <div ref={ref} className="project-card-stage">
      <motion.article style={{ scale, top: `calc(6rem + ${index * 28}px)` }} className="project-card-shell sticky overflow-hidden rounded-[30px] project-adaptive-border bg-[#0C0C0C] p-4 sm:rounded-[40px] sm:p-6 md:top-32 md:rounded-[52px] md:p-8">
        <div className="mb-5 flex items-center text-[#D7E2EA] sm:mb-7">
          <strong className="text-[clamp(3rem,10vw,140px)] font-black leading-none">{project.number}</strong>
        </div>
        <div className="project-media-grid">
          <div className="project-still-column">
            <div className="project-shot project-shot-small"><VideoStill src={project.videos[0]} variant="first" seed={index} label={project.name + "首帧画面"} /></div>
            <div className="project-shot project-shot-small"><VideoStill src={project.videos[1]} variant="middle" seed={index + 2} label={project.name + "中段画面"} /></div>
          </div>
          <div className="project-shot project-shot-main"><video src={project.videos[2]} controls controlsList="nodownload noplaybackrate" disablePictureInPicture preload="metadata" playsInline aria-label={project.name + "可播放视频"} onContextMenu={(event) => event.preventDefault()} /></div>
        </div>
      </motion.article>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-transparent px-4 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-6 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-8 md:py-32">
      <FadeIn><h2 className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black leading-none tracking-tight sm:mb-20 md:mb-28"><ShinyText text="作品" speed={7.5} /></h2></FadeIn>
      <div className="mx-auto w-full max-w-none">{projects.map((project, index) => <ProjectCard project={project} index={index} total={projects.length} key={project.name} />)}</div>
    </section>
  );
}

function StrengthsSection() {
  return (
    <section id="strengths" className="rounded-t-[40px] bg-[#F4F4F0] px-4 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-6 sm:py-24 md:rounded-t-[60px] md:px-8 md:py-32">
      <FadeIn><h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black leading-none tracking-tight sm:mb-20 md:mb-28"><ShinyText text="技能" speed={7.5} color="#0C0C0C" shineColor="#6b7075" /></h2></FadeIn>
      <div className="mx-auto max-w-5xl">
        {strengths.map(([number, name, description], index) => <FadeIn delay={index * 0.1} key={name}><article className="grid grid-cols-[minmax(96px,0.36fr)_1fr] gap-5 border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:gap-8 sm:py-10 md:py-12"><strong className="text-[clamp(3rem,10vw,140px)] font-black leading-none">{number}</strong><div className="self-center"><h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium">{name}</h3><p className="mt-3 max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">{description}</p></div></article></FadeIn>)}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="site-root">
      <HeroSection />
      <div className="after-hero-grain">
        <Grainient
          className="after-hero-grain-canvas"
          color1="#af58a5"
          color2="#5a41bb"
          color3="#a870dc"
          timeSpeed={0.25}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          grainAmount={0.1}
          contrast={1.5}
          saturation={1}
          zoom={0.9}
        />
        <div className="after-hero-grain-content">
          <FeaturedVideoSection />
          <ProjectsSection />
              <section id="contact" className="flex min-h-screen flex-col items-center justify-center gap-10 bg-transparent px-5 text-center">
            <h2 className="hero-heading max-w-5xl text-[clamp(3rem,10vw,140px)] font-black leading-none tracking-tight"><ShinyText text="让好的视觉，成为品牌被记住的理由。" speed={7.5} /></h2>
            <ContactButton />
          </section>
        </div>
      </div>
    </main>
  );
}
