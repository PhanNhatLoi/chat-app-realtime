import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slice/account";
import { useSession } from "@/ctx/SessionContext";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { Images } from "@/assets/images";
import { normalize, scaleH, scaleW } from "@/utils/dimensionUtil";
import { ThemedText } from "@/components/ThemedText";
import Input from "@/components/Inputs/Input";
import LoadingButton from "@/components/Button";
import { useThemeColor } from "@/hooks/useThemeColor";
import { loginApi } from "@/api/auth/actions";

const SignIn = () => {
  const { isAuthenticated } = useSession();
  const router = useRouter();
  const buttonBackground = useThemeColor({}, "button");
  const dispath = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPasswrod] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) router.replace("/(tabs)");
  }, [isAuthenticated]);

  const onSubmit = async () => {
    setLoading(true);
    // fetch("https://server-nodejs-iota.vercel.app/user/login", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: "123",
    //     password: "123123",
    //   }),
    // })
    //   .then(async (res) => {
    //     const jsonRes = await res.json();
    //     console.log(jsonRes);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    loginApi({ email, password })
      .then((res) => {
        dispath(login({ token: res._token }));
      })
      .catch((err) => {
        setError(Object.values(err).join("; "));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        <ThemedText style={styles.LoginText}>Login</ThemedText>
        <View style={{ flex: 1, width: "100%" }}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
          <ThemedText style={styles.titleInput}>Email</ThemedText>
          <Input
            onChangeText={(val) => {
              setEmail(val);
            }}
            placeholder="Enter your Email..."
          />
          <View style={{ marginTop: 10 * scaleH }} />
          <ThemedText style={styles.titleInput}>Password</ThemedText>
          <Input
            onChangeText={(val) => {
              setPasswrod(val);
            }}
            secureTextEntry
            placeholder="Enter your password"
          />
        </View>
        <LoadingButton
          label="Login"
          style={[styles.button, { backgroundColor: buttonBackground }]}
          labelStyle={styles.buttonText}
          onPress={onSubmit}
          loading={loading}
        />
        <TouchableOpacity
          onPress={() => {
            //todo after
            router.navigate("/sign-up");
          }}
        >
          <ThemedText style={[styles.titleInput, { marginTop: 15 * scaleH }]}>
            You don't have an account yet?
            <ThemedText type="link" style={styles.titleInput}>
              {" "}
              Register now
            </ThemedText>
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25 * scaleW,
    alignItems: "center",
  },
  button: {
    marginTop: 30 * scaleH,
    borderRadius: 8 * scaleW,
    height: 50 * scaleH,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: normalize(20),
    fontWeight: "700",
    color: "white",
  },
  logo: {
    width: 190 * scaleW,
    height: 190 * scaleW,
  },
  LoginText: {
    fontSize: normalize(30),
    fontWeight: "bold",
    lineHeight: 30,
  },
  titleInput: {
    fontSize: normalize(18),
    fontWeight: "500",
    marginBottom: 5 * scaleH,
  },
  errorText: {
    fontSize: normalize(18),
    fontWeight: "500",
    marginBottom: 5 * scaleH,
    color: "red",
  },
});
