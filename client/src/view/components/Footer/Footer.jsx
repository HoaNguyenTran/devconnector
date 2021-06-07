import { Divider } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__category">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/readinglist">Reading List</Link>
          </li>
          <li>
            <Link to="/listing">Listings</Link>
          </li>
          <li>
            <Link to="/pod">Podcasts</Link>
          </li>
          <li>
            <Link to="/videos">Videos</Link>
          </li>
          <li>
            <Link to="/tags">Tags</Link>
          </li>
          <li>
            <Link to="/code-of-onduct">Code of Conduct</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/shop-dev">Dev Shop</Link>
          </li>
          <li>
            <Link to="/sponsors">Sponsors</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms">Terms of use</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/new">Write a post</Link>
          </li>
        </ul>
        <div className="footer__social">
          <div className="footer__social--inner">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <FacebookIcon />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <TwitterIcon />
            </a>
            <a href="https://www.github.com" target="_blank" rel="noreferrer">
              <GitHubIcon />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              <LinkedInIcon />
            </a>
          </div>
          <Divider />
        </div>
        <div className="footer__description">
          <p>
            <b>DevConnector</b> - A constructive and inclusive social network
            for software developers. With you every step of your journey.
          </p>
          <p>
            <b>DevConnector</b> get inspried of <a href="https://www.dev.to" target="_blank" rel="noreferrer">DEV Community</a> ♥︎
          </p>
        </div>
      </div>
    </footer>
  );
}
