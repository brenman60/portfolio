import "../styles/footer.css";

const Footer = () => {

  const foundingYear = "2024";
  const currentYear = new Date().getFullYear().toString();
  const copyrightText = currentYear == foundingYear ? `© f{foundingYear} Brennan Kunicki` : `© ${foundingYear}-${currentYear} Brennan Kunicki`;


  return (
    <div id="footer">
      <p id="copyrightFooter">{copyrightText}</p>
      <div id="footerIcons">
        <img className="footerIcon" onClick={() => window.open("https://github.com/brenman60")} src="/portfolio/images/icons/github.png" alt="GitHub" />
        <img className="footerIcon" onClick={() => window.open("https://www.linkedin.com/in/brennan-kunicki-55a83a30a")} src="/portfolio/images/icons/linkedin.png" alt="LinkedIn" />
      </div>
    </div>
  );
};

export default Footer;
