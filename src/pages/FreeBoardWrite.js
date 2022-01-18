import React from "react";
import { useParams } from "react-router-dom";

import BoardWrite from "../components/BoardWrite"

const FreeBoardWrite = (props) => {
  // 주소 경로값
  const params = useParams();
  const skiresort = params.skiresort;
  const postId = params.postId;

  // 작성 수정 판단 여부
  const is_edit = postId ? true : false;

  return (
    <React.Fragment>
      <BoardWrite
        is_edit={is_edit}
        skiresort={skiresort}
        postId={postId}
      />
    </React.Fragment>
  );
};


export default FreeBoardWrite;
