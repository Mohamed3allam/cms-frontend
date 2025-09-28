export interface HeroSlide {
  documentId: string;
  background: { formats: { medium: { url: string } } } | string;
  image: { formats: { medium: { url: string } } } | string;
  title: string;
  subtitle: string;
  link: string;
  CTALabel?: string;
  CTAUrl?: string;
}
