import {
  FaBookOpen,
  FaCode,
  FaGlobe,
  FaLinux,
  FaShieldHalved,
  FaTerminal,
  FaToolbox,
} from "react-icons/fa6";

const icons = {
  globe: <FaGlobe />,
  linux: <FaLinux />,
  code: <FaCode />,
  toolbox: <FaToolbox />,
  book: <FaBookOpen />,
  terminal: <FaTerminal />,
  shield: <FaShieldHalved />,
};

const VpResourceIcon = ({ icon = "book" }) => icons[icon] || icons.book;

export default VpResourceIcon;
