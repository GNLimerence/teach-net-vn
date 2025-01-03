const express = require("express");
const forumRoutes = require("../routes/forum.routes");
const commentRoutes = require("../routes/comment.routes");
const postRoutes = require("../routes/post.routes");
const resourcesRoutes = require("../routes/resources.routes");
const authRoutes = require("../routes/auth.routes");
const router = express.Router();

const defaultRoutes = [
  {
    path: "/forum",
    route: forumRoutes,
  },
  {
    path: "/comment",
    route: commentRoutes,
  },
  {
    path: "/post",
    route: postRoutes,
  },
  {
    path: "/resource",
    route: resourcesRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
