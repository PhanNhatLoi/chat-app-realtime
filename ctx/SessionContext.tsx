import { getProfieApi } from "@/api/auth/actions";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { saveProfile } from "@/redux/slice/account";
import { RootState } from "@/redux/store";
import {
  heightScreen,
  normalize,
  scaleH,
  widthScreen,
} from "@/utils/dimensionUtil";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type SessionContextType = {
  isAuthenticated: boolean;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const dispath = useDispatch();

  useEffect(() => {
    if (auth.token) {
      getProfile();
    } else setIsAuthenticated(false);
  }, [auth]);

  const getProfile = async () => {
    setLoading(true);
    await getProfieApi()
      .then((res) => {
        dispath(saveProfile({ user: res }));
        setIsAuthenticated(true);
      })
      .catch((err) => {
        Alert.alert("Get profile error", Object.values(err).join("; "));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SessionContext.Provider value={{ isAuthenticated }}>
      {loading && (
        <ThemedView
          style={{
            height: heightScreen,
            width: widthScreen,
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.8,
          }}
        >
          <ActivityIndicator size={"large"} />
          <ThemedText
            style={{
              marginTop: 10 * scaleH,
              fontSize: normalize(24),
              lineHeight: 24,
            }}
          >
            Downloading data...
          </ThemedText>
        </ThemedView>
      )}
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
