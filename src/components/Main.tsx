import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import avatar from '../assets/images/Avatar.png'
import itchIcon from '../assets/images/itch logo.png'
import artstationIcon from '../assets/images/artstationLogo.png'

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={avatar} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/pterafier" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/durkin482/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="https://pterafier.itch.io" target="_blank" rel="noreferrer">
              <img src={itchIcon} alt="Itch.io" className="social-icon"/>
            </a>
            <a href="https://michaeldurkin_codes.artstation.com/" target="_blank" rel="noreferrer">
              <img src={artstationIcon} alt="Itch.io" className="social-icon"/>
            </a>
          </div>
          <h1>Michael Durkin</h1>
          <p>Gameplay Programmer & Technical Designer</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/pterafier" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/durkin482/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="https://pterafier.itch.io" target="_blank" rel="noreferrer">
              <img src={itchIcon} alt="Itch.io" className="social-icon"/>
            </a>
            <a href="https://michaeldurkin_codes.artstation.com/" target="_blank" rel="noreferrer">
              <img src={artstationIcon} alt="Itch.io" className="social-icon"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;