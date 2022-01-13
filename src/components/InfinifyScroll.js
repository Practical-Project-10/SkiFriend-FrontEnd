// import React from 'react';

// import { useSelector } from "react-redux";

// const InfinityScroll = (props) => {
//   const { children, callNext, loading } = props
//   const carpool_next = useSelector((state) => state.carpool.is_next);

//   const list = document.getElementById('list');
//   const cardList = document.getElementById('cardList');

//   const recentScroll = list? list.scrollTop: null;
//   const cardListHeight = cardList? cardList.offsetHeight: null;
//   const listHeight = list? list.scrollHeight: null
//   console.log(recentScroll, cardListHeight, listHeight)

//   const _handleScroll = () => {
//     console.log('시일행')
//     if (loading) {
//       return;
//     }

//     const recentScroll = list? list.scrollTop: null;
//     const cardListHeight = cardList? cardList.offsetHeight: null;
//     const listHeight = list? list.scrollHeight: null
//     console.log(recentScroll, cardListHeight, listHeight)

//     if(listHeight - cardListHeight - recentScroll < 20) {
//       if(carpool_next) {
//         console.log('실행')
//         callNext()
//       }
//     }
//   }
  
//   // const _handleScroll = _.throttle(() => {
//   //   console.log('시일행')
//   //   if (loading) {
//   //     return;
//   //   }

//   //   const { innerHeight } = window;
//   //   const { scrollHeight } = document.body;
//   //   const scrollTop =
//   //     (document.documentElement && document.documentElement.scrollTop) ||
//   //     document.body.scrollTop;

//   //   if (scrollHeight - innerHeight - scrollTop < 100) {
//   //     if (carpool_next) {
//   //       console.log('실행')
//   //       callNext()
//   //     }
//   //   }
//   // }, 300);

//   const handleScroll = React.useCallback(_handleScroll, [
//     loading,
//     _handleScroll,
//   ]);

//   React.useEffect(() => {

//     if (loading) {
//       return;
//     }
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [loading, handleScroll]);

//   return <React.Fragment>{children}</React.Fragment>;
// };

// InfinityScroll.defaultProps = {
//   children: null,
//   callNext: () => {},
//   carpool_is_next: false,
//   loading: false,
// };

// export default InfinityScroll;