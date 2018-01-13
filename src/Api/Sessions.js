import AXIOS from "../Config/AxiosConfig";

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
  //The linguist accepts the invitation and creates the tokbox token, accept is boolean
  LinguistAcceptsInvite: (invitationID, accept, token) => {
    return AXIOS.put(
      `session-invitations/${invitationID}`,
      { accept: true },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
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
  RatingSession: (stars, resolved, goodFlags, badFlags, sessionID, token) => {
    return AXIOS.put(
      `${BASE_URI}/${sessionID}/ratings`,
      {
        stars: stars,
        resolved: resolved,
        goodFlags: goodFlags,
        badFlags: badFlags
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
  GetInvitations: (userId, token) => {
    return AXIOS.get(`/users/${userId}/linguist-profile/session-invitations`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  GetLanguages: () => {
    const Languages = [
      {
        name: "English",
        code: "eng"
      },
      {
        name: "Albanian",
        code: "sqi"
      },
      {
        name: "Amharic",
        code: "amh"
      },
      {
        name: "Spanish",
        code: "spa"
      },
      {
        name: "Armenian",
        code: "hye"
      },
      {
        name: "Basque",
        code: "eus"
      },
      {
        name: "Bengali",
        code: "ben"
      },
      {
        name: "Russian",
        code: "rus"
      },
      {
        name: "Burmese",
        code: "mya"
      },
      {
        name: "Bulgarian",
        code: "bul"
      },
      {
        name: "Catalan",
        code: "cat"
      }
    ];

    return Languages;
  },
  GetCitizenships: () => {
    const Citizenships = [
      {
        name: "English"
      },
      {
        name: "Spanish"
      },
      {
        name: "Russian"
      },
      {
        name: "German"
      }
    ];

    return Citizenships;
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
