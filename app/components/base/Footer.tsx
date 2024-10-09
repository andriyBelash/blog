import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="h-[100px] secondary-background border-t border-[var(--border)] ">
      <div className="h-full flex items-center wrapper w-full justify-between">
        <span className="text-secondary-text">Copyright © 2024 Next Blog. All rights reserved.</span>
        <div className="flex items-center gap-[12px]">
          <a target="blank" href='https://github.com/andriyBelash'>
            <FaGithub size={28} />
          </a>
          <a target="blank" href="https://www.linkedin.com/in/andriy-belash-bb90a2250/">
            <FaLinkedin size={28} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer