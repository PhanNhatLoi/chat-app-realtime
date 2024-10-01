import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSession } from "@/ctx/SessionContext";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { Images } from "@/assets/images";
import { normalize, scaleH, scaleW } from "@/utils/dimensionUtil";
import { ThemedText } from "@/components/ThemedText";
import Input from "@/components/Inputs/Input";
import LoadingButton from "@/components/Button";
import { useThemeColor } from "@/hooks/useThemeColor";
import { registerApi } from "@/api/auth/actions";

const SignUp = () => {
  const { isAuthenticated } = useSession();
  const router = useRouter();
  const buttonBackground = useThemeColor({}, "button");

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPasswrod] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) router.replace("/(tabs)");
  }, [isAuthenticated]);

  const onSubmit = async () => {
    validate();
    setLoading(true);
    registerApi({ email, password, name })
      .then((res) => {
        Alert.alert(
          res.msg,
          "Congratulations, you have successfully registered. Return to the login page.",
          [
            {
              text: "Yes",
              style: "default",
              onPress: () => {
                router.navigate("/sign-in");
              },
            },
            {
              text: "No, thanks",
              style: "cancel",
              onPress: () => {
                setName("");
                setEmail("");
                setPasswrod("");
              },
            },
          ]
        );
      })
      .catch((err) => {
        Alert.alert("Register error", Object.values(err).join("; "));
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      Alert.alert("Register error", "Email required");
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert("Register error", "Email invalid");
      return false;
    }
    if (!name) {
      Alert.alert("Register error", "Name required");
      return false;
    }
    if (!password) {
      Alert.alert("Register error", "Password required");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Register error", "Password length min 6 characters");

      return false;
    }

    return true;
  };

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        <ThemedText style={styles.TitleText}>Register</ThemedText>
        <View style={{ flex: 1, width: "100%" }}>
          <ThemedText style={styles.titleInput}>Email</ThemedText>
          <Input
            onChangeText={(val) => {
              setEmail(val);
            }}
            value={email}
            placeholder="Enter your Email"
          />
          <View style={{ marginTop: 10 * scaleH }} />
          <ThemedText style={styles.titleInput}>Name</ThemedText>
          <Input
            onChangeText={(val) => {
              setName(val);
            }}
            value={name}
            placeholder="Enter your name"
          />
          <View style={{ marginTop: 10 * scaleH }} />
          <ThemedText style={styles.titleInput}>Password</ThemedText>
          <Input
            onChangeText={(val) => {
              setPasswrod(val);
            }}
            value={password}
            secureTextEntry
            placeholder="Enter your password"
          />
        </View>
        <LoadingButton
          label="Register"
          style={[styles.button, { backgroundColor: buttonBackground }]}
          labelStyle={styles.buttonText}
          onPress={onSubmit}
          loading={loading}
        />
        <TouchableOpacity
          onPress={() => {
            //todo after
            router.navigate("/sign-in");
          }}
        >
          <ThemedText style={[styles.titleInput, { marginTop: 15 * scaleH }]}>
            You have an account
            <ThemedText type="link" style={styles.titleInput}>
              {" "}
              Login
            </ThemedText>
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
};

export default SignUp;

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
  TitleText: {
    fontSize: normalize(30),
    fontWeight: "bold",
    marginBottom: 10 * scaleH,
    lineHeight: 32,
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
