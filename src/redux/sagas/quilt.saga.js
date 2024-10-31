import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// Fetches all from the quilt table
function* fetchQuilts() {
  try {
    const quiltResponse = yield axios.get("/api/quilt");
    yield put({
      type: "SET_QUILTS",
      payload: quiltResponse.data,
    });
  } catch (error) {
    console.log("fetchQuilts error:", error);
  }
}

// Fetch the chosen quilt
function* fetchChosenQuilt(action) {
  const quiltString = action.payload;
  // Formatting so it will still go to the correct endpoint
  const formattedQuiltString = quiltString.replaceAll("/", "$");
    try {
        const quiltResponse = yield axios.get(`/api/quilt/chosen/${formattedQuiltString}`);
        yield put({
          type: "SET_CHOSEN_QUILT",
          payload: quiltResponse.data,
        });
      } catch (error) {
        console.log("fetchChosenQuilt error:", error);
      }
}

// POST the quiltName to the quilt table, then calls GET
function* addQuilt(action) {
  try {
    let data = {
      quiltName: action.payload,
    };
    yield axios.post("/api/quilt", data);
    yield put({ type: "FETCH_QUILTS" });
  } catch (error) {
    console.error("addQuilt Error", error);
  }
}

// DELETE the quiltName from the quilt table, then calls GET
function* deleteQuilt(action) {
  const quiltString = action.payload;
  // Formatting so it will still go to the correct endpoint
  const formattedQuiltString = quiltString.replaceAll("/", "$");
  try {
    yield axios.delete(`/api/quilt/${formattedQuiltString}`);
    yield put({ type: "FETCH_QUILTS" });
  } catch (error) {
    console.error("deleteQuilt Error", error);
  }
}

// PUT the quiltComment
function* addQuiltInfo(action) {
    const data = action.payload
    try {
        yield axios.put('/api/quilt', data)
    } catch (error) {
        console.error('Problem with addQuiltInfo', error)
    }
}

function* quiltSaga() {
  yield takeEvery("FETCH_QUILTS", fetchQuilts);
  yield takeEvery("ADD_QUILT", addQuilt);
  yield takeEvery("DELETE_QUILT", deleteQuilt);
  yield takeEvery("ADD_QUILT_INFO", addQuiltInfo);
  yield takeEvery("FETCH_CHOSEN_QUILT", fetchChosenQuilt);
}

export default quiltSaga;
