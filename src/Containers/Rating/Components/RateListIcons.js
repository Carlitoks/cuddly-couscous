import I18n from "../../../I18n/I18n";

export const GoodIcons = [
  {
    Name: "ios-time",
    IconState: "iconWaitTimeFirstList",
    IconName: "waitTime",
    Key: "waitTime",
    OffState: "iconWaitTimeSecondList",
    label: "Time to connect",
    i18nKey: "session.rating.flags.time",
  },
  {
    Name: "ios-happy",
    IconState: "iconFriendlinessFirstList",
    IconName: "friendliness",
    Key: "friendliness",
    OffState: "iconFriendlinessSecondList",
    label: "Friendliness",
    i18nKey: "session.rating.flags.friendliness",
  },
  {
    Name: "ios-microphone",
    IconState: "iconUnderstandFirstList",
    IconName: "easyUnderstand",
    Key: "easyUnderstand",
    OffState: "iconUnderstandSecondList",
    label: "Easy to Understand",
    i18nKey: "session.rating.flags.understandEasy",
  },
  {
    Name: "ios-person",
    IconState: "iconLanguageAbilityFirstList",
    IconName: "language",
    Key: "language",
    OffState: "iconLanguageAbilitySecondList",
    label: "Language Ability",
    i18nKey: "session.rating.flags.langAbility",
  },
  {
    Name: "ios-volume-up",
    IconState: "iconAudioQualityFirstList",
    IconName: "audio",
    Key: "audio",
    OffState: "iconAudioQualityFirstList",
    label: "Audio Quality",
    i18nKey: "session.rating.flags.audio",
  },
  {
    Name: "ios-body",
    IconState: "iconProfessionalismFirstList",
    IconName: "professionalism",
    Key: "professionalism",
    OffState: "iconProfessionalismSecondList",
    label: "Professionalism",
    i18nKey: "session.rating.flags.professionalism",
  },
];

export const BadIcons = [
  {
    Name: "ios-person",
    IconState: "iconLanguageAbilitySecondList",
    IconName: "language",
    Key: "language",
    OffState: "iconLanguageAbilityFirstList",
    label: "Language Ability",
    i18nKey: "session.rating.flags.langAbility",
  },
  {
    Name: "ios-wifi",
    IconState: "iconConnectionSecondList",
    IconName: "connection",
    Key: "connection",
    OffState: "iconConnectionFirstList",
    label: "Connection",
    i18nKey: "session.rating.flags.connection",
  },
  {
    Name: "ios-time",
    IconState: "iconWaitTimeSecondList",
    IconName: "waitTime",
    Key: "waitTime",
    OffState: "iconWaitTimeFirstList",
    label: "Time to connect",
    i18nKey: "session.rating.flags.time",
  },
  {
    Name: "ios-recording",
    IconState: "iconVoiceClaritySecondList",
    IconName: "voiceClarity",
    Key: "voiceClarity",
    OffState: "iconVoiceClarityFirstList",
    label: "Voice Clarity",
    i18nKey: "session.rating.flags.voice",
  },
  {
    Name: "ios-outlet",
    IconState: "iconDistractionsSecondList",
    IconName: "distractions",
    Key: "surroundings",
    OffState: "iconDistractionsFirstList",
    label: "Surroundings",
    i18nKey: "session.rating.flags.surroundings",
  },
  {
    Name: "ios-body",
    IconState: "iconProfessionalismSecondList",
    IconName: "professionalism",
    Key: "appearance",
    OffState: "iconProfessionalismFirstList",
    label: "Appearance",
    i18nKey: "session.rating.flags.appearance",
  },
  {
    Name: "ios-happy",
    IconState: "iconFriendlinessSecondList",
    IconName: "friendliness",
    Key: "friendliness",
    OffState: "iconFriendlinessFirstList",
    label: "Friendliness",
    i18nKey: "session.rating.flags.friendliness",
  },
  {
    Name: "ios-microphone",
    IconState: "iconUnderstandSecondList",
    IconName: "easyUnderstand",
    Key: "easyUnderstand",
    OffState: "iconUnderstandFirstList",
    label: "Hard to Understand",
    i18nKey: "session.rating.flags.understandHard",
  },
  {
    Name: "ios-musical-note",
    IconState: "iconBackgroundNoiseSecondList",
    IconName: "noise",
    Key: "noise",
    OffState: "iconBackgroundNoiseFirstList",
    label: "Background Noise",
    i18nKey: "session.rating.flags.noise",
  },
];

export const CallClassification = [
  {
    id: 1,
    label: I18n.t("session.rating.classifications.trial"),
    i18nKey: "session.rating.classifications.trial",
    value: "trial",
  },
  {
    id: 2,
    label: I18n.t("session.rating.classifications.demo"),
    i18nKey: "session.rating.classifications.demo",
    value: "demo",
  },
  {
    id: 3,
    label: "Language & Culture Assistance",
    i18nKey: "Language & Culture Assistance",
    value: "help",
  },
];
