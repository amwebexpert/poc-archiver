import React from "react";
import { View } from "react-native";
import prettyBytes from "pretty-bytes";
import { format } from "date-fns";
import { Text, List } from "react-native-paper";
import * as fileService from "~/services/file-service";

export const FileInfo = ({ item }) => {
  const size = prettyBytes(item.size);
  const extension = fileService.getFileExtensionOnly(item.fileUri);
  const formattedDate = format(item.modifiedAt, "yyyy-MM-dd HH:mm:ss");

  return (
    <List.Item
      title={
        <View>
          <Text variant="bodyLarge">{item.name}</Text>
          <Text variant="bodySmall">{formattedDate}</Text>
        </View>
      }
      left={(props) => <List.Icon {...props} icon={IconNames.get(extension)} />}
      right={(props) => <Text {...props}>{size}</Text>}
      onPress={() => fileService.shareFile(item.fileUri)}
    />
  );
};

const IconNames = new Map([
  ["jpg", "image"],
  ["txt", "text"],
]);
