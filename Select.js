import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, Linking, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {gymNum, gymName} from './enums'
import {CheckBox} from "react-native-web";
import {classes_api, default_classes_api} from "./API_list"
export default function App() {
    const [selectedGym, setSelectedGym] = useState(""); // 선택한 체육관 이름 상태 변수
    const [data, setData] = useState(null);
    const [showAll, setShowAll] = useState(true); // 전체 보기 여부
    const [showAvailable, setShowAvailable] = useState(true); // 잔여가 있는 강좌 보기 여부

    // API 요청 함수
    const fetchData = async (gymName) => {
        try {
            const response = await axios.get(`${classes_api}/${gymName}`); // API 엔드포인트와 선택한 체육관 이름을 조합
            const result = await response.data;
            setData(result);
        } catch (error) {
            console.error('API 호출 중 에러:', error);
        }
    };

    // 체육관 선택 시 호출되는 함수
    const handleSelectGym = (gym) => {
        setSelectedGym(gym);
        const num = gymNum[gym];
        fetchData(num); // 선택한 체육관에 대한 API 요청 보내기
    };
    const filteredData = data?.filter((item) => {
        if (showAll) {
            return true; // 전체 보기가 선택된 경우 모든 강좌 표시
        } else if (showAvailable) {
            const hasNumber = /\d/.test(item["잔여"]);
            return hasNumber; // 잔여가 있는 강좌만 보기가 선택된 경우 잔여가 있는 강좌만 표시
        } else {
            return false; // 전체 보기도 아니고 잔여가 있는 강좌만 보기도 아닌 경우 아무 것도 표시하지 않음
        }
    });

    const makeAlram = (itemInfo)=>{

    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>선택한 체육관: {selectedGym}</Text>
            <View>
                <FlatList
                    horizontal
                    data={gymName}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.button,
                                item === selectedGym ? styles.selectedButton : null
                            ]}
                            onPress={() => handleSelectGym(item)}
                        >
                            <Text style={styles.buttonText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <Text>필터 옵션:</Text>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={showAll}
                    onValueChange={() => setShowAll(!showAll)}
                />
                <Text>전체 보기</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={showAvailable}
                    onValueChange={() => setShowAvailable(!showAvailable)}
                />
                <Text>잔여가 있는 강좌만 보기</Text>
            </View>
            <View style={styles.dataContainer}>
                {filteredData && filteredData.map((item, index) => (
                    <View key={index} style={styles.dataItem}>
                        <Text style={styles.dataClass}>Class: {item["강좌명"]}</Text>
                        <Text style={styles.dataResidue}>Residue: {item["잔여"]}</Text>
                        <Button
                            title="강좌 정보 보기"
                            onPress={() => Linking.openURL(item.url)}
                        />
                        <View>
                            <CheckBox
                                title="알람보내기"
                                onValueChange={() => makeAlram(item) }
                            />
                        </View>
                    </View>

                ))}
            </View>
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        width: 100, // 버튼 너비 지정
        height: 40, // 버튼 높이 지정
        backgroundColor: 'lightgray'

    },
    selectedButton: {
        margin: 5,
        backgroundColor: 'lightblue', // 선택된 버튼의 배경색
    },
});