import AXIOS from "../Config/AxiosConfig";
import { Languages } from "../Config/Languages";
import Countries from "../Config/countries";
import { recordSessionEvent, recordApiError } from "../Util/Forensics";

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
    scenarioID,
    token,
    customScenario,
    eventID,
    location,
    avModePreference
  ) => {
    recordSessionEvent('create', {
      type,
      matchMethod,
      primaryLangCode,
      secondaryLangCode,
      scenarioID,
      estimatedMinutes,
      customScenario,
      eventID,
      location,
      avModePreference
    });

    return AXIOS.post(
      `${BASE_URI}`,
      {
        type,
        matchMethod,
        primaryLangCode,
        secondaryLangCode,
        scenarioID,
        estimatedMinutes,
        customScenario,
        eventID,
        location,
        avModePreference
      },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => {
      return res;
    }).catch((err) => {
      recordApiError("POST", "/v1/sessions");
      console.log("Code error session ", err.response);
      throw err;
  });
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
  linguistFetchesInvite: (invitationID, token) => {
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
    recordSessionEvent('end', {
      sessionID,
      reason
    });
    return AXIOS.put(
      `${BASE_URI}/${sessionID}/end`,
      { reason },
      { headers: { Authorization: `Bearer ${token}` } }
    ).catch((e) => {
      recordApiError('PUT', '/v1/sessions/{id}/end', {sessionID});
    });
  },
  //  Participants rate the session
  RatingSession: (RateInformation, sessionID, token) => {
    return AXIOS.post(`${BASE_URI}/${sessionID}/ratings`, RateInformation, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  StatusSession: (sessionID, token) => {
    return AXIOS.get(`${BASE_URI}/${sessionID}/status`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  GetSessionInfo: (sessionID, token) => {
    return AXIOS.get(`${BASE_URI}/${sessionID}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  GetSessionInfoLinguist: (sessionID, token) => {
    return AXIOS.get(`${BASE_URI}/${sessionID}/linguist`, {
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
  },
  GetCategories: () => {
    return [
      {
        name: "Hotel",
        icon: "hotel"
      },
      {
        name: "Restaurant",
        icon: "restaurant"
      },
      {
        name: "Airport",
        icon: "local-airport"
      },
      {
        name: "Transport",
        icon: "local-taxi"
      },
      {
        name: "Shopping",
        icon: "shopping-cart"
      },
      {
        name: "General",
        icon: "view-module"
      }
    ];
  }
};

export default Session;
