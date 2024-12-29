import axios from "./axiosCustomize";

const fetchMyForumApi = () => {
  const URL = "/v1/api/forum/my-forums";
  return axios.post(URL);
};

const createForumApi = ({ name, description }) => {
  const URL = "/v1/api/forum";
  const data = {
    name,
    description,
  };
  return axios.post(URL, data);
};

const getForumByIdApi = ({ forumId }) => {
  const URL = "/v1/api/forum/this-forum";
  const data = {
    forumId,
  };
  return axios.post(URL, data);
};

const createPostApi = ({ forumId, title, content }) => {
  const URL = "/v1/api/post/create";
  const data = {
    forumId,
    title,
    content,
  };
  return axios.post(URL, data);
};

const getPostByForumId = ({ forumId }) => {
  const URL = "/v1/api/post/forum-post";
  const data = {
    forumId,
  };
  return axios.post(URL, data);
};

const getCommentsByPostId = ({ postId }) => {
  const URL = "/v1/api/comment/post-comment";
  const data = {
    postId,
  };
  return axios.post(URL, data);
};

const createComment = ({ postId, content }) => {
  const URL = "/v1/api/comment";
  const data = {
    postId,
    content,
  };
  return axios.post(URL, data);
};

const increaseAgreeCountApi = ({ commentId, userId }) => {
  const URL = "/v1/api/comment/increase-agree";
  const data = {
    commentId,
    userId,
  };
  return axios.post(URL, data);
};

const getPostByIdApi = ({ postId }) => {
  const URL = "/v1/api/post/get-post";
  const data = {
    postId,
  };
  return axios.post(URL, data);
};

const loginAction = ({ email, password }) => {
  const URL = "/v1/api/auth/login";
  const data = {
    email,
    password,
  };
  return axios.post(URL, data);
};

const getProfileApi = () => {
  const URL = "/v1/api/auth/profile";
  return axios.get(URL);
};

const getResourseList = ({ forumId }) => {
  const URL = `/v1/api/resource/forum/${forumId}`;
  return axios.get(URL);
};

const uploadResource = ({ file, title, forumId }) => {
  const URL = "/v1/api/resource/upload";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  formData.append("forumId", forumId);
  return axios.post(URL, formData);
};

const getAllUsersApi = () => {
  const URL = "/v1/api/auth/users";
  return axios.get(URL);
};

const createUser = ({ name, email }) => {
  const URL = "/v1/api/auth/register";
  const data = {
    name,
    email,
  };
  return axios.post(URL, data);
};

const joinForumApi = ({ email, forumId }) => {
  const URL = "/v1/api/forum/join-forum";
  const data = {
    email,
    forumId,
  };
  return axios.post(URL, data);
};
export {
  fetchMyForumApi,
  createForumApi,
  getForumByIdApi,
  createPostApi,
  getPostByForumId,
  getCommentsByPostId,
  createComment,
  increaseAgreeCountApi,
  getPostByIdApi,
  loginAction,
  getProfileApi,
  getResourseList,
  uploadResource,
  getAllUsersApi,
  createUser,
  joinForumApi,
};
