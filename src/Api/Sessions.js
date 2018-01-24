import AXIOS from "../Config/AxiosConfig";
import Languages from "../Config/Languages";
import Countries from "../Config/countries";

const BASE_URI = "/sessions";

const Session = {
  // value Examples
  /* "type": "immediate_virtual",
		"matchMethod": "manual",
		"primaryLangCode": "eng",
		"secondaryLangCode": "cmn",
		"estimatedMinutes": 20
   */

  createSession: (
    type,
    matchMethod,
    primaryLangCode,
    secondaryLangCode,
    estimatedMinutes,
    token
  ) => {
    return AXIOS.post(
      `${BASE_URI}`,
      {
        type: type,
        matchMethod: matchMethod,
        primaryLangCode: primaryLangCode,
        secondaryLangCode: secondaryLangCode,
        estimatedMinutes: estimatedMinutes
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
  // The customer invite a linguist
  // example:
  // sessionId: comes from createSession)
  // linguistId:11111111-1111-1111-1111-111111111111
  // role:linguist
  // return invitationID,
  customerInvitation: (sessionId, linguistId, role, token) => {
    return AXIOS.post(
      `${BASE_URI}/${sessionId}/invitations`,
      { userId: linguistId, role: role },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
  // Linguist fetches invite w/ session/user/event details
  LinguistFetchesInvite: (invitationID, token) => {
    return AXIOS.get(`session-invitations/${invitationID}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  //The linguist accepts or declines the session invitation
  LinguistIncomingCallResponse: (invitationID, reason, token) => {
    return AXIOS.put(`session-invitations/${invitationID}`, reason, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  // Customer ends session - signal kick to all participants
  EndSession: (sessionID, reason, token) => {
    return AXIOS.put(
      `${BASE_URI}/${sessionID}/end`,
      { reason },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
  //  Participants rate the session
  RatingSession: (RateInformation, sessionID, token) => {
    return AXIOS.post(`${BASE_URI}/${sessionID}/ratings`, RateInformation, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  GetSessionInfo: (sessionID, token) => {
    return AXIOS.get(`${BASE_URI}/${sessionID}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  GetInvitations: (userId, token) => {
    return AXIOS.get(`/users/${userId}/linguist-profile/session-invitations`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  GetLanguages: () => {
    return Languages;
  },
  GetCitizenships: () => {
    return Countries;
  },
  GetCountryFamiliarities: () => {
    return Countries;
  },
  GetCityFamiliarities: () => {
    return Countries;
  },
  GetAreasOfExpertise: () => {
    return [
      { name: "Sport" },
      { name: "Travel" },
      { name: "Legal" },
      { name: "Retail" },
      { name: "Technology" },
      { name: "Tourism" }
    ];
  }
};

export default Session;