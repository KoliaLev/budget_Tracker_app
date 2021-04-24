// const ADD_ALL_SPEND = "ADD_ALL_SPEND";
// const ADD_ONE_SPEND = "ADD_ONE_SPEND";

// const initialState = {
//   spends: [],
// };

// const spendingReduser = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_ALL_SPEND:
//       return {
//         ...state,
//         spends: [...action.spends],
//       };
//     case ADD_ONE_SPEND:
//       return {
//         ...state,
//         spends: state.spends.some((spend) => spend.category === action.spend.category)
//           ? state.spends.map((spend) => {
//               if (spend.category === action.spend.category) {
//                 spend.amount = spend.amount + action.spend.amount;
//               }
//             })
//           : [...state.spends, action.spend],
//       };
//     // case SET_USERS:
//     //   return {
//     //     ...state,
//     //     users: [...action.users],
//     //   };
//     // case SET_TOTAL_USERS:
//     //   return {
//     //     ...state,
//     //     totalUsersCount: action.totalUsers,
//     //   };
//     // case SET_CURRENT_PAGE:
//     //   return {
//     //     ...state,
//     //     currentPage: action.currentPage,
//     //   };
//     // case TOGLE_IS_FETCH:
//     //   return {
//     //     ...state,
//     //     isFetch: action.isFetch,
//     //   };
//     // case IS_FETCH_FOLLOW_USER:
//     //   return {
//     //     ...state,
//     //     isFetchFollowUser: action.isFetch
//     //       ? [...state.isFetchFollowUser, action.id]
//     //       : state.isFetchFollowUser.filter((el) => el != action.id),
//     //   };

//     default:
//       return state;
//   }
// };

// export const setSpends = (spends) => ({ type: ADD_ALL_SPEND, spends });
// export const setOneSpend = (spend) => ({ type: ADD_ONE_SPEND, spend });

// export default spendingReduser;
