export interface HeroSlide {
  documentId: string;
  background: { url: string } | string;
  image: { url: string } | string;
  title: string;
  subtitle: string;
  link: string;
  CTALabel?: string;
  CTAUrl?: string;
}
