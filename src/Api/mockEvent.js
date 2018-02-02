const mockEvent  = {
  "allowCustomScenario": true,
  "allowMinuteSelection": true,
  "allowSecondaryLangSelection": true,
  "allowUnauthenticatedUsers": true,
  "availableMinutePool": 0,
  "chargeFlatCostToCustomer": 0,
  "chargeFlatCostToOwner": 0,
  "chargeFlatTimeToCustomer": 0,
  "chargeFlatTimetoOwner": 0,
  "chargeFullToCustomer": true,
  "chargeFullToOwner": true,
  "chargeOverageToCustomer": true,
  "chargeOverageToOwner": true,
  "chargePercentCostToCustomer": 0,
  "chargePercentCostToOwner": 0,
  "debitMinutePoolAll": true,
  "debitMinutePoolMax": true,
  "defaultMinutes": 0,
  "defaultSecondaryLangCode": "string",
  "description": "string",
  "geoFence": [
    [
      0
    ]
  ],
  "id": [
    0
  ],
  "maxMinutesPerUse": 0,
  "maxMinutesTotal": 0,
  "maxUsesPerUser": 0,
  "maxUsesTotal": 0,
  "name": "string",
  "organization": {
    "Name": "string"
  },
  "promoCode": "string",
  "requireScenarioSelection": Math.random() >= 0.5,
  "restrictEventScenarios": Math.random() >= 0.5,
  "scenarios": [
    {
        "id": "11111111-1111-1111-1111-111111111111",
        "title": "Airport - Checkin",
        "category": "general",
        "active": true,
        "eventID": null
    },
    {
        "id": "22222222-2222-2222-2222-222222222222",
        "title": "Airport - Baggage Claim",
        "category": "general",
        "active": true,
        "eventID": null
    },
    {
        "id": "33333333-3333-3333-3333-333333333333",
        "title": "Airport - Customer Service",
        "category": "general",
        "active": true,
        "eventID": null
    },
    {
        "id": "44444444-4444-4444-4444-444444444444",
        "title": "Hotel - Checkin",
        "category": "general",
        "active": true,
        "eventID": null
    },
    {
        "id": "55555555-5555-5555-5555-555555555555",
        "title": "Hotel - Customer Service",
        "category": "general",
        "active": true,
        "eventID": null
    },
    {
        "id": "66666666-6666-6666-6666-666666666666",
        "title": "Taxi",
        "category": "general",
        "active": true,
        "eventID": null
    }
  ]
};

export default mockEvent;
