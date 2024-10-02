import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import HeaderCard from "@/components/HeaderCard";
import { router } from "expo-router";
import Input from "@/components/Inputs/Input";
import { ThemedText } from "@/components/ThemedText";
import { normalize, scaleH, scaleW } from "@/utils/dimensionUtil";
import LoadingButton from "@/components/Button";
import { changePasswordApi } from "@/api/auth/actions";

const ChangePasswordScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    changePasswordApi({ currentPassword: currentPassword, password: password })
      .then((res) => {
        Alert.alert("Alert", res.msg);
        router.navigate("/(tabs)/profile");
      })
      .catch((err) => {
        Alert.alert("Error", Object.values(err).join("; "));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validate = () => {
    if (password.length < 6) {
      Alert.alert("Password invalid", "Password must be more 6 characters");
      return false;
    }
    if (password !== passwordConfirm) {
      Alert.alert("Confirm password invalid", "Confirm password not match!");
      return false;
    }
    return true;
  };

  return (
    <ScrollView scrollEnabled={false}>
      <HeaderCard
        title="Change password"
        goBack={() => {
          router.navigate("/(tabs)/profile");
        }}
      />
      <View style={styles.container}>
        <View>
          <ThemedText style={styles.titleInput}>Current Password</ThemedText>
          <Input
            onChangeText={(val) => {
              setCurrentPassword(val);
            }}
            secureTextEntry
            placeholder="Enter your old password"
          />
          <View
            style={{
              marginVertical: 20 * scaleH,
              height: 0.5 * scaleH,
              backgroundColor: "gray",
            }}
          />
          <ThemedText style={styles.titleInput}>Password</ThemedText>
          <Input
            onChangeText={(val) => {
              setPassword(val);
            }}
            secureTextEntry
            placeholder="Enter your new password"
          />
          <View style={{ marginTop: 10 * scaleH }} />
          <ThemedText style={styles.titleInput}>Confirm Password</ThemedText>
          <Input
            onChangeText={(val) => {
              setPasswordConfirm(val);
            }}
            secureTextEntry
            placeholder="Confirm your password"
          />
        </View>
        <LoadingButton
          onPress={handleSubmit}
          loading={loading}
          label="Save"
          style={styles.button}
          labelStyle={styles.buttonText}
        />
      </View>
    </ScrollView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  titleInput: {
    fontSize: normalize(18),
    fontWeight: "500",
    marginBottom: 5 * scaleH,
  },
  container: {
    paddingVertical: 150 * scaleH,
    width: "100%",
    height: "100%",
    paddingHorizontal: 25 * scaleW,
    justifyContent: "space-between",
  },
  button: {
    marginTop: 30 * scaleH,
    borderRadius: 8 * scaleW,
    height: 50 * scaleH,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E69D7",
  },
  buttonText: {
    fontSize: normalize(20),
    fontWeight: "700",
    color: "white",
  },
});
