import React, { useEffect, Fragment, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POSTS_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Row, Alert } from "reactstrap";
import { GrowingSpinner } from "../../components/Spinner";
import PostCardOne from "../../components/post/PostCardOne";
import Category from "../../components/post/Category";

// 컨테이너 (~프레젠터) 구조로 구현
const PostCardList = () => {
  const { posts, categoryFindResult, loading, postCount } = useSelector(
    (state) => state.post
  ); // 리덕스 스토어에 접근해 기존 post 상태값 가져옴 // post key들 중 posts 불러오기
  console.log(posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: POSTS_LOADING_REQUEST, payload: 0 });
  }, [dispatch]);

  ////////////////////////////
  const skipNumberRef = useRef(0);
  const postCountRef = useRef(0);
  const endMsg = useRef(false);

  postCountRef.current = postCount - 6;

  const observer = useRef();

  const lastPostElementRef = useCallback((node) => {
    if (loading) return;

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let remainPostCount = postCountRef.current - skipNumberRef.current;
        if (remainPostCount >= 0) {
          dispatch({
            type: POSTS_LOADING_REQUEST,
            payload: skipNumberRef.current + 6,
          });
          skipNumberRef.current += 6;
        } else {
          endMsg.current = true;
        }
      }
    });

    if (observer.current) observer.current.disconnect();

    if (node) {
      console.log(node);
      observer.current.observe(node);
    }
  });

  ////////////////////////////

  return (
    <Fragment>
      <Helmet title="Home" />
      <Row className="border-bottom border-top border-primary py-2 mb-3">
        <Category posts={categoryFindResult} />
      </Row>

      <Row>{posts ? <PostCardOne posts={posts} /> : GrowingSpinner}</Row>
      <div ref={lastPostElementRef}> {loading && GrowingSpinner} </div>
      {loading ? (
        ""
      ) : endMsg ? (
        <div>
          <Alert color="danger" className="text-center font-weight-bolder">
            더 이상의 포스트는 없습니다
          </Alert>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default PostCardList;
