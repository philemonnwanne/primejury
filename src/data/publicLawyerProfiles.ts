export interface PublicLawyerProfile {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  currentCaseload: number;
  specialization: string[];
  successRate: number;
  proBono: boolean;
  imageUrl: string;
}

export const publicLawyerProfiles: PublicLawyerProfile[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Partner",
    email: "sarah.j@lawfirm.com",
    phone: "(555) 123-4567",
    yearsOfExperience: 15,
    currentCaseload: 8,
    specialization: ["Criminal Law", "Civil Rights"],
    successRate: 92,
    proBono: true,
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Associate",
    email: "m.chen@lawfirm.com",
    phone: "(555) 234-5678",
    yearsOfExperience: 8,
    currentCaseload: 12,
    specialization: ["Corporate Law", "Intellectual Property"],
    successRate: 88,
    proBono: false,
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    title: "Partner",
    email: "e.rodriguez@lawfirm.com",
    phone: "(555) 345-6789",
    yearsOfExperience: 12,
    currentCaseload: 10,
    specialization: ["Family Law", "Immigration"],
    successRate: 95,
    proBono: true,
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2"
  }
]