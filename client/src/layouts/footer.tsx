import { Link } from "react-router";
import { footerLinks } from "@/data/constant";

function Footer() {
  const date = new Date();
  return (
    <footer className="w-full bg-[#141F23]">

      {/* CONTENT SECTION */}
      <div className="w-full py-12 px-5 text-center flex flex-col items-center justify-center gap-2.5 border-b border-[#888888]">
        <h2 className="text-4xl font-bold text-[#F1F1F1]">Get Started Today</h2>
        <h5 className="text-lg font-medium text-[#E6E6E6]">
          Don't leave your digital life to chance.
        </h5>
        <p className="max-w-md tracking-wider text-sm font-light text-[#B0B0B0]">
          We don't sell your data. We don't track you. We believe privacy is a
          fundamental right — and Digital Guardians is built on that belief.
        </p>
      </div>

      {/* SOCIAL MEDIA LINKS & COPYRIGHT */}
      <div className="w-full p-7.5 text-[#E6E6E6] flex flex-col items-center justify-center gap-5">
        <div className="w-fit text-5xl flex items-center justify-center gap-3.5">
          {footerLinks.map(({ icon, link }, index) => (
            <Link
              key={index}
              to={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {icon}
            </Link>
          ))}
        </div>
        <h6 className="tracking-widest text-center text-xs text-[#B0B0B0]">
          Copyright © {date.getFullYear()} Digital Guardians.
          <br />
          All Rights Reserved.
        </h6>
      </div>
      
    </footer>
  );
}

export default Footer;
