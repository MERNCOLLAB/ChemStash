

const MarqueeBackground = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 623 662" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H623V662H0V0ZM10 473.5C10 454.998 24.9985 440 43.5 440C62.0015 440 77 454.998 77 473.5V611.5C77 630.002 62.0015 645 43.5 645C24.9985 645 10 630.002 10 611.5V473.5ZM10 52C10 29.9086 27.9086 12 50 12H572C594.091 12 612 29.9086 612 52V612C612 634.091 594.091 652 572 652H125.5C103.409 652 85.5 634.091 85.5 612V470.95C85.5 450.101 68.5987 433.2 47.75 433.2C26.9013 433.2 10 416.299 10 395.45V52Z"
      fill="#F2F5F9"
    />
    <g filter="url(#filter0_i_611_1069)">
      <path
        d="M10 473.5C10 454.998 24.9985 440 43.5 440V440C62.0015 440 77 454.998 77 473.5V611.5C77 630.002 62.0015 645 43.5 645V645C24.9985 645 10 630.002 10 611.5V473.5Z"
        fill="url(#paint0_linear_611_1069)"
        fillOpacity="0.02"
      />
    </g>
    <g filter="url(#filter1_i_611_1069)">
      <path
        d="M10 52C10 29.9086 27.9086 12 50 12H572C594.091 12 612 29.9086 612 52V612C612 634.091 594.091 652 572 652H125.5C103.409 652 85.5 634.091 85.5 612V470.95C85.5 450.101 68.5987 433.2 47.75 433.2V433.2C26.9013 433.2 10 416.299 10 395.45V52Z"
        fill="url(#paint1_linear_611_1069)"
        fillOpacity="0.02"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_611_1069"
        x="10"
        y="440"
        width="69"
        height="207"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="2" dy="2" />
        <feGaussianBlur stdDeviation="10" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.0156863 0 0 0 0 0.52549 0 0 0 0 0.584314 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_611_1069" />
      </filter>
      <filter
        id="filter1_i_611_1069"
        x="10"
        y="12"
        width="610"
        height="648"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="8" dy="8" />
        <feGaussianBlur stdDeviation="25" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0170139 0 0 0 0 0.526702 0 0 0 0 0.583333 0 0 0 0.25 0"
        />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_611_1069" />
      </filter>
      <linearGradient
        id="paint0_linear_611_1069"
        x1="43.5"
        y1="440"
        x2="43.5"
        y2="645"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00F6FF" />
        <stop offset="1" stopColor="#737373" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_611_1069"
        x1="311"
        y1="12"
        x2="612"
        y2="762"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00F6FF" />
        <stop offset="1" stopColor="#798596" />
      </linearGradient>
    </defs>
  </svg>
  )
}

export default MarqueeBackground;
