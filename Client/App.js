// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { View, Platform, KeyboardAvoidingView, StyleSheet, Keyboard, TouchableWithoutFeedback, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";

import Header from "./components/Header";
import Query from "./components/Query";
import ViewResults from "./components/ViewResults";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  const [data, setData] = useState([[]]);
  const [col, setCol] = useState([]);
  const [time, setTime] = useState();
  // const [getSqlBtn, setSqlBtn] = useState(true);
  // const [getRsBtn, setRsBtn] = useState(false);
  const [database, setDatabase] = useState("MySQL");
  const [dataset, setDataset] = useState("InstaCart");
  const [loading, setLoading] = useState(false);
  const [queryStatus, setQueryStatus] = useState("");
  const activateQueryFunc = useRef();

  const resetData = () => {
    setData([[]]);
    setCol([]);
    setTime();
    setQueryStatus("");
    // console.log("Hello")
  }

  const activateQueryProcess = () => {
    // console.log("Hiiiii");
    activateQueryFunc.activate();
  }

  // useEffect(() => {
  //   activateQueryProcess = activateQueryFunc;
  // }, [])

  return (
   
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {/* <ScrollView> */}
      <View backgroundColor="#FFF8DC">
        <Header database={database} dataset={dataset} setDatabase={setDatabase} setDataset={setDataset} activateQueryProcess={activateQueryProcess} setData={setData} setCol={setCol} setTime={setTime} setLoading={setLoading} setQueryStatus={setQueryStatus}/>
        <Query setCol={setCol} setData={setData} setTime={setTime} database={database} dataset={dataset} setLoading={setLoading} resetData={resetData} activateQueryFunc={activateQueryFunc} setQueryStatus={setQueryStatus}/>
        {!loading && <ViewResults col={col} data={data} time={time} queryStatus={queryStatus}></ViewResults>}
        {loading && <ActivityIndicator size="large" color={"#00d1b550"} />}
      </View>
      {/* </ScrollView> */}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
   
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 0,
    flex: 1,
    flexDirection: "column",
  },
});
