// React-icons
import { FaRandom } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { VscSymbolInterface } from "react-icons/vsc";
import { GiFastArrow, GiBrain } from "react-icons/gi";
import { BiLogoMongodb, BiLogoTypescript } from "react-icons/bi";
import { IoShieldCheckmark, IoInfiniteSharp } from "react-icons/io5";
import { TbDeviceRemoteFilled, TbEdit, TbLogout } from "react-icons/tb";
import {
  RiAiGenerateText,
  RiShieldKeyholeFill,
  RiInstagramFill,
  RiDeleteBin5Line,
} from "react-icons/ri";
import {
  SiEasyeda,
  SiExpress,
  SiTailwindcss,
  SiReactrouter,
} from "react-icons/si";
import {
  FaVault,
  FaServer,
  FaReact,
  FaNodeJs,
  FaRuler,
  FaShieldHalved,
  FaGithub,
  FaLinkedin,
  FaSquareXTwitter,
} from "react-icons/fa6";

// Navbar Links
export const authenticatedLinks = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Vault",
    href: "/vault",
  },
  {
    text: "Generator",
    href: "/generate-password",
  },
  {
    text: "About Us",
    href: "/about-us",
  },
  {
    text: "Account",
    href: "/account",
  },
];
export const unauthenticatedLinks = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Generator",
    href: "/generate-password",
  },
  {
    text: "About Us",
    href: "/about-us",
  },
  {
    text: "Login",
    href: "/auth/login",
  },
  {
    text: "Signup",
    href: "/auth/signup",
  },
];

// Home Page Data
export const featuresHome = [
  {
    icon: <FaVault className="mb-3.5 text-7xl text-[var(--theme-primary)]" />,
    title: "Password Encryption",
    description:
      "All stored passwords are enrypted using AES-256, providing strong encryption to keep your credentials safe from unauthorized access or data leaks.",
  },
  {
    icon: (
      <IoShieldCheckmark className="mb-3.5 text-7xl text-[var(--theme-primary)]" />
    ),
    title: "Secure Authentication",
    description:
      "Authentication is powered by JWT tokens, enabling secure and stateless login sessions with reliable identity verification on every request.",
  },
  {
    icon: (
      <RiAiGenerateText className="mb-3.5 text-7xl text-[var(--theme-primary)]" />
    ),
    title: "Password Generator",
    description:
      "Generate strong, random passwords instantly. Our tool helps you avoid weak or reused credentials with one simple click.",
  },
  {
    icon: (
      <TbDeviceRemoteFilled className="mb-3.5 text-7xl text-[var(--theme-primary)]" />
    ),
    title: "Credential Control",
    description:
      "Perform full CRUD operations—add, update, or delete saved credentials seamlessly, with data securely stored in MongoDB.",
  },
  {
    icon: <FaServer className="mb-3.5 text-7xl text-[var(--theme-primary)]" />,
    title: "Backend Power",
    description:
      "Built with Express.js and MongoDB, the backend ensures efficient routing, fast queries, and reliable data handling using Mongoose.",
  },
  {
    icon: (
      <VscSymbolInterface className="mb-3.5 text-7xl text-[var(--theme-primary)]" />
    ),
    title: "Modern UI",
    description:
      "Crafted with React and styled using Tailwind CSS, the frontend delivers a responsive, clean, and modern interface across all devices.",
  },
];
export const security = [
  {
    title: "Data Encryption (AES-256 Encryption for Password Storage)",
    description:
      "We utilize the AES-256 encryption algorithm—an advanced, military-grade symmetric encryption standard—to securely encrypt your stored passwords. Unlike hashing, which is one-way and used for authentication, AES-256 enables us to safely encrypt and later decrypt your saved passwords when needed. Each password you store in your vault is encrypted using a unique key derived from a secure process, making it virtually impossible for attackers to access or interpret even if they breach the database. AES-256 is recognized globally for its strength and reliability, offering a balance of speed and unparalleled security in protecting your most sensitive information.",
  },
  {
    title: "Authentication (bcrypt + JWT Login Protection)",
    description:
      "For user authentication, we apply a dual-layered security model. Your login password is first hashed using bcrypt, a robust algorithm that turns it into a secure, irreversible format before storage. Upon successful login, we generate a JSON Web Token (JWT) to identify and authorize you for accessing protected parts of the application. The token, containing encrypted session information, is signed and time-limited to prevent unauthorized usage. This combination ensures your credentials are both safely stored and securely validated, adhering to modern security standards and making unauthorized access nearly impossible without the correct hashed password and a valid token.",
  },
  {
    title: "Session Security (HttpOnly Cookies for Token Storage)",
    description:
      "To protect your session from unauthorized access, we store authentication tokens in HttpOnly cookies—a secure method that prevents JavaScript from accessing them directly. This significantly reduces the risk of cross-site scripting (XSS) attacks, which commonly aim to steal user credentials through malicious scripts. HttpOnly cookies are also sent automatically with every request to the server, streamlining secure communication without exposing sensitive data. We ensure that your session remains confidential and protected at all times. This layered security strategy enhances trust and minimizes vulnerabilities in your user experience.",
  },
];
export const reasons = [
  {
    icon: <RiShieldKeyholeFill className="text-5xl" />,
    title: "Strong Data Security",
    description:
      "DG encrypts your passwords and secures your account with trusted authentication methods.",
  },
  {
    icon: <SiEasyeda className="text-5xl" />,
    title: "Easy to Use Design",
    description:
      "Its clean, intuitive, and user-friendly interface makes password management simple and smooth.",
  },
  {
    icon: <FaRandom className="text-5xl" />,
    title: "Random Password Gen",
    description:
      "Easily create strong, unique passwords using the built-in random password generator.",
  },
  {
    icon: <GiFastArrow className="text-5xl" />,
    title: "Fast and Reliable",
    description:
      "Powered by the MERN stack, DG delivers quick performance and reliable access anytime.",
  },
];
export const stackIcons: Array<React.ReactElement> = [
  <BiLogoMongodb color="#008236" size="100%" />,
  <SiExpress color="#000000" size="90%" />,
  <FaReact color="#2b7fff" size="90%" />,
  <FaNodeJs color="#00a63e" size="90%" />,
  <SiReactrouter color="#f44250" size="85%" />,
  <BiLogoTypescript color="#155dfc" size="100%" />,
  <SiTailwindcss color="#51a2ff" size="80%" />,
];

