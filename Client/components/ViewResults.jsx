import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { Dimensions } from 'react-native';

const ViewResults = ({col, data, time, queryStatus}) => {
  // const leftRef = useRef<ScrollView>(null);
  console.log(data);
  console.log(time);
  const [wa, setWa] = useState([]);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  let tmp = [];

  useEffect(()=>{
    if(data[0]!=undefined){
      tmp = Array(data[0].length).fill(0);
      for(let i=0;i<data.length;i++) {
        // console.log(data[i].map(e => e.length));
        for(let j=0;j<data[i].length;j++) {
          // console.log(String(data[i][j]).length);
          // console.log(wa[j]);
          tmp[j] = Math.max(tmp[j],String(data[i][j]).length);
        }
      }
      // console.log(tmp);
      for(let i=0;i<col.length;i++) {
        tmp[i] = Math.max(tmp[i],String(col[i]).length);
      }
      // console.log(tmp);
      setWa(tmp.map(x => x*8));
    }
  }, [])

  return (
    <View onStartShouldSetResponder={() => true} style={{height: windowHeight*0.68}}>
      {time!=undefined && <Text style={styles.elapsedTime}>Time Elapsed: {time} milliseconds </Text>}
      {/* {queryStatus!="" && <Text style={styles.errorMessage}>Query Status: {queryStatus} </Text>} */}
      {queryStatus!="" && <Text style={queryStatus == "Success" ? styles.serrorMessage : styles.errorMessage}>Query Status: {queryStatus} </Text>}
      {/* <ScrollView> */}
      {/* <Text>{wa}</Text> */}
      { queryStatus=="Success" && <ScrollView horizontal = {true} contentContainerStyle={{ flexGrow: 1}}>
        <View style={{padding: 20}}>
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={col} widthArr={wa} style={styles.HeadStyle} textStyle={styles.HeadText}/>
        </Table>
        
        <ScrollView style={{marginTop: -1}}>
        <Table borderStyle={{borderWidth: 1}}>
          <Rows data={data} widthArr={wa} style={styles.RowStyle} textStyle={styles.RowText}/>
          {/* {
            data.map((d,i) => (
              <Row
                key={i}
                data={d}
                // widthArr={state.widthArr}
                style={[styles.RowStyle, i%2 && {backgroundColor: '#F7F6E7'}]}
                textStyle={styles.RowText}
              />
            ))
          } */}
        </Table>
        </ScrollView>
        </View>
      </ScrollView>}
      {/* </ScrollView> */}
      </View>

   
  );
};

export default ViewResults;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#ffffff' },
  // container: {
  //   paddingTop: 100,
  //   paddingHorizontal: 30,
  // },
  tableContainer: {paddingTop: 10, paddingHorizontal: 30,},
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' },
  HeadStyle: { 
    // height: 50,
    alignContent: "center",
    backgroundColor: '#e9967a',
    // minWidth: 130,
    // maxWidth: 150,
  },
  RowStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flex: 3,
    // minWidth: 130,
    // maxWidth: 150,
  },
  HeadText: { 
    // margin: 10,
    paddingLeft: 4,
    paddingTop: 3,
    // flex: 3,
    // minWidth: 130,
    // maxWidth: 130,
    minHeight: 30,
    maxHeight: 30,
    // width: '100%',
    // height: 100
  },
  RowText: { 
    // margin: 10,
    paddingLeft: 3,
    paddingTop: 7,
    // flex: 3,
    // minWidth: 130,
    // maxWidth: 130,
    minHeight: 50,
    maxHeight: 50,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-around",
    flex: 3,
    // width: '100%',
    // height: 100
  },
  mainbox:{
    textAlign:'center',
    margin: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  databeBox:{
    margin: 10,
    textAlign: 'center',
  },
  databeHeader:{
    margin: 10,
    textAlign: 'center',
    paddingLeft:5,
    backgroundColor: '#DCDCDC',
  },
  elapsedTime:{
    textAlign: "center",
    // fontStyle: "italic",
    marginTop: 5,
  },
  errorMessage:{
    textAlign: "center",
    fontFamily: 'monospace',
    marginTop: 5,
    marginBottom: 5,
    color: '#e9967a'
  },
  serrorMessage:{
    textAlign: "center",
    fontFamily: 'monospace',
    marginTop: 5,
    marginBottom: 5,
    color : '#e9967a',
  },
  // container: { 
  //   flex: 1, 
  //   padding: 16, 
  //   paddingTop: 30, 
  //   backgroundColor: '#ffffff' 
  // },
  // head: { 
  //   height: 50, 
  //   backgroundColor: '#6F7BD9' 
  // },
  // text: { 
  //   textAlign: 'center', 
  //   fontWeight: '200' 
  // },
  dataWrapper: { 
    marginTop: -1 
  },
  // row: { 
  //   height: 40, 
  //   backgroundColor: '#F7F8FA' 
  // }
});
