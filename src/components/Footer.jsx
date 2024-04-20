function Footer({ bgColor, padding, fontSize, textColor }) {
  return (
    <footer
      className={`${bgColor} ${padding} w-screen flex flex-row justify-center `}
    >
      <h4 className={`font-poppins ${fontSize} ${textColor}`}>
        ©️ 2024 Thiago L. Matos. All rights reserved.
      </h4>
    </footer>
  );
}

export default Footer;
