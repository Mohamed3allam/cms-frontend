import { TeamMember } from "./teamMember";

export type RichTextBlock = {
  type: string;
  align?: string;
  level?: number;
  style?: string;
  children: Array<{
    type: string;
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
  }>;
};

export interface Service {
  id: number;
  documentId: string;
  title?: string;
  description?: string;
  content?: RichTextBlock[];
  slug?: string;
  team_members: TeamMember[];
}
