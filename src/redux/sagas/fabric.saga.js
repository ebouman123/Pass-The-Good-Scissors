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

// Fetch the chosen fabric
function* fetchChosenFabric(action) {
  const fabricString = action.payload;
  // Formatting so it will still go to the correct endpoint
  const formattedFabricString = fabricString.replaceAll("/", "$");
    try {
        const fabricResponse = yield axios.get(`/api/fabric/chosen/${formattedFabricString}`);
        yield put({
          type: "SET_CHOSEN_FABRIC",
          payload: fabricResponse.data,
        });
      } catch (error) {
        console.log("fetchChosenFabric error:", error);
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

// PUT the fabricLink and fabricComment
function* addFabricInfo(action) {
    const data = action.payload
    try {
        yield axios.put('/api/fabric', data)
    } catch (error) {
        console.error('Problem with addFabricInfo', error)
    }
}

function* fabricSaga() {
  yield takeEvery("FETCH_FABRICS", fetchFabrics);
  yield takeEvery("ADD_FABRIC", addFabric);
  yield takeEvery("DELETE_FABRIC", deleteFabric);
  yield takeEvery("ADD_FABRIC_INFO", addFabricInfo);
  yield takeEvery("FETCH_CHOSEN_FABRIC", fetchChosenFabric);
}

export default fabricSaga;
