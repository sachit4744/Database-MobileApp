import React, { useEffect, useState } from "react";
import CheckBox from "expo-checkbox";
import { RadioButton } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Picker
} from "react-native";
import SendQuery from "../services/SendQuery";
import Tooltip from 'react-native-walkthrough-tooltip';

const Header = ({database, dataset, setDatabase, setDataset, activateQueryProcess, setData, setCol, setTime, setLoading, setQueryStatus}) => {
    // const [getQuery, setQuery] = useState("");
    // const [sql, setSql] = useState(true);
    // const [rs, setRs] = useState(false);
    const [toolTipVisible, setToolTipVisible] = useState(true);
    const [selectedValue, setSelectedValue] = useState("java");

    const changeDataset = (ds) => {
      let dbquery = ""
      if(database=="MySQL") {
        if(ds=="InstaCart") {
          dbquery = "Use Instacart;"
        } else {
          dbquery = "Use ABC;"
        }
      } else {
        if(ds=="InstaCart") {
          dbquery = "set search_path=public"
        } else {
          dbquery = "set search_path = ABC;"
        }
      }
      console.log(dbquery);
      SendQuery(dbquery, database, setData, setCol, setTime, setLoading, setQueryStatus);
    }

    // Improve the UI Here,
    return (
        <View>
          {/* <View style={{ flexDirection: "row" ,marginLeft: 20, justifyContent: 'space-evenly' }}> */}
          <Text style={styles.title}>Database Mobile Application
          </Text>
          {/* <Tooltip
              isVisible={toolTipVisible}
              content={<Text>Hello!</Text>}
              placement="top"
              onClose={() => setToolTipVisible(false)}
            >
              <TouchableHighlight style={styles.touchable}>
                <Text>Press Me!!</Text>
              </TouchableHighlight>
            </Tooltip>
          </View> */}
            <View style={styles.buttons}>
            {/* <Text style={styles.dbs}>Database:</Text> */}
            
            <View style={styles.btn}>
              <View style={{borderRadius: 5, borderWidth: 2, backgroundColor: "#FFF", borderColor: 'black', marginRight: 30}}>
            <Picker
              //selectedValue={selectedValue}
              style={{ height: 30, width: 150, borderColor: "#000000" }}
              onValueChange={(selectedValue) => {
              setSelectedValue(selectedValue);
              console.log("VALUE", selectedValue);
              setDataset(selectedValue);
              // changeDataset('InstaCart');
              activateQueryProcess(); }}>
              <Picker.Item label="InstaCart" value="InstaCart" />
              <Picker.Item label="ABC Retail" value="ABC" />
            </Picker>
            </View>
            {/* <Text style={styles.dbs}>Connection:</Text> */}
            <Text>MySQL </Text>
            <RadioButton
                value="MySQL"
                backgroundColor="#3c3c3c"
                status={ database === 'MySQL' ? 'checked' : 'unchecked' }
                onPress={() => {
                  setDatabase('MySQL');
                  activateQueryProcess();
                }}
            />
            </View>
            <View style={styles.btn}>
            <Text> RedShift </Text>
            <RadioButton
                value="Redshift"
                status={ database === 'Redshift' ? 'checked' : 'unchecked' }
                onPress={() => {
                  setDatabase('Redshift');
                  activateQueryProcess();
                }}
            />
            </View>
            </View>

            <View style={styles.buttons}>
            {/* <View style={styles.btn}>
            <Text style={styles.dbs}>Database:</Text>
            <Text> InstaCart </Text>
            <RadioButton
                value="InstaCart"
                status={ dataset === 'InstaCart' ? 'checked' : 'unchecked' }
                onPress={() => {
                  setDataset('InstaCart');
                  // changeDataset('InstaCart');
                  activateQueryProcess();
                }}
            />
            </View> */}
            {/* <View style={styles.btn}>
            <Text> ABC </Text>
            <RadioButton
                value="ABC"
                color="#3c3c3c"
                status={ dataset === 'ABC' ? 'checked' : 'unchecked' }
                onPress={() => {
                  setDataset('ABC');
                  // changeDataset('ABC');
                  activateQueryProcess();
                }}
            />
            </View> */}
            </View>
            <View >
            
    </View>
        </View>
    );
  };
  
  export default Header;
  const styles = StyleSheet.create({
    container: {
      marginTop: 50,
      padding: 20,
      flex: 1,
      flexDirection: "column",
    },
  
    buttons: {
      flexDirection: "row",
      justifyContent: "flex-end",
      fontWeight: "bold",
      marginTop: 1,
    },
  
    checkbox: {
      alignSelf: "center",
    },
  
    querytext: {
      padding: 10,
    },
    inner: {
      padding: 24,
      flex: 1,
      justifyContent: "space-around"
    },
    header: {
      fontSize: 36,
      marginBottom: 48
    },
    textInput: {
      height: 40,
      borderColor: "#000000",
      borderBottomWidth: 1,
      marginBottom: 20
    },
    btnContainer: {
      backgroundColor: "white",
      marginTop: 12
    },
    title: {
      textAlign: "center",
      fontSize: 20,
      marginTop:50,
      marginBottom: 10,
      fontWeight: "bold",
    },
    dbs: {
      fontWeight: "bold",
      marginRight: 20,
    },
    btn: {
      flexDirection: "row",
      alignItems: "center",
    },
  });
