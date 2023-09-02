import { StatusBar } from 'expo-status-bar';
import React,  { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import Select from './Select'
export default  function App() {

  const [data, setData] = useState(null);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }

  // useEffect(() => {
  //   const url = "https://ddt6tjz9bd.execute-api.ap-northeast-2.amazonaws.com/dev/";
  //     axios
  //         .get(url)
  //         .then((response) => {
  //           // API 응답 처리
  //           setData(response.data);
  //         })
  //         .catch((error) => {
  //           console.error("API 호출 중 에러:", error);
  //         });
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Select></Select>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dataContainer: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
    padding: 10,
  },
  dataItem: {
    marginBottom: 10,
  },
  dataClass: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dataResidue: {
    fontSize: 14,
    color: 'green',
  },
  dataNum: {
    fontSize: 14,
  },
});
