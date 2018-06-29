import React, { Component } from "react";
import {
  Audio,
  Connection,
  Distractions,
  EasyUnderstand,
  Friendliness,
  HardUnderstand,
  Knowledge,
  Language,
  Noise,
  Professionalism,
  VoiceClarity,
  WaitTime
} from "../../Assets/SVG";

const RateIcons = ({ icon, active }) => {
  let comp = null;
  switch (icon) {
    case "audio":
      comp = <Audio width={40} height={40} active={active} />;
      break;
    case "connection":
      comp = <Connection width={40} height={40} active={active} />;
      break;
    case "distractions":
      comp = <Distractions width={40} height={40} active={active} />;
      break;
    case "easyUnderstand":
      comp = <EasyUnderstand width={40} height={40} active={active} />;
      break;
    case "friendliness":
      comp = <Friendliness width={40} height={40} active={active} />;
      break;
    case "hardUnderstand":
      comp = <HardUnderstand width={40} height={40} active={active} />;
      break;
    case "knowledge":
      comp = <Knowledge width={40} height={40} active={active} />;

      break;
    case "language":
      comp = <Language width={40} height={40} active={active} />;
      break;
    case "noise":
      comp = <Noise width={40} height={40} active={active} />;

      break;
    case "professionalism":
      comp = <Professionalism width={40} height={40} active={active} />;
      break;
    case "voiceClarity":
      comp = <VoiceClarity width={40} height={40} active={active} />;

      break;
    case "waitTime":
      comp = <WaitTime width={40} height={40} active={active} />;
      break;
  }
  return comp;
};

export default RateIcons;