// Generate Password Page Data
export const featuresGenerator = [
  {
    icon: <GiBrain className="text-5xl text-[var(--theme-primary)]" />,
    title: "Human Proof",
    description:
      "Uses modern cryptography to ensure unpredictable, secure passwords every time.",
  },
  {
    icon: <FaRuler className="text-5xl text-[var(--theme-primary)]" />,
    title: "Length Control",
    description:
      "Select your desired password length for better flexibility and enhanced security.",
  },
  {
    icon: <IoInfiniteSharp className="text-5xl text-[var(--theme-primary)]" />,
    title: "Endless Access",
    description:
      "Generate unlimited passwords anytime you need—completely free and without restrictions.",
  },
  {
    icon: <FaShieldHalved className="text-5xl text-[var(--theme-primary)]" />,
    title: "Privacy First",
    description:
      "We never store or track anything you create. Your data remains entirely yours.",
  },
];
export const tips = [
  "Use a different password for every account.",
  "Enable two-factor authentication wherever possible.",
  "Don't reuse passwords, even for accounts you don't use often.",
  "Use a password manager to securely store complex passwords.",
];

// About Us Page Data
export const featuresAbout = [
  {
    title: "End-to-end security",
    description:
      "We use industry-standard encryption (bcrypt) and JWT-based authentication to ensure that your data is encrypted and only accessible to you.",
  },
  {
    title: "User-first design",
    description:
      "Built using React + TypeScript + Tailwind CSS, our frontend is designed to be clean, responsive, and distraction-free, offering an effortless user experience.",
  },
  {
    title: "Real-time performance",
    description:
      "With TanStack Query, your password data syncs seamlessly across the app without unnecessary delays or refreshes.",
  },
  {
    title: "Random Password Generator",
    description:
      "An integrated random password generator that adheres to industry best practices and regulatory standards for robust password security.",
  },
];

// Account Page Links
export const accountLinks = [
  {
    icon: <TbEdit size="1.25rem" />,
    text: "Edit profile",
    href: "/account/edit-profile",
  },
  {
    icon: <MdOutlinePassword size="1.25rem" />,
    text: "Change password",
    href: "/account/change-password",
  },
  {
    icon: <RiDeleteBin5Line size="1.25rem" />,
    text: "Delete Account",
    href: "/account/delete-account",
  },
  {
    icon: <TbLogout size="1.25rem" />,
    text: "Logout",
    href: "/account/logout",
  },
];

// Footer Links
export const footerLinks = [
  {
    icon: <FaGithub />,
    link: "https://github.com/MohammadAsad-Weber",
  },
  {
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/mohammad-asad-091b6a217/",
  },
  {
    icon: <FaSquareXTwitter />,
    link: "https://x.com/IronCodeNagi",
  },
  {
    icon: <RiInstagramFill />,
    link: "https://www.instagram.com/asad.lifts059/",
  },
];
