import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderCard from "@/components/HeaderCard";
import { router } from "expo-router";
import Avatar from "@/components/Avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { normalize, scaleH, scaleW } from "@/utils/dimensionUtil";
import * as ImagePicker from "expo-image-picker";
import CameraIcon from "@/assets/icons/Camera";
import { ThemedText } from "@/components/ThemedText";
import Input from "@/components/Inputs/Input";
import LoadingButton from "@/components/Button";
import { SERVER_URL } from "@/constants/env";
import { updateProfileApi } from "@/api/auth/actions";

const ProfileInfo = () => {
  const user = useSelector((state: RootState) => state?.auth?.user);
  const token = useSelector((state: RootState) => state?.auth?.token);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>({
    uri: user?.avatar || "",
    width: 0,
    height: 0,
  });
  const [name, setName] = useState<string>(user?.name || "");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChooseFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    let avatar = user?.avatar || "";
    if (image.uri !== user?.avatar) {
      console.log("uploadimage");
      const formData = new FormData();
      formData.append("file", {
        uri: image.uri,
        fileName: image.fileName,
        type: image.type,
        name: "avatar",
      } as any);
      const res = await fetch(SERVER_URL + "file/upload_avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      if (res) {
        const jsonRes = await res.json();
        avatar = jsonRes.path;
      }
    }
    updateProfileApi({ name: name, avatar: avatar })
      .then((res) => {
        Alert.alert("Alert", "Update profile success");
      })
      .catch((err) => {
        Alert.alert("Error", Object.values(err).join("; "));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validate = () => {
    if (!name) {
      Alert.alert("error", "Name is required");
      return false;
    }
    return true;
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 25 * scaleW }}
      scrollEnabled={false}
    >
      <HeaderCard
        title="Information"
        goBack={() => {
          router.navigate("/(tabs)/profile");
        }}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.avatar} onPress={handleChooseFile}>
          <Avatar uri={image.uri} />
          <View style={styles.camera}>
            <CameraIcon width={18} height={18} />
          </View>
        </TouchableOpacity>
        <View style={{ width: "100%" }}>
          <ThemedText style={styles.titleInput}>Email</ThemedText>
          <Input value={user?.email} editable={false} />
        </View>
        <View style={{ width: "100%" }}>
          <ThemedText style={styles.titleInput}>Full name</ThemedText>
          <Input
            value={name}
            onChangeText={(val) => {
              setName(val);
            }}
            placeholder="Enter your name"
          />
        </View>
      </View>
      <LoadingButton
        disabled={user?.name === name && user.avatar === image.uri}
        onPress={handleSubmit}
        loading={loading}
        label="Save"
        style={styles.button}
        labelStyle={styles.buttonText}
      />
    </ScrollView>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 150 * scaleH,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    position: "relative",
  },
  camera: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    padding: 5 * scaleW,
    borderRadius: 100,
  },
  titleInput: {
    fontSize: normalize(18),
    fontWeight: "500",
    marginBottom: 5 * scaleH,
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
