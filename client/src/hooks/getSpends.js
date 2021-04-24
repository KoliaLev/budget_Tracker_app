// import { useCallback, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useApiRequest } from "./apiRequest";

// export const useGetSpends = () => {
//   const { token } = useContext(AuthContext);
//   const { request, loading, error, clearError } = useApiRequest();

//   const getSpendings = useCallback(async () => {
//     try {
//       const spends = await request("api/create/get", "GET", null, {
//         authorization: `Beaer ${token}`,
//       });
//       // console.log("траты ", fetchedSpends);
//       // setSpends(fetchedSpends);
//       return spends;
//     } catch (e) {}
//   }, [token, request]);

//   const countUpdate = { count: 1 };

//   return { getSpendings, countUpdate };
// };
