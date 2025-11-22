"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const MacbookScroll = ({
  src,
  showGradient,
  title,
  badge,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.2, isMobile ? 1 : 1.5]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.6, isMobile ? 1 : 1.5]
  );
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const translate = useTransform(scrollYProgress, [0.1, 0.3], [0, 0]); // Changed from 1500 to 0
  const translateY = useTransform(scrollYProgress, [0, 0.3], [0, -100]); // Changed from -1000 to -100

  return (
    <div
      ref={ref}
      className="min-h-screen flex flex-col items-center py-10 md:py-20 justify-start flex-shrink-0 [perspective:800px] transform md:scale-100 scale-[0.35] sm:scale-50"
    >
      <motion.h2
        style={{
          translateY: translateY,
        }}
        className="text-neutral-200 text-3xl font-bold mb-20 text-center"
      >
        {title || (
          <span>
            Modern Student Management <br /> System
          </span>
        )}
      </motion.h2>
      {/* Lid */}
      <Lid
        src={src}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      />
      {/* Base area */}
      <div className="h-[22rem] w-[32rem] bg-gray-900 dark:bg-[#272729] rounded-2xl overflow-hidden relative -z-10">
        {/* above keyboard bar */}
        <div className="h-10 w-full relative">
          <div className="absolute inset-x-0 mx-auto w-[80%] h-4 bg-[#050505]" />
        </div>
        <div className="flex relative">
          <div className="mx-auto w-[10%] overflow-hidden h-full">
            <SpeakerGrid />
          </div>
          <div className="mx-auto w-[80%] h-full">
            <Keypad />
          </div>
          <div className="mx-auto w-[10%] overflow-hidden h-full">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="h-2 w-20 mx-auto inset-x-0 absolute bottom-0 bg-gradient-to-t from-[#272729] to-[#050505] rounded-tr-3xl rounded-tl-3xl" />
        {showGradient && (
          <div className="h-40 w-full absolute bottom-0 inset-x-0 bg-gradient-to-t dark:from-black from-white via-white dark:via-black to-transparent z-50"></div>
        )}
        {badge && <div className="absolute bottom-10 left-10">{badge}</div>}
      </div>
    </div>
  );
};

export const Lid = ({ scaleX, scaleY, rotate, translate, src }) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="h-[12rem] w-[32rem] bg-[#010101] rounded-2xl p-2 relative"
      >
        <div
          style={{
            boxShadow: "0px 2px 0px 2px var(--neutral-900) inset",
          }}
          className="absolute inset-0 bg-[#010101] rounded-lg flex items-center justify-center"
        >
          <span className="text-white">
            <AceternityLogo />
          </span>
        </div>
      </div>
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top center",
        }}
        className="h-96 w-[32rem] absolute inset-0 bg-[#010101] rounded-2xl p-2"
      >
        <div className="absolute inset-0 bg-[#272729] rounded-lg overflow-hidden">
          <img
            src={src}
            alt="dashboard preview"
            className="object-cover object-center w-full h-full rounded-lg"
          />
        </div>
      </motion.div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="w-[40%] mx-auto h-32  rounded-xl my-1"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    ></div>
  );
};

