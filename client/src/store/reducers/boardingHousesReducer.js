import {
  BOARDING_HOUSES_FETCH_SUCCESS,
  BOARDING_HOUSES_FETCH_USER_SUCCESS,
  BOARDING_HOUSE_BY_ID_FETCH_USER_SUCCESS,
  BOOKMARK_BY_ID_FETCH_USER_SUCCESS,
  LIST_TENANT_KOS_FETCH_SUCCESS,
  SINGLE_HOUSE_OWNER_FETCH_SUCESS,
  ADMIN_FETCH_KOS_SUCCESS,
} from "../action/actionType";

const initialState = {
  boardingHouses: [],
  boardingHouse: {
    id: null,
    name: "",
    price: null,
    CategoryId: null,
    CityId: null,
    totalRoom: null,
    UserId: null,
    description: "",
    location: {
      type: "",
      coordinates: [],
    },
    slug: "",
    mainImg: null,
    address: null,
    Category: {
      name: "",
    },
    City: {
      name: "",
    },
    User: {
      id: null,
      fullName: "",
      email: "",
      address: "",
      role: "",
      phoneNumber: "",
    },
    Images: [],
    BoardingHouseFacilities: [],
    BoardingHouseRules: [],
  },
  singleHouseOwner: { BoardingHouseRules: [], BoardingHouseFacilities: [] },
  listTenant: [],
  adminKos: [],
};

function boardingHousesReducer(state = initialState, action) {
  switch (action.type) {
    case BOARDING_HOUSES_FETCH_SUCCESS:
      return { ...state, boardingHouses: action.payload };

    case BOARDING_HOUSES_FETCH_USER_SUCCESS:
      return { ...state, boardingHouses: action.payload };

    case BOARDING_HOUSE_BY_ID_FETCH_USER_SUCCESS:
      return { ...state, boardingHouse: action.payload };

    case BOOKMARK_BY_ID_FETCH_USER_SUCCESS:
      return { ...state, boardingHouse: action.payload };

    case SINGLE_HOUSE_OWNER_FETCH_SUCESS:
      return { ...state, singleHouseOwner: action.payload };

    case LIST_TENANT_KOS_FETCH_SUCCESS:
      return { ...state, listTenant: action.payload };

    case ADMIN_FETCH_KOS_SUCCESS:
      return { ...state, adminKos: action.payload };

    default:
      return state;
  }
}

export default boardingHousesReducer;
