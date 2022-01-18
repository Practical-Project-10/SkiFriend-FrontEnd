
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { boardCreators as boardActions } from "../redux/modules/freeboard";
// import { imageActions } from "../redux/modules/image";

// import FreeBoardWrite from "./molecule/FreeBoardWrite";
// import VideoWrite from "./molecule/VideoWrite";

// const BoardBody = (props) => {
//   const {page} = props;

//   // 주소 경로값
//   const params = useParams();
//   const skiresort = params.skiresort;
//   const postId = params.postId;

//   // 작성 수정 판단 여부
//   const is_edit = postId ? true : false;

//   // if(page === "video") {
//   //   return(
//     // <VideoWrite
//     //   is_edit={is_edit}
//     //   skiresort={skiresort}
//     //   postId={postId}
//     // />
//   //   )
//   // }

//   return (
//     <React.Fragment>
//       <FreeBoardWrite
//         is_edit={is_edit}
//         skiresort={skiresort}
//         postId={postId}
//       />
//     </React.Fragment>
//   );
// };

// export default BoardBody;
