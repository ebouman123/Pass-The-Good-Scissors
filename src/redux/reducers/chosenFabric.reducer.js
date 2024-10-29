const chosenFabric = (state = [], action) => {
  switch (action.type) {
    case "SET_CHOSEN_FABRIC":
      return action.payload;
    default:
      return state;
  }
};

export default chosenFabric;
