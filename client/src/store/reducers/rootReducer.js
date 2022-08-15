import { combineReducers } from "redux";
import boardingHousesReducer from "./boardingHousesReducer";
import bookmarksReducer from "./bookmarksReducer";
import myBookingsReducer from "./myBookingsReducer";

const rootReducer = combineReducers({
  boardingHouses: boardingHousesReducer,
  bookmarks: bookmarksReducer,
  myBookings: myBookingsReducer,
});

export default rootReducer;
