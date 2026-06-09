import { benefits } from "@/data/benefits";
import { events } from "@/data/events";
import { partners } from "@/data/partners";
import { pulsePosts } from "@/data/pulse";

export async function getPartners() {
  return partners;
}

export async function getPartnerBySlug(slug: string) {
  return partners.find((partner) => partner.slug === slug) ?? null;
}

export async function getPulse() {
  return pulsePosts;
}

export async function getPulseBySlug(slug: string) {
  return pulsePosts.find((post) => post.slug === slug) ?? null;
}

export async function getEvents() {
  return events;
}

export async function getBenefits() {
  return benefits;
}
