import Lock from "@/assets/images/lock.png";
import { featuresHome as features, security, reasons, stackIcons } from "@/data/constant";

// UI Components
import { Section, SectionTitle, CardContainer } from "@/components/ui/section";
import { Hero, HeroContent, HeroTitle, HeroDescription } from "@/components/ui/hero";

// Layouts
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";

// Rename the title
document.title = "Home • Digital Guardians";

function Home() {
  return (
    <>
      <Navbar />
      <main>

        {/* HERO SECTION */}
        <Hero className="min-h-[448px] md:pt-16 md:flex-row-reverse">
          <img
            src={Lock}
            alt="Lock Image"
            className="aspect-square max-h-60 h-full"
          />
          <HeroContent className="max-w-lg md:text-right md:items-end">
            <HeroTitle className="text-transparent bg-[linear-gradient(225deg,_#FF3CAC_0%,_#784BA0_50%,_#2B86C5_100%)] bg-clip-text">
              Digital Guradians
              <br />
              Password Manager
            </HeroTitle>
            <HeroDescription>
              Digital Guardians is your trusted companion in managing and
              protecting your digital life. Store your passwords with
              military-grade encryption, access them securely, and generate
              strong, unbreakable passwords - all in one place.
            </HeroDescription>
          </HeroContent>
        </Hero>

        {/* KEY FEATURES */}
        <Section className="gap-7.5">
          <SectionTitle className="text-transparent bg-[linear-gradient(90deg,_#8e2de2,_#4a00e0)] bg-clip-text">
            Key Features
          </SectionTitle>
          <CardContainer className="max-w-screen-lg">
            {features.map((feature, index) => {
              return (
                <div
                  key={index}
                  className="aspect-[3/4] max-w-64 w-full p-5 text-center flex flex-col items-center justify-center gap-2.5 bg-white rounded-2xl shadow-[0_0_10px_#00000040]"
                >
                  {feature.icon}
                  <h4 className="text-lg font-medium">{feature.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </CardContainer>
        </Section>

        {/* HOW WE PROTECT YOU */}
        <Section className="gap-10">
          <SectionTitle className="text-transparent bg-[linear-gradient(90deg,_#8e2de2,_#4a00e0)] bg-clip-text">
            How We Protect You
          </SectionTitle>
          <div className="max-w-screen-lg w-full flex flex-col items-center justify-center gap-10">
            {security.map((object, index) => {
              return (
                <div
                  key={index}
                  className="text-center flex flex-col items-center justify-center gap-2.5"
                >
                  <h3 className="text-2xl font-medium text-[var(--theme-primary)]">
                    {object.title}
                  </h3>
                  <p className="tracking-wider text-sm text-[var(--text-primary)]">
                    {object.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* WHY DIGITAL GUARDIANS */}
        <Section className="gap-7.5">
          <SectionTitle className="text-transparent bg-[linear-gradient(90deg,_#8e2de2,_#4a00e0)] bg-clip-text">
            Why Digital Guardians?
          </SectionTitle>
          <CardContainer className="max-w-screen-lg">
            {reasons.map((reason, index) => {
              return (
                <div
                  key={index}
                  className="aspect-video max-w-sm w-full p-5 text-left flex flex-col justify-evenly gap-3.5 bg-white rounded-2xl shadow-[0_0_10px_#00000040]"
                >
                  <div className="w-full text-[var(--theme-primary)] flex items-center gap-5">
                    {reason.icon}
                    <h4 className="text-[1.375rem] font-medium">
                      {reason.title}
                    </h4>
                  </div>
                  <p className="text-[var(--text-secondary)]">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </CardContainer>
        </Section>

        {/* BUILT WITH MODERN WEB TECH */}
        <Section className="gap-7.5">
          <SectionTitle className="text-transparent bg-[linear-gradient(90deg,_#8e2de2,_#4a00e0)] bg-clip-text">
            Built With Modern Web Tech
          </SectionTitle>
          <h5 className="max-w-screen-sm text-center text-lg font-medium">
            Digital Guardians is powered by the MERN Stack: MongoDB, Express.js,
            React.js, and Node.js, with state-of-the-art tooling including
            TypeScript, Redux Toolkit, and Tailwind CSS.
          </h5>
          <CardContainer className="max-w-screen-sm">
            {stackIcons.map((icon, index) => {
              return (
                <div
                  key={index}
                  className="h-32 w-32 p-5 flex items-center justify-center bg-white rounded-full shadow-[0_0_10px_#00000040]"
                >
                  {icon}
                </div>
              );
            })}
          </CardContainer>
        </Section>
        
      </main>
      <Footer />
    </>
  );
}

export default Home;
