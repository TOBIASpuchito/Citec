import { gsap, ScrollTrigger } from "@/lib/gsap";

export function initRevealMotion() {
  if (typeof window === "undefined") {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = gsap.utils.toArray<HTMLElement>("[data-reveal]");

  if (reduceMotion) {
    document.documentElement.classList.remove("reveal-ready");
    revealItems.forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "none";
    });
    return;
  }

  document.documentElement.classList.add("reveal-ready");

  revealItems.forEach((item) => {
    const delay = Number(item.dataset.revealDelay ?? 0);
    const y = item.dataset.reveal === "fade" ? 0 : 22;

    gsap.fromTo(
      item,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
          once: true,
        },
      },
    );
  });

  ScrollTrigger.refresh();
}
