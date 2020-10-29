import React, { useEffect, Fragment, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POSTS_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Row, Alert } from "reactstrap";
import { GrowingSpinner } from "../../components/Spinner";
import PostCardOne from "../../components/post/PostCardOne";

// 컨테이너 (~프레젠터) 구조로 구현
const PostCardList = () => {
  const { posts } = useSelector((state) => state.post); // 리덕스 스토어에 접근해 기존 post 상태값 가져옴 // post key들 중 posts 불러오기
  console.log(posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: POSTS_LOADING_REQUEST, payload: 0 });
  }, [dispatch]);

  return (
    <Fragment>
      <Helmet title="Home" />
      <Row>
        {posts ? <PostCardOne posts={posts} /> : <h1>{GrowingSpinner} </h1>}
        {/* {posts ? <PostCardOne posts={posts} /> : <h1>ddddd</h1>} */}
      </Row>
    </Fragment>
  );
};

export default PostCardList;
