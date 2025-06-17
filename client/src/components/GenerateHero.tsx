import { useState } from "react";

// UI Components
import {
  Hero,
  HeroContent,
  HeroTitle,
  HeroDescription,
} from "@/components/ui/hero";

// React-icons
import { FiCopy } from "react-icons/fi";
import { FaPlus, FaMinus } from "react-icons/fa6";

// Utility functions
import handleCopy from "@/utilities/handleCopy";
import generatePassword from "@/utilities/generatePassword";

function GenerateHero() {
  // Hooks
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");

  return (
    <Hero>

      {/* CONTENT */}
      <HeroContent>
        <HeroTitle className="text-transparent bg-[linear-gradient(270deg,_#ff8156_2.2%,_#df4584_38.7%,_#432581_90.2%)] bg-clip-text">
          Random Password Generator
        </HeroTitle>
        <HeroDescription className="max-w-lg">
          Protect your online accounts with randomly generated, uncrackable
          passwords. Customize the length and generate in a single click.
        </HeroDescription>
      </HeroContent>

      {/* PASSWORD GENERATOR MODAL BOX */}
      <div className="max-w-md w-full p-5 flex flex-col items-center justify-center gap-5 bg-white rounded-2xl shadow-[0_0_10px_#00000040]">

        {/* GENERATED PASSWORD FIELD */}
        <div className="h-11 w-full px-5 flex items-center justify-between gap-3.5 text-[var(--text-primary)] bg-[var(--bg-primary)] rounded-full">
          <input
            type="text"
            value={password}
            readOnly={true}
            placeholder="Generated Password"
            className="w-full py-2.5 text-nowrap outline-none placeholder:text-[var(--text-tertiary)]"
          />
          <button
            onClick={() => handleCopy(password)}
            className="text-[var(--icon-secondary)] cursor-pointer hover:text-[var(--icon-primary)]"
          >
            <FiCopy />
          </button>
        </div>

        {/* BUTTONS (CLEAR & GENERATE) */}
        <div className="w-full text-white font-medium flex items-center justify-center gap-3.5">
          <button
            onClick={() => setPassword("")}
            className="h-10 w-full bg-red-500 cursor-pointer rounded-full hover:bg-red-400"
          >
            Clear
          </button>
          <button
            onClick={() => setPassword(generatePassword(length))}
            className="h-10 w-full bg-[var(--theme-primary)] cursor-pointer rounded-full hover:bg-[var(--theme-secondary)]"
          >
            Generate
          </button>
        </div>

        {/* PASSWORD LENGTH */}
        <h6 className="font-medium text-[var(--text-primary)]">
          Password Length: {length}
        </h6>

        {/* SEEKBAR AND BUTTONS */}
        <div className="w-full flex items-center justify-evenly gap-5">
          <button
            disabled={length === 8}
            onClick={() => setLength((val) => val - 1)}
            className="p-5 text-[var(--icon-secondary)] cursor-pointer border border-[var(--icon-secondary)] rounded-full hover:text-[var(--icon-primary)] hover:border-[var(--icon-primary)] disabled:text-[var(--bg-disabled)] disabled:border-[var(--bg-disabled)] disabled:cursor-no-drop"
          >
            <FaMinus />
          </button>
          <input
            type="range"
            id="seekbar"
            value={length}
            onChange={(event) => setLength(Number(event.target.value))}
            min={8}
            max={64}
          />
          <button
            disabled={length === 64}
            onClick={() => setLength((val) => val + 1)}
            className="p-5 text-[var(--icon-secondary)] cursor-pointer border border-[var(--icon-secondary)] rounded-full hover:text-[var(--icon-primary)] hover:border-[var(--icon-primary)] disabled:text-[var(--bg-disabled)] disabled:border-[var(--bg-disabled)] disabled:cursor-no-drop"
          >
            <FaPlus />
          </button>
        </div>
        
      </div>

    </Hero>
  );
}

export default GenerateHero;
