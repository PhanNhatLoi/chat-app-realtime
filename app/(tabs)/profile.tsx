import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice/account";
import { ThemedView } from "@/components/ThemedView";
import { store } from "@/redux/store";
import { normalize, scaleH, scaleW, widthScreen } from "@/utils/dimensionUtil";
import Avatar from "@/components/Avatar";
import { ThemedText } from "@/components/ThemedText";
import LoadingButton from "@/components/Button";
import { useCallback, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import ArrowRightSingleIcon from "@/assets/icons/ArrowRightSingle";
import ProfileInfoIcon from "@/assets/icons/ProfileInfo";
import SettingIcon from "@/assets/icons/Setting";
import QuestionIcon from "@/assets/icons/Question";
import SupportIcon from "@/assets/icons/Support";
type menuItemType = {
  id: number;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  required?: boolean;
};

export default function TabTwoScreen() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const user = store.getState()?.auth?.user;
  const buttonBackground = useThemeColor({}, "button");

  const menusItem = [
    {
      id: 1,
      icon: <ProfileInfoIcon />,
      label: "Profile Information",
      onClick: () => {},
      required: true,
    },
    {
      id: 4,
      icon: <SettingIcon />,
      label: "settings",
      onClick: () => {},
    },
    {
      id: 5,
      icon: <QuestionIcon />,
      label: "Policy",
      onClick: () => {},
    },
    {
      id: 6,
      icon: <SupportIcon />,
      label: "Support Center",
      onClick: () => {},
    },
  ];

  const RenderIcon = useCallback(({ icon, label, onClick }: menuItemType) => {
    return (
      <TouchableOpacity style={styles.renderIconStyle} onPress={onClick}>
        <View style={styles.itemLeft}>
          <View style={styles.iconMenu}>{icon}</View>
          <ThemedText style={styles.menuText}>{label}</ThemedText>
        </View>
        <ArrowRightSingleIcon />
      </TouchableOpacity>
    );
  }, []);
  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(logout());
      setLoading(false);
    }, 2000);
  };
  return (
    <ThemedView style={styles.container}>
      <View style={styles.card} />
      <View style={{ alignItems: "center", width: "100%" }}>
        <Avatar uri={user?.avatar || ""} />
        <ThemedText style={styles.name}>{user?.name || "Full name"}</ThemedText>
        <View style={styles.listItem}>
          <FlatList
            scrollEnabled={false}
            data={menusItem}
            renderItem={({ item }) => {
              return <RenderIcon {...item} />;
            }}
          />
        </View>
      </View>
      <LoadingButton
        label="Logout"
        style={[styles.button, { borderColor: buttonBackground }]}
        labelStyle={[styles.buttonText, { color: buttonBackground }]}
        loading={loading}
        onPress={handleLogout}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25 * scaleW,
    paddingVertical: 50 * scaleH,
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    textAlign: "center",
    marginTop: 20 * scaleH,
    fontWeight: "500",
    fontSize: normalize(24),
    lineHeight: 24 * scaleH,
    color: "white",
  },
  button: {
    borderWidth: 1,
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
  },
  card: {
    position: "absolute",
    top: 0,
    backgroundColor: "#1787AF",
    height: 300 * scaleH,
    width: widthScreen,
    borderBottomLeftRadius: 18 * scaleW,
    borderBottomRightRadius: 18 * scaleW,
  },
  listItem: {
    backgroundColor: "white",
    width: "100%",
    padding: 25 * scaleH,
    borderRadius: 8 * scaleW,
    marginTop: 20 * scaleH,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  renderIconStyle: {
    width: "100%",
    marginBottom: 20 * scaleH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconMenu: {
    borderRadius: 8 * scaleW,
    height: 40 * scaleW,
    width: 40 * scaleW,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12 * scaleW,
    backgroundColor: "#1787AF",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: normalize(21),
    fontWeight: "500",
    lineHeight: 24 * scaleH,
  },
});
