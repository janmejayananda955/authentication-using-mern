import { View, FlatList, Text, TouchableOpacity, TextInput } from "react-native";

import { useState } from "react";

export const DataList = ({ listData, editData, deleteData }: any) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (id: number, currentData: string) => {
    setEditingId(id);
    setEditValue(currentData);
  };

  const handleSave = (id: number) => {
    if (editValue.trim()) {
      editData(id, editValue);
    }
    setEditingId(null);
  };

  return (
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id.toString()}
        className="bg-gray-400 rounded px-2 flex-1 mt-2"
        
        renderItem={({ item }) => (
          <View className="flex flex-row justify-between items-center bg-gray-600 mb-1 p-3 rounded">
            {editingId === item.id ? (
              <TextInput
                value={editValue}
                onChangeText={setEditValue}
                className="text-white bg-gray-500 rounded px-2 py-1 text-2xl flex-1 mr-2"
                autoFocus
              />
            ) : (
              <Text className="text-white mb-1 text-2xl flex-1 mr-2">
                {item.data}
              </Text>
            )}
            <View className="flex flex-row justify-between gap-2">
              {editingId === item.id ? (
                <TouchableOpacity onPress={() => handleSave(item.id)}>
                  <Text className="text-white text-2xl bg-green-500 px-4 py-2 rounded-xl">
                    save
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handleEdit(item.id, item.data)}>
                  <Text className="text-white text-2xl bg-gray-500 px-4 py-2 rounded-xl">
                    edit
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => deleteData(item.id)}>
                <Text className="text-white text-2xl bg-red-500 px-4 py-2 rounded-xl">
                  delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
  );
};
