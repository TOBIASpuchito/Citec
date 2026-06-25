import { gsap } from "@/lib/gsap";

export function finalizeHeroIntro(hero: HTMLElement, copyItems: HTMLElement[]) {
  hero.dataset.homeHeroSequenced = "true";
  hero.classList.remove("home-hero--intro");
  gsap.set(copyItems, { clearProps: "opacity,transform,visibility" });
}
