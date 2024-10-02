import { SERVER_URL } from "@/constants/env";
import { logout } from "@/redux/slice/account";
import { store } from "@/redux/store";
import { Alert } from "react-native";

const HEADERS = {
  "Content-Type": "application/json",
};

type SendFetchApiType = {
  path: string;
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  headers?: any;
  body?: any; // body form
  params?: { [paramsKey: string]: any };
};
export default function FETCH(props: SendFetchApiType): Promise<any> {
  return new Promise(function (resolve, reject) {
    startFetch(props)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  });
}

function startFetch(props: SendFetchApiType) {
  const { headers = {}, params, path, method = "GET", body } = props;
  return new Promise(async (resolve, reject) => {
    const token = store.getState()?.auth?.token;
    if (token) {
      if (!headers?.Authorization) headers.Authorization = `Bearer ${token}`;
    }

    // set request timeout, 30s for a send request
    const timeout = setTimeout(() => {
      return reject({
        message: "requestApiTimeout",
      });
    }, 30000); //time out in 30s

    let paramsString = ""; // convert params object to string on url
    params &&
      Object.keys(params).map((m, i) => {
        paramsString += (i === 0 ? "?" : "&") + m + "=" + params[m].toString();
      });

    let fetchURL = SERVER_URL + path + paramsString;
    //convert body value to form
    let httpResponseCode = 200;
    fetch(fetchURL, {
      method,
      headers: {
        ...HEADERS,
        ...headers,
      },
      body: method === "GET" ? undefined : JSON.stringify(body),
    })
      .then((response) => {
        clearTimeout(timeout);
        if (!response) {
          return false;
        }

        const { status } = response;
        httpResponseCode = status;

        if (httpResponseCode === 204) {
          return true;
        }
        return response.json();
      })
      .then((responseJson) => {
        const { errors, ...data } = responseJson;
        if (httpResponseCode > 300) {
          console.log(
            "headers:",
            {
              ...HEADERS,
              ...headers,
            },
            "url: " + fetchURL,
            "body:",
            "response:",
            responseJson
          );
        }
        handleResponse({
          httpResponseCode,
          responseContent: data,
          errors: errors,
          onFullfill: resolve,
          onReject: reject,
        });
      })
      .catch((error) => {
        handleResponse({
          httpResponseCode,
          responseContent: null,
          errors: null,
          onFullfill: resolve,
          onReject: reject,
        });

        clearTimeout(timeout);
        reject(error);
      });
  });
}

function handleResponse({
  errors = null,
  responseContent,
  httpResponseCode,
  onFullfill = (response: any) => Promise.resolve(response),
  onReject = (error: { message: string }) => Promise.reject(error),
}: {
  errors: any;
  responseContent: any;
  httpResponseCode: number;
  onFullfill: any;
  onReject: any;
}) {
  switch (httpResponseCode) {
    case 200:
    case 201:
    case 204: {
      //do some thing
      onFullfill(responseContent);
      break;
    }
    case 403:
      Alert.alert("session exp, please login again!");
      store.dispatch(logout());
    case 400:
    case 401:
    case 404:
    case 500:
      onReject(errors);
      break;

    default:
      onReject(errors);
  }
}
