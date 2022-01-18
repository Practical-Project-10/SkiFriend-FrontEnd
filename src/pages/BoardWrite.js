import React from "react";
import { useParams } from "react-router-dom";

import FreeBoardWrite from "../components/FreeBoardWrite";

const BoardWrite = ({ location }) => {
  // 주소 경로값
  const params = useParams();
  const skiresort = params.skiresort;
  const postId = params.postId;

  // //page
  // let page = ''
  // if(location.pathname.includes("/freeboardwrite")) {
  //   page="freeboardwrite"

  // }
  // console.log(location)

  // 작성 수정 판단 여부
  const is_edit = postId ? true : false;

  // if(page === "video") {
  //   return(
    // <VideoWrite
    //   is_edit={is_edit}
    //   skiresort={skiresort}
    //   postId={postId}
    // />
  //   )
  // }

  return (
    <React.Fragment>
      <FreeBoardWrite
        // page={}
        is_edit={is_edit}
        skiresort={skiresort}
        postId={postId}
      />
    </React.Fragment>
  );
};


export default BoardWrite;