export const Keypad = () => {
  return (
    <div className="h-full rounded-md bg-[#050505] mx-1 p-1">
      {/* First Row */}
      <Row>
        <KBtn
          className="w-10 items-end justify-start pl-[4px] pb-[2px]"
          childrenClassName="items-start"
        >
          esc
        </KBtn>
        <KBtn>
          <IconBrightnessDown className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F1</span>
        </KBtn>

        <KBtn>
          <IconBrightnessUp className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F2</span>
        </KBtn>
        <KBtn>
          <IconTable className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F3</span>
        </KBtn>
        <KBtn>
          <IconSearch className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F4</span>
        </KBtn>
        <KBtn>
          <IconMicrophone className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F5</span>
        </KBtn>
        <KBtn>
          <IconMoon className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F6</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackPrev className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F7</span>
        </KBtn>
        <KBtn>
          <IconPlayerSkipForward className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F8</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackNext className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F8</span>
        </KBtn>
        <KBtn>
          <IconVolume3 className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F10</span>
        </KBtn>
        <KBtn>
          <IconVolume2 className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F11</span>
        </KBtn>
        <KBtn>
          <IconVolume className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F12</span>
        </KBtn>
        <KBtn>
          <div className="h-4 w-4 rounded-full  bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
            <div className="bg-black h-full w-full rounded-full" />
          </div>
        </KBtn>
      </Row>

      {/* Second row */}
      <Row>
        <KBtn>
          <span className="block">~</span>
          <span className="block mt-1">`</span>
        </KBtn>

        <KBtn>
          <span className="block ">!</span>
          <span className="block">1</span>
        </KBtn>
        <KBtn>
          <span className="block">@</span>
          <span className="block">2</span>
        </KBtn>
        <KBtn>
          <span className="block">#</span>
          <span className="block">3</span>
        </KBtn>
        <KBtn>
          <span className="block">$</span>
          <span className="block">4</span>
        </KBtn>
        <KBtn>
          <span className="block">%</span>
          <span className="block">5</span>
        </KBtn>
        <KBtn>
          <span className="block">^</span>
          <span className="block">6</span>
        </KBtn>
        <KBtn>
          <span className="block">&</span>
          <span className="block">7</span>
        </KBtn>
        <KBtn>
          <span className="block">*</span>
          <span className="block">8</span>
        </KBtn>
        <KBtn>
          <span className="block">(</span>
          <span className="block">9</span>
        </KBtn>
        <KBtn>
          <span className="block">)</span>
          <span className="block">0</span>
        </KBtn>
        <KBtn>
          <span className="block">&mdash;</span>
          <span className="block">_</span>
        </KBtn>
        <KBtn>
          <span className="block">+</span>
          <span className="block"> = </span>
        </KBtn>
        <KBtn
          className="w-10 items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          delete
        </KBtn>
      </Row>

      {/* Third row */}
      <Row>
        <KBtn
          className="w-10 items-end justify-start pl-[4px] pb-[2px]"
          childrenClassName="items-start"
        >
          tab
        </KBtn>
        <KBtn>
          <span className="block">Q</span>
        </KBtn>

        <KBtn>
          <span className="block">W</span>
        </KBtn>
        <KBtn>
          <span className="block">E</span>
        </KBtn>
        <KBtn>
          <span className="block">R</span>
        </KBtn>
        <KBtn>
          <span className="block">T</span>
        </KBtn>
        <KBtn>
          <span className="block">Y</span>
        </KBtn>
        <KBtn>
          <span className="block">U</span>
        </KBtn>
        <KBtn>
          <span className="block">I</span>
        </KBtn>
        <KBtn>
          <span className="block">O</span>
        </KBtn>
        <KBtn>
          <span className="block">P</span>
        </KBtn>
        <KBtn>
          <span className="block">{`{`}</span>
          <span className="block">{`[`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`}`}</span>
          <span className="block">{`]`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`|`}</span>
          <span className="block">{`\\`}</span>
        </KBtn>
      </Row>

      {/* Fourth Row */}
      <Row>
        <KBtn
          className="w-[2.8rem] items-end justify-start pl-[4px] pb-[2px]"
          childrenClassName="items-start"
        >
          caps lock
        </KBtn>
        <KBtn>
          <span className="block">A</span>
        </KBtn>

        <KBtn>
          <span className="block">S</span>
        </KBtn>
        <KBtn>
          <span className="block">D</span>
        </KBtn>
        <KBtn>
          <span className="block">F</span>
        </KBtn>
        <KBtn>
          <span className="block">G</span>
        </KBtn>
        <KBtn>
          <span className="block">H</span>
        </KBtn>
        <KBtn>
          <span className="block">J</span>
        </KBtn>
        <KBtn>
          <span className="block">K</span>
        </KBtn>
        <KBtn>
          <span className="block">L</span>
        </KBtn>
        <KBtn>
          <span className="block">{`:`}</span>
          <span className="block">{`;`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`"`}</span>
          <span className="block">{`'`}</span>
        </KBtn>
        <KBtn
          className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          return
        </KBtn>
      </Row>

      {/* Fifth Row */}
      <Row>
        <KBtn
          className="w-[3.65rem] items-end justify-start pl-[4px] pb-[2px]"
          childrenClassName="items-start"
        >
          shift
        </KBtn>
        <KBtn>
          <span className="block">Z</span>
        </KBtn>
        <KBtn>
          <span className="block">X</span>
        </KBtn>
        <KBtn>
          <span className="block">C</span>
        </KBtn>
        <KBtn>
          <span className="block">V</span>
        </KBtn>
        <KBtn>
          <span className="block">B</span>
        </KBtn>
        <KBtn>
          <span className="block">N</span>
        </KBtn>
        <KBtn>
          <span className="block">M</span>
        </KBtn>
        <KBtn>
          <span className="block">{`<`}</span>
          <span className="block">{`,`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`>`}</span>
          <span className="block">{`.`}</span>
        </KBtn>{" "}
        <KBtn>
          <span className="block">{`?`}</span>
          <span className="block">{`/`}</span>
        </KBtn>
        <KBtn
          className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          shift
        </KBtn>
      </Row>

      {/* sixth Row */}
      <Row>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1">
            <span className="block">fn</span>
          </div>
          <div className="flex justify-start w-full pl-1">
            <IconWorld className="h-[6px] w-[6px]" />
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1">
            <IconChevronUp className="h-[6px] w-[6px]" />
          </div>
          <div className="flex justify-start w-full pl-1">
            <span className="block">control</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex justify-start w-full pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex justify-end w-full pr-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex justify-start w-full pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="w-[8.2rem]"></KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex justify-start w-full pl-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex justify-start w-full pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-start w-full pl-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex justify-start w-full pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <div className="w-[4.9rem] mt-[2px] h-6 p-[0.5px] rounded-[4px] flex flex-col justify-end items-center">
          <KBtn className="w-6 h-3">
            <IconCaretUpFilled className="h-[6px] w-[6px]" />
          </KBtn>
          <div className="flex">
            <KBtn className="w-6 h-3">
              <IconCaretLeftFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="w-6 h-3">
              <IconCaretDownFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="w-6 h-3">
              <IconCaretRightFilled className="h-[6px] w-[6px]" />
            </KBtn>
          </div>
        </div>
      </Row>
    </div>
  );
};
export const KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = true,
}) => {
  return (
    <div
      className={cn(
        "p-[0.5px] rounded-[4px]",
        backlit && "bg-white/[0.2] shadow-xl shadow-white"
      )}
    >
      <div
        className={cn(
          "h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center",
          className
        )}
        style={{
          boxShadow:
            "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
        }}
      >
        <div
          className={cn(
            "text-neutral-200 text-[5px] w-full flex justify-center items-center flex-col",
            childrenClassName,
            backlit && "text-white"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const Row = ({ children }) => {
  return (
    <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
      {children}
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div
      className="flex px-[0.5px] gap-[2px] mt-2 h-40"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    ></div>
  );
};

export const OptionKey = ({ className }) => {
  return (
    <svg
      fill="none"
      version="1.1"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <rect
        stroke="currentColor"
        strokeWidth={2}
        x="18"
        y="5"
        width="10"
        height="2"
      />
      <polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
      />
      <rect
        id="_Transparent_Rectangle_"
        className="st0"
        width="32"
        height="32"
        stroke="none"
      />
    </svg>
  );
};

const AceternityLogo = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-white"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
  );
};

// Tabler Icons
function IconBrightnessDown({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-brightness-down", className)}
      {...rest}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2" />
      <path d="M12 18v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function IconBrightnessUp({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-brightness", className)}
      {...rest}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v1" />
      <path d="M12 20v1" />
      <path d="M3 12h1" />
      <path d="M20 12h1" />
      <path d="m18.364 5.636-.707.707" />
      <path d="m6.343 17.657-.707.707" />
      <path d="m5.636 5.636.707.707" />
      <path d="m17.657 17.657.707.707" />
    </svg>
  );
}

