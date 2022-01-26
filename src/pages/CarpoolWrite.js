import React from "react";

import CarpoolRequire from "../components/CarpoolRequire";
import Header from "../components/Header";

const CarpoolWrite = (props) => {
  const postId = props.match.params.postId;
  const is_edit = postId ? true : false;

  return (
    <React.Fragment>
      <Header goBack>카풀 {is_edit ? "수정" : "작성"} 페이지</Header>
      <CarpoolRequire height='100%' postId={postId} is_edit={is_edit}/>
    </React.Fragment>
  );
};

export default React.memo(CarpoolWrite);
