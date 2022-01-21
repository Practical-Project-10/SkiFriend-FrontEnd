import React from "react";

import { useParams } from "react-router-dom";

import SortsWrite from "../components/ShortsWrite";

const ShortsUpload = (props) => {
  // 주소 경로값
  const params = useParams();
  const shortsId = params.shortsId;

  // 작성 수정 판단 여부
  const is_edit = shortsId ? true : false;

  return (
    <React.Fragment>
      <SortsWrite
        is_edit={is_edit}
        shortsId={shortsId}
      />
    </React.Fragment>
  );
};

export default ShortsUpload;