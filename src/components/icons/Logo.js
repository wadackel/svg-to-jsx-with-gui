import React from 'react';

const Logo = props => (
  <svg width="214px" height="139px" viewBox="0 0 214 139" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" {...props}>
    <defs>
      <linearGradient x1="75.9899742%" y1="91.918713%" x2="19.295843%" y2="7.23037329%" id="a">
        <stop stopColor="#FFF8B3" offset="0%" />
        <stop stopColor="#E2CBE3" offset="100%" />
      </linearGradient>
      <linearGradient x1="50%" y1="5.00812137%" x2="31.348217%" y2="100%" id="b">
        <stop stopColor="#FFFBD3" offset="0%" />
        <stop stopColor="#9CD5E2" offset="100%" />
      </linearGradient>
    </defs>
    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <g fillRule="nonzero">
        <g>
          <path d="M144.296465,117.379726 L192.379726,69.2964646 L144.296465,21.2132034 L106.796465,58.7132034 L69.2964646,21.2132034 L21.2132034,69.2964646 L69.2964646,117.379726 L106.796465,79.8797257 L144.296465,117.379726 Z M69.2964646,138.592929 L0,69.2964646 L69.2964646,0 L106.796465,37.5 L144.296465,0 L213.592929,69.2964646 L144.296465,138.592929 L106.796465,101.092929 L69.2964646,138.592929 Z" fill="url(#a)" />
          <path d="M58.2132034,69.2964646 L106.296465,117.379726 L154.379726,69.2964646 L106.296465,21.2132034 L58.2132034,69.2964646 Z M106.296465,0 L175.592929,69.2964646 L106.296465,138.592929 L37,69.2964646 L106.296465,0 Z" fill="url(#b)" />
        </g>
      </g>
    </g>
  </svg>
);

export default Logo;
