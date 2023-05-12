import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

const GlobalContext = createContext();
const baseUrl = "https://api.jikan.moe/v4";

//action
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_MANGA = "GET_POPULAR_MANGA";
const GET_UPCOMING_MANGA = "GET_UPCOMING_MANGA";
const GET_AIRING_MANGA = "GET_AIRING_MANGA";
const GET_DRAMA_MANGA = "GET_DRAMA_MANGA";
const GET_ROMANCE_MANGA = "GET_ROMANCE_MANGA";
const GET_HORROR_MANGA = "GET_HORROR_MANGA";

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_MANGA:
      return { ...state, popularManga: action.payload, loading: false };
    case SEARCH:
      return { ...state, searchResults: action.payload, loading: false };
    case GET_UPCOMING_MANGA:
      return { ...state, upcomingManga: action.payload, loading: false };
    case GET_AIRING_MANGA:
      return { ...state, airingManga: action.payload, loading: false };
    case GET_DRAMA_MANGA:
      return { ...state, dramaManga: action.payload, loading: false };
    case GET_HORROR_MANGA:
      return { ...state, horrorManga: action.payload, loading: false };
    case GET_ROMANCE_MANGA:
      return { ...state, romanceManga: action.payload, loading: false };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const initialState = {
    popularManga: [],
    upcomingManga: [],
    airingManga: [],
    dramaManga: [],
    horrorManga: [],
    romanceManga: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState("");

  // handle change
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      state.isSearch = false;
    }
  };

  // handle submid
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchManga(search);
      state.isSearch = true;
    } else {
      state.isSearch = false;
      alert("Please enter manga name !");
    }
  };

  //fetch Popular Manga
  const getPopularManga = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/manga?filter=bypopularity`);
    const data = await response.json();
    dispatch({ type: GET_POPULAR_MANGA, payload: data.data });
  };

  //fetch Comedy Manga
  const getUpComingManga = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/manga?q=&genres=4`);
    const data = await response.json();
    dispatch({ type: GET_UPCOMING_MANGA, payload: data.data });
  };

  //fetch Action Manga
  const getAiringManga = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/manga?q=&genres=1`);
    const data = await response.json();
    dispatch({ type: GET_AIRING_MANGA, payload: data.data });
  };

  //fetch Drama Manga
  const getDramaManga = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/manga?q=&genres=8`);
    const data = await response.json();
    dispatch({ type: GET_DRAMA_MANGA, payload: data.data });
  };

  //fetch Horror Manga
  const getHorrorManga = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/manga?q=&genres=14`);
    const data = await response.json();
    dispatch({ type: GET_HORROR_MANGA, payload: data.data });
  };

  //fetch Romance Manga
  const getRomanceManga = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/manga?q=&genres=22`);
    const data = await response.json();
    dispatch({ type: GET_ROMANCE_MANGA, payload: data.data });
  };

  // search manga
  const searchManga = async (manga) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/manga?q=${manga}&order_by=popularity&sort=asc&sfw`
    );
    const data = await response.json();
    dispatch({ type: SEARCH, payload: data.data });
  };

  // initial render
  useEffect(() => {
    getPopularManga();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        searchManga,
        search,
        getAiringManga,
        getPopularManga,
        getUpComingManga,
        getDramaManga,
        getHorrorManga,
        getRomanceManga,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
