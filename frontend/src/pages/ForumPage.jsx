import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ForumSidebar from "../components/ForumSidebar";
import PostList from "../components/PostList";
import ResourceList from "../components/ResourceList";
import ResourceUpload from "../components/ResourceUpload";
import { getForumByIdApi, getPostByForumId } from "../api/api";

const ForumPage = () => {
  const [group, setGroup] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const { id } = useParams();

  useEffect(() => {
    const fetchForumInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const [forumRes, postsRes] = await Promise.all([
          getForumByIdApi({ forumId: id }),
          getPostByForumId({ forumId: id }),
        ]);

        if (forumRes) {
          setGroup(forumRes.data);
        }

        if (postsRes) {
          setPosts(postsRes.data);
        }
      } catch (err) {
        console.error("Error fetching forum data:", err);
        setError("Failed to load forum information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchForumInfo();
  }, [id]);

  const refreshPosts = async () => {
    try {
      const updatedPosts = await getPostByForumId({ forumId: id });
      setPosts(updatedPosts.data);
    } catch (err) {
      console.error("Error refreshing posts:", err);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">
          フォーラム情報を読み込んでいます...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!group) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">フォーラムが見つかりません。</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", position: "relative", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <ForumSidebar
          forumInfo={group}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Box sx={{ padding: 2 }}>
          {activeTab === "posts" ? (
            <PostList
              posts={posts}
              forumId={id}
              onRefreshPosts={refreshPosts}
            />
          ) : (
            <div>
              <ResourceUpload
                forumId={id}
                onUploadSuccess={() => window.location.reload()}
              />
              <ResourceList forumId={id} />
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ForumPage;
