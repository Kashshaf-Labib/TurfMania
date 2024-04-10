//import React from "react";

function Footer() {
  return (
    <footer>
      <div className="footerContainer">
        <div className="socialIcons">
          <a href="#">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
        <div className="footerNav">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Pricing & Refunds</a>
            </li>
            <li>
              <a href="#">Our Team</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footerBottom">
        <p>Copyright &copy;2024</p>
      </div>
    </footer>
  );
}

export default Footer;
