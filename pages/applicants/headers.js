export const listHeaders = [
    { label: "First name", key: "student.firstName" },
    { label: "Last name", key: "student.lastName" },
    { label: "Nationality", key: "student.nationality" },
    { label: "Departing Country", key: "student.departingCountry" },
    { label: "Date of birth", key: "student.dateOfBirth" },
    { label: "Email", key: "student.email" },
    { label: "Department", key: "department" },
    { label: "Phone Number", key: "student.phoneNumber" },
    { label: "Sex", key: "student.sex" },
    { label: "University", key: "student.university" },
    { label: "Application Date", key: "applicationDate" },
    { label: "Arrival Date", key: "arrivalDate" },
    { label: "Departure Date", key: "departureDate" },
    { label: "Hr Interview Date", key: "hrInterviewDate" },
    { label: "Interview Notes", key: "interviewNotes" },
    { label: "Position", key: "position" },
    { label: "Progress", key: "progress" },
    { label: "Rejection Reasons", key: "rejectionReasons" },
    { label: "Acceptance Letter", key: "documents.acceptanceLetter" },
    { label: "Accommodation Letter", key: "documents.accommodationLetter" },
    { label: "Arrival Tickets", key: "documents.arrivalTickets" },
    { label: "Confidentiality Letter", key: "documents.confidentialityLetter" },
    { label: "Curiculum Vitae", key: "documents.curiculumVitae" },
    { label: "Identification", key: "documents.identification" },
    {
      label: "Intern Development Plan",
      key: "documents.internDevelopmentPlan",
    },
    { label: "Learning Agreement", key: "documents.learningAgreement" },
  ];

  /* Generate Graph Data
  This needs to be modified to fetch data from the api
  We need to fetch the total number of applications and match them with the number of interviews conducted
  InDValue = Interviews not Done Value (int)
  IdValue = Interviews done Value (int)
   */
export const IDonedata = [
    {'month':"Jan", 'InDValue':10, 'IdValue': 15},
    {'month':"Feb", 'InDValue':12,'IdValue': 17},
    {'month':"Mar", 'InDValue':20,'IdValue': 25},
    {'month':"Apr", 'InDValue':80,'IdValue': 85},
    {'month':"May", 'InDValue':150,'IdValue': 100},
    {'month':"Jun", 'InDValue':300,'IdValue': 200},
    {'month':"Jul", 'InDValue':400,'IdValue': 140},
    {'month':"Aug", 'InDValue':250,'IdValue': 150},
    {'month':"Sep", 'InDValue':100,'IdValue': 50},
    {'month':"Oct", 'InDValue':80,'IdValue': 60},
    {'month':"Nov", 'InDValue':40,'IdValue': 40},
    {'month':"Dec", 'InDValue':18,'IdValue': 38}
];