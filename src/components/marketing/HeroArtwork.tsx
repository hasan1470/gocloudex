import HeroMotion from "./HeroMotion";

// Inline vector artwork: no video, image download or animation library.
export default function HeroArtwork() {
  return (
    <HeroMotion>
      <svg
        className="gc-cloud-art"
        viewBox="0 0 600 510"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="gc-art-halo">
            <stop stopColor="var(--accent-light)" stopOpacity=".24" />
            <stop offset="1" stopColor="var(--accent-light)" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="gc-art-glass"
            x1="140"
            y1="120"
            x2="440"
            y2="370"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--accent-light)" stopOpacity=".27" />
            <stop
              offset=".48"
              stopColor="var(--accent-solid)"
              stopOpacity=".1"
            />
            <stop
              offset="1"
              stopColor="var(--accent-solid)"
              stopOpacity=".22"
            />
          </linearGradient>
          <linearGradient
            id="gc-art-edge"
            x1="128"
            y1="125"
            x2="461"
            y2="400"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--accent-light)" stopOpacity=".85" />
            <stop
              offset=".4"
              stopColor="var(--accent-light)"
              stopOpacity=".12"
            />
            <stop
              offset="1"
              stopColor="var(--accent-light)"
              stopOpacity=".65"
            />
          </linearGradient>
          <linearGradient
            id="gc-art-cloud"
            x1="231"
            y1="135"
            x2="365"
            y2="274"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f4faff" />
            <stop offset=".5" stopColor="var(--accent-light)" />
            <stop offset="1" stopColor="var(--accent-solid)" />
          </linearGradient>
          <linearGradient
            id="gc-art-depth"
            x1="217"
            y1="205"
            x2="374"
            y2="295"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--accent-solid)" />
            <stop offset="1" stopColor="var(--accent-deep)" />
          </linearGradient>
          <pattern
            id="gc-art-grid"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".8" fill="#B2D6D0" fillOpacity=".16" />
          </pattern>
        </defs>
        <circle cx="300" cy="253" r="248" fill="url(#gc-art-halo)" />
        <rect x="24" y="16" width="552" height="454" fill="url(#gc-art-grid)" />
        <g stroke="#9CDACD" strokeOpacity=".13">
          <ellipse cx="300" cy="312" rx="270" ry="124" />
          <ellipse cx="300" cy="312" rx="223" ry="96" />
          <path d="M30 312H570M300 38V453" strokeDasharray="3 9" />
          <path
            d="M30 66V44H52M548 44H570V66M30 423V445H52M548 445H570V423"
            strokeOpacity=".4"
          />
        </g>
        <g className="gc-art-orbit">
          <ellipse
            cx="300"
            cy="312"
            rx="270"
            ry="124"
            stroke="var(--accent-light)"
            strokeOpacity=".7"
            strokeDasharray="3 240 18 420"
            strokeLinecap="round"
          />
        </g>
        <g className="gc-art-base">
          <path
            d="M300 229L471 326L300 426L129 326L300 229Z"
            fill="#163642"
            fillOpacity=".5"
            stroke="url(#gc-art-edge)"
          />
          <path
            d="M129 326V338L300 439L471 338V326M300 426V439"
            stroke="#7BADC3"
            strokeOpacity=".28"
          />
          <path
            d="M153 342L300 428L447 342"
            stroke="var(--accent-light)"
            strokeOpacity=".7"
          />
        </g>
        <g className="gc-art-middle">
          <path
            d="M300 176L471 274L300 374L129 274L300 176Z"
            fill="url(#gc-art-glass)"
            stroke="url(#gc-art-edge)"
          />
          <path
            d="M129 274V286L300 387L471 286V274M300 374V387"
            stroke="#94C9D5"
            strokeOpacity=".3"
          />
          <path
            d="M168 275L300 351L432 275"
            stroke="#97DACC"
            strokeOpacity=".32"
            strokeDasharray="3 7"
          />
        </g>
        <g className="gc-art-float">
          <path
            d="M300 96L471 194V207L300 308L129 207V194L300 96Z"
            fill="#173D46"
            fillOpacity=".85"
          />
          <path
            d="M300 96L471 194L300 294L129 194L300 96Z"
            fill="url(#gc-art-glass)"
            stroke="url(#gc-art-edge)"
            strokeWidth="1.4"
          />
          <path
            d="M129 194V207L300 308L471 207V194M300 294V308"
            stroke="url(#gc-art-edge)"
          />
          <path
            d="M159 195L300 115L441 195"
            stroke="#D5FFE9"
            strokeOpacity=".23"
          />
          <path
            d="M243 244C222 244 209 230 209 213C209 197 221 184 237 181C241 159 260 145 280 145C302 145 320 159 325 178C330 175 336 173 343 173C365 173 382 190 382 211C382 230 367 244 347 244H243Z"
            transform="translate(0 13)"
            fill="url(#gc-art-depth)"
            stroke="#7DBCB8"
            strokeOpacity=".3"
          />
          <path
            d="M243 244C222 244 209 230 209 213C209 197 221 184 237 181C241 159 260 145 280 145C302 145 320 159 325 178C330 175 336 173 343 173C365 173 382 190 382 211C382 230 367 244 347 244H243Z"
            fill="url(#gc-art-cloud)"
            stroke="#E4FFF1"
            strokeWidth="1.4"
          />
          <path
            d="M268 195L256 207L268 219M289 222L302 192M321 195L333 207L321 219"
            stroke="#245A60"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M209 213C209 197 221 184 237 181C241 159 260 145 280 145"
            stroke="white"
            strokeOpacity=".8"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g stroke="#A5DCCC" strokeOpacity=".4" strokeDasharray="2 5">
          <path d="M157 154H95V118H67M428 210H517V180H541M357 399H420V421H466" />
        </g>
        <g fill="var(--accent-light)">
          <circle cx="157" cy="154" r="3" />
          <circle cx="428" cy="210" r="3" />
          <circle cx="357" cy="399" r="3" />
        </g>
        <g
          className="gc-art-spark"
          stroke="var(--accent-light)"
          strokeWidth="1.4"
        >
          <path d="M452 103V117M445 110H459M92 352V362M87 357H97" />
        </g>
      </svg>
    </HeroMotion>
  );
}
