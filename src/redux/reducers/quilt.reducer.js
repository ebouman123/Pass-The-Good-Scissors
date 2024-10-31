const quilts = (state = [], action) => {
    switch (action.type) {
      case "SET_QUILTS":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default quilts;
  