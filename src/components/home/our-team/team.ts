interface TeamMember {
  id: number;
  image: string;
  name: string;
  position: string;
  whatsapp: string;
  phone: string;
  email: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Mohamed Salah",
    position: "Frontend Developer",
    whatsapp: "+201234567890",
    phone: "+201112223344",
    email: "mohamed.salah@example.com",
  },
  {
    id: 2,
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Amina Khalid",
    position: "Backend Developer",
    whatsapp: "+201098765432",
    phone: "+201155667788",
    email: "amina.khalid@example.com",
  },
  {
    id: 3,
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    name: "Ahmed Hassan",
    position: "UI/UX Designer",
    whatsapp: "+201223344556",
    phone: "+201122334455",
    email: "ahmed.hassan@example.com",
  },
  {
    id: 4,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Sara Youssef",
    position: "Project Manager",
    whatsapp: "+201344556677",
    phone: "+201133445566",
    email: "sara.youssef@example.com",
  },
  {
    id: 5,
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    name: "Tamer Fathy",
    position: "QA Engineer",
    whatsapp: "+201456789012",
    phone: "+201144556677",
    email: "tamer.fathy@example.com",
  }
];
