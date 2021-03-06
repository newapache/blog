import {
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_FAILURE,
  POSTS_WRITE_REQUEST,
  POSTS_WRITE_SUCCESS,
  POSTS_WRITE_FAILURE,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_REQUEST,
  POST_EDIT_LOADING_REQUEST,
  POST_EDIT_LOADING_SUCCESS,
  POST_EDIT_LOADING_FAILURE,
  POST_EDIT_UPLOADING_REQUEST,
  POST_EDIT_UPLOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
  CATEGORY_FIND_REQUEST,
  CATEGORY_FIND_SUCCESS,
  CATEGORY_FIND_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
} from "../types";

const initialState = {
  isAuthenticated: null,
  posts: [],
  postDetail: "",
  postCount: "",
  loading: false,
  error: "",
  creatorId: "",
  categoryFindResult: "",
  title: "",
  searchBy: "",
  searchResult: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POSTS_LOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.postFindResult], //기존 포스트가 앞쪽에 배치되도록
        categoryFindResult: action.payload.categoryFindResult,
        postCount: action.payload.postCount,
        loading: false,
      };
    case POSTS_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case POSTS_WRITE_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POSTS_WRITE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case POSTS_WRITE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case POST_DETAIL_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POST_DETAIL_LOADING_SUCCESS:
      return {
        ...state,
        postDetail: action.payload,
        creatorId: action.payload.creator._id, //수정 (여기서 action.payload는 saga에서 api result를 yield put)
        title: action.payload.title,
        loading: false,
      };
    case POST_DETAIL_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case POST_EDIT_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POST_EDIT_LOADING_SUCCESS:
      return {
        ...state,
        postDetail: action.payload,

        loading: false,
      };
    case POST_EDIT_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case POST_EDIT_UPLOADING_REQUEST:
      return {
        ...state,

        loading: true,
      };
    case POST_EDIT_UPLOADING_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case POST_EDIT_UPLOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CATEGORY_FIND_REQUEST:
      return {
        ...state,
        posts: [], // 카테고리에서 홈으로 돌아갈 때 포스트가 겹치는 것 방지하기 위해 한 번 날려줌.
        loading: true,
      };
    case CATEGORY_FIND_SUCCESS:
      return {
        ...state,
        categoryFindResult: action.payload,
        loading: false,
      };
    case CATEGORY_FIND_FAILURE:
      return {
        ...state,
        categoryFindResult: action.payload,
        loading: false,
      };
    case SEARCH_REQUEST:
      return {
        ...state,
        posts: [],
        searchBy: action.payload,
        loading: true,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchBy: action.payload,
        searchResult: action.payload,
        loading: false,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        searchResult: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
