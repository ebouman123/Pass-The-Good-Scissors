import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// Fetches all from the fabric table
function* fetchFabrics() {
  try {
    const fabricResponse = yield axios.get("/api/fabric");
    yield put({
      type: "SET_FABRICS",
      payload: fabricResponse.data,
    });
  } catch (error) {
    console.log("fetchFabrics error:", error);
  }
}

// POST the fabricName to the fabric table, then calls GET
function* addFabric(action) {
  try {
    let data = {
      fabricName: action.payload,
    };
    yield axios.post("/api/fabric", data);
    yield put({ type: "FETCH_FABRICS" });
  } catch (error) {
    console.error("addFabric Error", error);
  }
}

// DELETE the fabricName from the fabric table, then calls GET
function* deleteFabric(action) {
  const fabricString = action.payload;
  // Formatting so it will still go to the correct endpoint
  const formattedFabricString = fabricString.replaceAll("/", "$");
  try {
    yield axios.delete(`/api/fabric/${formattedFabricString}`);
    yield put({ type: "FETCH_FABRICS" });
  } catch (error) {
    console.error("deleteFabric Error", error);
  }
}

function* fabricSaga() {
  yield takeEvery("FETCH_FABRICS", fetchFabrics);
  yield takeEvery("ADD_FABRIC", addFabric);
  yield takeEvery("DELETE_FABRIC", deleteFabric);
}

export default fabricSaga;
