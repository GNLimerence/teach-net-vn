import axios from "./axiosCustomize";

const fetchMyForumApi = ({ userId }) => {
  const URL = "/v1/api/forum/my-forums";
  const data = {
    userId,
  };
  return axios.post(URL, data);
};

const createForumApi = ({ name, userId, description }) => {
  const URL = "/v1/api/forum";
  const data = {
    name,
    userId,
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

const createPostApi = ({ forumId, userId, title, content }) => {
  const URL = "/v1/api/post/create";
  const data = {
    forumId,
    userId,
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

const createComment = ({ postId, authorId, content }) => {
  const URL = "/v1/api/comment";
  const data = {
    postId,
    authorId,
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

const uploadResourceApi = ({ forumId, file }) => {
  const URL = "/v1/api/resource/upload";
  const formData = new FormData();
  formData.append("forumId", forumId);
  formData.append("file", file);

  return axios.post(URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getPostByIdApi = ({ postId }) => {
  const URL = "/v1/api/post/get-post";
  const data = {
    postId,
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
  uploadResourceApi,
  getPostByIdApi,
};
