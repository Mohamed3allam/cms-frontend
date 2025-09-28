export interface TeamMember {
  id: number;
  documentId: string;
  avatar: { url: string } | string;
  name?: string;
  role?: string;
  bio?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
}
