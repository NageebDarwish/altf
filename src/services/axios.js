import axios from "axios";
import ToastComp from "../components/toast/ToastComp";
import { handleApiError } from "../utils/errorHandler";
import API_CONFIG, { REQUEST_CONFIG } from "../config/api";


const client = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: REQUEST_CONFIG.timeout,
  headers: REQUEST_CONFIG.headers,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export const request = async ({ ...options }, notify = true) => {
  const onSuccess = (response) => {
    // Place localStorage setting at the start of onSuccess to ensure it runs on any success
    if (response.status === 200 || response.status === 201) {
      localStorage.setItem("videoType", "1"); 
    }

    if (notify) {
      if (response.status === 200) {
        if (options.method === "delete") {
          ToastComp({
            variant: "success",
            message: response.message
              ? response.message
              : "Removed Successfully",
          });
        } else if (options.method === "put") {
          ToastComp({
            variant: "success",
            message: response.message
              ? response.message
              : "Updated Successfully",
          });
        } else if (options.method === "post") {
          ToastComp({
            variant: "info",
            message: response ? response : "Already Added",
          });
          return response;
        } else if (options.method === "patch") {
          ToastComp({
            variant: "success",
            message: response.message
              ? response.message
              : "Updated Successfully",
          });
        }
        return response;
      } else if (response.status === 201) {
        ToastComp({
          variant: "success",
          message: response.message ? response.message : "Added Successfully",
        });
        return response;
      } else {
        ToastComp({
          variant: "error",
          message: response.message ? response.message : "Error",
        });
        return response;
      }
    } else {
      return response;
    }
  };

  const onError = (error) => {
    if (notify) {
      const standardError = handleApiError(error, { showToast: false });
      ToastComp({
        variant: "error",
        message: standardError.message,
      });
    }
    return Promise.reject(error);
  };

  // Default request
  return client(options).then(onSuccess).catch(onError);
};



// export const request = async ({ ...options }, notify = true) => {
//   const onSuccess = (response) => {
//     if (notify) {
//       if (response.status === 200) {
//         if (options.method === "delete") {
//           ToastComp({
//             variant: "success",
//             message: response.message
//               ? response.message
//               : "Removed Successfully",
//           });
//         } else if (options.method === "put") {
//           ToastComp({
//             variant: "success",
//             message: response.message
//               ? response.message
//               : "Updated Successfully",
//           });
//         } else if (options.method === "post") {
//           ToastComp({
//             variant: "info",
//             message: response.message ? response.message : "Already Added",
//           });
//           return response;
//         } else if (options.method === "patch") {
//           ToastComp({
//             variant: "success",
//             message: response.message
//               ? response.message
//               : "Updated Successfully",
//           });
//         }
//         return response;
//       } else if (response.status === 201) {
//         ToastComp({
//           variant: "success",
//           message: response.message ? response.message : "Added Successfully",
//         });
//         return response;
//       } else {
//         ToastComp({
//           variant: "error",
//           message: response.message ? response.message : "Error",
//         });
//         return response;
//       }
//     } else {
//       return response;
//     }
//   };

//   const onError = (error) => {
//     console.log(
//       "Error In Axios interceptor: ",
//       error,
//       error?.response?.data?.message
//     );
//     if (notify) {
//       ToastComp({
//         variant: "error",
//         message:
//           error?.response?.data?.message ||
//           error?.message ||
//           "Error! Try Again Later",
//       });
//     }
//     return Promise.reject(error);
//   };

//   // Handle specific URL pattern (e.g., "tennis")
//   if (options?.url?.includes("tennis")) {
//     return client(options).then(onSuccess).catch(onError);
//   }

//   // Default request
//   return client(options).then(onSuccess).catch(onError);
// };

export const fetcher = (url) => request({ method: "get", url }).then((res) => res.data.payload);

