const initialState = {
  name: null,
  jobTitle: null,
  location: null,
  skills: null
};

const linkInfo = (state = initialState, action) => {
  switch (action.type) {
    case "LINK_INFO":
      return {
        ...state,
        name: action.name,
        jobTitle: action.jobTitle,
        location: action.location,
        skills: action.skills,
        jobs: action.jobs,
        degrees: action.degrees
      };
    default:
      return state;
  }
};

export default linkInfo;