function IconCaretDownFilled({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("icon icon-tabler icons-tabler-filled icon-tabler-caret-down", className)}
      {...rest}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z" />
    </svg>
  );
}

function IconCaretLeftFilled({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("icon icon-tabler icons-tabler-filled icon-tabler-caret-left", className)}
      {...rest}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 12.059c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z" />
    </svg>
  );
}

function IconCaretRightFilled({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("icon icon-tabler icons-tabler-filled icon-tabler-caret-right", className)}
      {...rest}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 -.002l-.059 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z" />
    </svg>
  );
}

function IconCaretUpFilled({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("icon icon-tabler icons-tabler-filled icon-tabler-caret-up", className)}
      {...rest}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11.293 7.293a1 1 0 0 1 1.32 -.083l.094 .083l6 6l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.010 .053l.010 .06l.004 .057l.002 .059l-.002 .059l-.005 .058l-.009 .06l-.01 .052l-.032 .108l-.027 .067l-.07 .132l-.065 .09l-.073 .081l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002h-12c-.852 0 -1.297 -.986 -.783 -1.623l.076 -.084l6 -6z" />
    </svg>
  );
}

function IconChevronUp({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-chevron-up", className)}
      {...rest}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function IconCommand({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-command", className)}
      {...rest}
    >
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  );
}

function IconMicrophone({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-mic", className)}
      {...rest}
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function IconMoon({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-moon", className)}
      {...rest}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function IconPlayerSkipForward({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-skip-forward", className)}
      {...rest}
    >
      <polygon points="5 4 15 12 5 20 5 4" />
      <line x1="19" x2="19" y1="5" y2="19" />
    </svg>
  );
}

function IconPlayerTrackNext({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-step-forward", className)}
      {...rest}
    >
      <line x1="6" x2="6" y1="4" y2="20" />
      <polygon points="10 4 20 12 10 20 10 4" />
    </svg>
  );
}

function IconPlayerTrackPrev({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-step-back", className)}
      {...rest}
    >
      <line x1="18" x2="18" y1="20" y2="4" />
      <polygon points="14 20 4 12 14 4 14 20" />
    </svg>
  );
}

function IconSearch({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-search", className)}
      {...rest}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function IconTable({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-layout-grid", className)}
      {...rest}
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function IconVolume({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-volume", className)}
      {...rest}
    >
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
    </svg>
  );
}

function IconVolume2({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-volume-1", className)}
      {...rest}
    >
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
      <path d="M16 9a5 5 0 0 1 0 6" />
    </svg>
  );
}

function IconVolume3({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-volume-x", className)}
      {...rest}
    >
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
    </svg>
  );
}

function IconWorld({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-globe", className)}
      {...rest}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

// cn utility
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}


