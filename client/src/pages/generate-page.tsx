import GeneratorHero from "@/components/generator-hero";

// UI Components
import { featuresGenerator as features, tips } from "@/data/constant";
import { Section, SectionTitle, SectionDescription, CardContainer } from "@/components/ui/section";

// Layouts
import Navbar from "@/layouts/navbar";
import Footer from "@/layouts/footer";

// Rename the title
document.title = "Random Password Generator • Digital Guardians";

function GeneratorPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* HERO COMPONENT */}
        <GeneratorHero />

        {/* FEATURES */}
        <Section className="gap-7.5">
          <SectionTitle className="text-transparent bg-[linear-gradient(90deg,_#8e2de2,_#4a00e0)] bg-clip-text">
            Features
          </SectionTitle>
          <CardContainer className="max-w-fit gap-3.5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="aspect-[3/4] max-w-52 w-full p-5 flex flex-col items-center justify-center gap-3.5 bg-white rounded-2xl shadow-[0_0_10px_#00000040]"
              >
                {feature.icon}
                <h4 className="text-[1.375rem] font-medium text-[var(--theme-primary)]">
                  {feature.title}
                </h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </CardContainer>
        </Section>

        {/* TIPS & BEST PRACTICES */}
        <Section>
          <SectionTitle className="text-transparent bg-[linear-gradient(90deg,_#8e2de2,_#4a00e0)] bg-clip-text">
            Tips & Best Practices
          </SectionTitle>
          <ul className="w-fit list-disc pl-3.5 text-left flex flex-col gap-2.5">
            {tips.map((tip, index) => <li key={index}>{tip}</li>)}
          </ul>
        </Section>

        {/* DID YOU KNOW (FUN FACT) */}
        <Section>
          <SectionTitle className="text-transparent bg-[linear-gradient(90deg,_#8e2de2,_#4a00e0)] bg-clip-text">
            Did You Know?
          </SectionTitle>
          <SectionDescription>
            A 12-character password with mixed characters has over 95
            quadrillion possible combinations. That's more than enough to keep
            even the most powerful brute-force attacks at bay.
          </SectionDescription>
        </Section>

        {/* YOUR SECURITY IS OUR PRIORITY */}
        <Section>
          <SectionTitle className="text-transparent bg-[linear-gradient(90deg,_#8e2de2,_#4a00e0)] bg-clip-text">
            Your Security is Our Priority
          </SectionTitle>
          <SectionDescription>
            This password generator is entirely browser-based. No data is sent
            to any server, ever. Your generated passwords never leave your
            device.
          </SectionDescription>
        </Section>
        
      </main>
      <Footer />
    </>
  );
}

export default GeneratorPage;
