"use client";
import ShowApplicants from "@/components/dashboard/ShowApplicants";
export default function Page() {
   type applicantDataType = {
      profileId?: string;
      profile?: string;
      resume?: string;
      username?: string;
      bio?: string;
      education?: string;
      experience?: string;
      company?: string;
      time?: number;
      yearsOrMonth?: string;
      phone?: number;
      linkedin?: string;
      gitHub?: string;
   };

   const applicants: applicantDataType[] = [
      {
         profileId: "12345",
         profile: "ggdg",
         resume: "ghsghs",
         username: "Shreeram",
         bio: "This is my bio hjghdgdsb gdggdsgds ghgdggd  hjghdgdsb gdggdsgds ghgdggd hjghdgdsb gdggdsgds ghgdggd hjghdgdsb gdggdsgds ghgdggd hjghdgdsb gdggdsgds ghgdggd hjghdgdsb gdggdsgds ghgdggd hjghdgdsb gdggdsgds ghgdggd",
         education: "BCA",
         experience: "yes",
         company: "Tikanga pvt ltd",
         time: 1,
         yearsOrMonth: "months",
         phone: 1234567890,
         linkedin: "https://linkedin.com/in/shreeram",
         gitHub: "https://github.com/shreeram",
      },
      {
         profileId: "12346",
         profile: "ggdg",
         resume: "ghsghs",
         username: "John Doe",
         bio: "Experienced software engineer with a passion for frontend development.",
         education: "Bachelor's in Computer Science",
         experience: "5 years",
         company: "Tech Solutions Inc.",
         time: 40,
         yearsOrMonth: "months",
         phone: 9876543210,
         linkedin: "https://linkedin.com/in/johndoe",
         gitHub: "https://github.com/johndoe",
      },
   ];
   return <ShowApplicants applicants={applicants} />;
}
