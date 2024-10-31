const chosenQuilt = (state = [], action) => {
    switch (action.type) {
      case "SET_CHOSEN_QUILT":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default chosenQuilt;
  