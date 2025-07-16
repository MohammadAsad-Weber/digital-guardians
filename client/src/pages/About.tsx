import { featuresAbout as features } from "@/data/constant";

// UI Components
import { Section, SectionTitle, SectionDescription } from "@/components/ui/section";
import { Hero, HeroContent, HeroTitle, HeroDescription } from "@/components/ui/hero";

// Images
import Vault from "@/assets/images/vault_illustration.jpg";
import First from "@/assets/images/security_1.jpg";
import Second from "@/assets/images/security_2.jpg";
import Third from "@/assets/images/security_3.jpg";
import Secure from "@/assets/images/secure.png";

// Layouts
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";

// Rename the title
document.title = "About us • Digital Guardians";

function About() {
  return (
    <>
      <Navbar />
      <main>

        {/* HEADER SECTION */}
        <Hero className="gap-7.5">
          <HeroContent className="max-w-lg">
            <HeroTitle className="text-transparent bg-[linear-gradient(345deg,_#21D4FD_0%,_#B721FF_100%)] bg-clip-text">
              About Digital Guardians
            </HeroTitle>
            <HeroDescription>
              Your personal vault for managing passwords — secure, fast, and
              built with love by developers, for everyone.
            </HeroDescription>
          </HeroContent>
          <img
            src={Vault}
            alt="Vault Illustration"
            className="aspect-auto max-w-64 w-full drop-shadow-xl drop-shadow-[#00000080]"
          />
        </Hero>

        {/* HERO SECTION */}
        <Section>
          <SectionTitle className="text-transparent bg-[linear-gradient(90deg,_#8e2de2,_#4a00e0)] bg-clip-text">
            Welcome to Digital Guardians
          </SectionTitle>
          <SectionDescription>
            At Digital Guardians, we understand that in today's world, digital
            security is no longer optional — it's essential. With the
            exponential growth of online platforms, managing passwords securely
            and efficiently has become a daily challenge for users around the
            globe. That's why we created Digital Guardians — a modern,
            full-stack password manager built with cutting-edge technologies to
            safeguard your digital identity.
          </SectionDescription>
          <div className="aspect-video max-w-screen-md w-full grid grid-cols-7 grid-rows-4 gap-2.5 sm:gap-3.5 md:gap-5">
            <img
              src={First}
              alt="Security Images 1"
              loading="lazy"
              className="h-full w-full col-start-6 -col-end-1 row-start-1 row-end-3 object-fill rounded-lg shadow-[0_0_8px_#00000060]"
            />
            <img
              src={Second}
              alt="Security Images 2"
              loading="lazy"
              className="h-full w-full col-start-6 -col-end-1 row-start-3 -row-end-1 object-fill rounded-lg shadow-[0_0_8px_#00000060]"
            />
            <img
              src={Third}
              alt="Security Images 3"
              loading="lazy"
              className="h-full w-full col-start-1 col-end-6 row-start-1 -row-end-1 object-fill rounded-lg shadow-[0_0_8px_#00000060]"
            />
          </div>
        </Section>

        {/* OUR MISSION */}
        <Section>
          <SectionTitle className="text-transparent bg-[linear-gradient(90deg,_#8e2de2,_#4a00e0)] bg-clip-text">
            Our Mission
          </SectionTitle>
          <SectionDescription>
            Our mission is to empower users with a secure, intuitive, and
            reliable solution for managing their most sensitive digital
            credentials. We believe every user deserves peace of mind knowing
            their passwords are encrypted, protected, and only accessible to
            them — not hackers, not trackers, not even us.
          </SectionDescription>
          <img
            src={Secure}
            alt="Password Manager"
            loading="lazy"
            className="aspect-auto max-w-screen-sm w-full rounded-xl shadow-[0_0_10px_#00000050]"
          />
        </Section>

        {/* WHAT MAKES US DIFFERENT */}
        <Section>
          <SectionTitle className="text-transparent bg-[linear-gradient(90deg,_#8e2de2,_#4a00e0)] bg-clip-text">
            What Makes Us Different?
          </SectionTitle>
          <SectionDescription>
            Unlike generic password managers that compromise on performance or
            hide critical features behind paywalls, Digital Guardians is
            transparent, fast, and privacy-first. Built with the latest web
            development technologies, we focus on:
          </SectionDescription>
          <ul className="max-w-screen-md w-full list-disc pl-3.5 text-left flex flex-col gap-5">
            {features.map((feature, index) => {
              return (
                <li key={index}>
                  <span className="font-medium text-[var(--text-default)]">
                    {feature.title}:
                  </span>{" "}
                  {feature.description}
                </li>
              );
            })}
          </ul>
        </Section>

        {/* BEHIND THE PROJECT */}
        <Section>
          <SectionTitle className="text-transparent bg-[linear-gradient(90deg,_#8e2de2,_#4a00e0)] bg-clip-text">
            Behind the Project
          </SectionTitle>
          <SectionDescription>
            Digital Guardians is crafted by Mohammad Asad, a passionate Frontend
            Developer on a journey to become a Full Stack Web Developer. Every
            line of code is written with purpose, following best practices in
            web development and cybersecurity. The backend is powered by Node.js
            and Express, using MongoDB for persistent and scalable data storage.
            This isn't just a project — it's a reflection of commitment to
            learning, building, and contributing to the web in a meaningful way.
          </SectionDescription>
          <SectionDescription>
            This isn't just a project — it's a reflection of commitment to
            learning, building, and contributing to the web in a meaningful way.
          </SectionDescription>
        </Section>

        {/* THANK YOU */}
        <Section className="gap-1.5">
          <SectionTitle className="text-transparent bg-[linear-gradient(90deg,_#8e2de2,_#4a00e0)] bg-clip-text">
            Thank You!
          </SectionTitle>
          <SectionDescription>
            Thank you for trusting Digital Guardians. Let's guard your digital
            life — together.
          </SectionDescription>
        </Section>
        
      </main>
      <Footer />
    </>
  );
}

export default About;
