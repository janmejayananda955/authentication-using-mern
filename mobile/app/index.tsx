import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewBase,
} from "react-native";
import { Header } from "./components/header";
import { DataList } from "./components/dataList";
import { useState } from "react";

interface Props {
  id: number;
  data: string;
}

export default function Index() {
  const [inputData, setInputData] = useState("");
  const [listData, setListData] = useState<Props[]>([]);

  // on pressing add button, the new todo will be added to the list from the text input value
  const addData = () => {
    if (!inputData.trim()) return; // prevent adding empty todos

    setListData([...listData, { id: Date.now(), data: inputData }]);
    setInputData("");
  };

  const editData = (index: number, newData: string) => {
    setListData(
      listData.map((item) =>
        item.id === index ? { ...item, data: newData } : item,
      ),
    );
  };

  // after clicking delete button, the item will be removed from the list
  const deleteData = (index: number) => {
    setListData(listData.filter((item) => item.id !== index));
  };

  return (
    <View className="flex-1 flex flex-col pl-4 pr-4 pt-10 bg-gray-900">
      <Header />
      <View className="flex flex-col mb-5 mt-5">
        <Text className="text-white text-2xl font-bold">My Todos</Text>
        <View className="flex flex-row justify-between gap-4 mt-2 w-full">
          <TextInput
            placeholder="Enter a new todo..."
            className="bg-gray-400 text-white border border-gray-400 rounded px-4 py-2 flex-1"
            value={inputData}
            onChangeText={setInputData}
          />
          <TouchableOpacity
            className="bg-purple-500 px-4 py-2 rounded justify-center"
            onPress={addData}
          >
            <Text className="text-white text-2xl">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-screen-safe mb-10">
        <DataList
          listData={listData}
          editData={editData}
          deleteData={deleteData}
        />
      </View>
    </View>
  );
}
