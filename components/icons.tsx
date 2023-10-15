import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Loader2,
  MoreVertical,
  Plus,
  Settings,
  Trash,
  Twitter,
  User,
  X,
  Moon,
  Sun,
  MoreHorizontal,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  type LucideIcon,
  type LucideProps,
  Monitor,
  Smartphone,
  Square,
  Wand,
  Type,
  PlusIcon,
  Ratio,
  Film,
  MoveUpIcon,
  MoveDownIcon,
  Paintbrush,
  Play,
  Pause,
  Save,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  moon: Moon,
  sun: Sun,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  horizontalEllipsis: MoreHorizontal,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  alignCenter: AlignCenter,
  alignJustify: AlignJustify,
  alignLeft: AlignLeft,
  alignRight: AlignRight,
  monitor: Monitor,
  smartphone: Smartphone,
  square: Square,
  magicWand: Wand,
  typography: Type,
  plusIcon: PlusIcon,
  screenSize: Ratio,
  mediaAssets: Film,
  moveUp: MoveUpIcon,
  moveDown: MoveDownIcon,
  paintBrush: Paintbrush,
  playIcon: Play,
  pauseIcon: Pause,
  save: Save,
  logo: ({ ...props }: LucideProps) => (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_34)">
        <rect width="45" height="45" rx="22.5" fill="black" />
        <path
          d="M21.2421 20.49V26.8379C21.242 26.9177 21.2631 26.996 21.303 27.0651C21.343 27.1341 21.4004 27.1914 21.4696 27.2312C21.5388 27.2709 21.6172 27.2917 21.697 27.2914C21.7768 27.2911 21.8551 27.2698 21.924 27.2296L27.365 24.0557C27.4335 24.0158 27.4904 23.9586 27.5299 23.8899C27.5694 23.8211 27.5901 23.7432 27.5901 23.6639C27.5901 23.5847 27.5694 23.5068 27.5299 23.438C27.4904 23.3693 27.4335 23.3121 27.365 23.2722L21.924 20.0983C21.8551 20.0581 21.7768 20.0367 21.697 20.0365C21.6172 20.0362 21.5388 20.057 21.4696 20.0967C21.4004 20.1365 21.343 20.1938 21.303 20.2628C21.2631 20.3319 21.242 20.4102 21.2421 20.49Z"
          fill="white"
        />
        <path
          d="M28.9501 19.987C29.0612 19.987 29.1684 20.0278 29.2514 20.1016C29.3344 20.1754 29.3874 20.2771 29.4004 20.3874L29.4035 20.4404V26.7883C29.4034 26.9039 29.3592 27.015 29.2798 27.0991C29.2005 27.1831 29.0921 27.2337 28.9767 27.2404C28.8613 27.2472 28.7477 27.2097 28.6591 27.1355C28.5705 27.0613 28.5135 26.9561 28.4999 26.8413L28.4967 26.7883V20.4404C28.4967 20.3202 28.5445 20.2049 28.6295 20.1198C28.7145 20.0348 28.8299 19.987 28.9501 19.987Z"
          fill="#00D8CB"
        />
        <path
          d="M37.8749 21.7269L27.6443 11.2569C26.7143 10.3052 25.2685 10.0798 24.0929 10.7033L4.8202 20.9252C2.60266 22.1013 2.724 25.3184 5.02384 26.3242L25.4939 35.276C26.6066 35.7626 27.9029 35.5304 28.7775 34.6877L37.8108 25.984C39.0098 24.8286 39.0386 22.9179 37.8749 21.7269Z"
          stroke="white"
          strokeWidth="2"
        />
        <g filter="url(#filter0_f_1_34)">
          <rect
            x="-1.48328"
            y="1"
            width="30.4989"
            height="33.9225"
            transform="rotate(29.1369 -1.48328 1)"
            fill="black"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_1_34"
          x="-35"
          y="-16"
          width="77.1562"
          height="78.4797"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="8.5"
            result="effect1_foregroundBlur_1_34"
          />
        </filter>
        <clipPath id="clip0_1_34">
          <rect width="45" height="45" rx="22.5" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="discord"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      ></path>
    </svg>
  ),
  twitter: Twitter,
  check: Check,
};
