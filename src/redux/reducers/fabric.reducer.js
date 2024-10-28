const fabrics = (state = [], action) => {
    switch (action.type) {
      case "SET_FABRICS":
        return action.payload;
      default:
        return state;
    }
  };

export default fabrics;