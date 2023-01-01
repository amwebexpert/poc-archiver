import React, { useState } from "react";
import { Image, Pressable, StyleSheet, FlatList } from "react-native";
import { Button, Dialog, Portal, useTheme } from "react-native-paper";
import { NOOP } from "~/constants";

export const EmojiListDialog = ({
  isVisible = false,
  onDismiss = NOOP,
  onSelect = NOOP,
}) => {
  const styles = useStyles();
  const [emoji] = useState([
    require("../../../assets/images/emoji1.png"),
    require("../../../assets/images/emoji2.png"),
    require("../../../assets/images/emoji3.png"),
    require("../../../assets/images/emoji4.png"),
    require("../../../assets/images/emoji5.png"),
    require("../../../assets/images/emoji6.png"),
  ]);

  const onEmojiPress = (item) => {
    onSelect(item);
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Title>Select an emoji</Dialog.Title>

        <Dialog.Content>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            data={emoji}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => {
              return (
                <Pressable onPress={() => onEmojiPress(item)}>
                  <Image source={item} key={index} style={styles.image} />
                </Pressable>
              );
            }}
          />
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    listContainer: {
      borderTopRightRadius: theme.spacing(1),
      borderTopLeftRadius: theme.spacing(1),
      paddingHorizontal: theme.spacing(2),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    image: {
      width: 40,
      height: 40,
      marginRight: theme.spacing(1),
      borderColor: theme.colors.primary,
      borderRadius: theme.roundness,
      borderWidth: StyleSheet.hairlineWidth,
    },
  });
};
