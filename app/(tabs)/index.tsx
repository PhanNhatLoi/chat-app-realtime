import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useCallback, useState } from "react";
import { store } from "@/redux/store";
import { ThemedView } from "@/components/ThemedView";
import { normalize, scaleH, scaleW } from "@/utils/dimensionUtil";
import { ThemedText } from "@/components/ThemedText";
import ListUser from "@/components/ListUser";
import Friend from "@/components/ListUser/Friend";

export default function HomeScreen() {
  const user = store.getState()?.auth?.user;
  const [itemSelected, setItemSelected] = useState<number>(0);

  const flatListItem = [
    {
      title: "Recents",
      id: 0,
    },
    {
      title: "Friends",
      id: 1,
    },
  ];
  const RenderItemList = useCallback(
    ({ item }: { item: { title: string; id: number } }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setItemSelected(item.id);
          }}
          style={[
            styles.itemTopbar,
            { backgroundColor: itemSelected === item.id ? "#1E68D7" : "white" },
          ]}
        >
          <Text
            style={[
              styles.itemText,
              { color: itemSelected === item.id ? "white" : "#1E68D7" },
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    },
    [itemSelected]
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText numberOfLines={1} style={styles.helloText}>
          Hello, {user?.name || user?.email || "User"}
        </ThemedText>
      </View>
      <View>
        <FlatList
          horizontal
          data={flatListItem}
          renderItem={({ item }) => <RenderItemList item={item} />}
        />
      </View>
      {itemSelected === 0 && <ListUser />}
      {itemSelected === 1 && <Friend />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    marginTop: 20 * scaleH,
  },
  helloText: {
    textAlign: "right",
    fontSize: normalize(24),
    lineHeight: 24 * scaleH,
  },
  itemTopbar: {
    padding: 15 * scaleW,
    alignItems: "center",
    margin: 5 * scaleW,
    borderRadius: 18 * scaleW,
  },
  itemText: {
    color: "white",
  },
});
