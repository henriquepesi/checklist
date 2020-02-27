import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Keyboard,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {RectButton} from 'react-native-gesture-handler';

// import { Container } from './styles';

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//     itens: [],
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//     itens: [],
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//     itens: [],
//   },
// ];

export default function Main({navigation}) {
  const [checkList, setCheckList] = useState([]);
  const [newCheckList, setNewCheckList] = useState('');

  // useEffect(() => {
  //   AsyncStorage.getItem('checkList').then(response => {
  //     setCheckList(JSON.parse(response));
  //   });
  // }, []);

  // const getCheckList = useCallback(() => {
  //   AsyncStorage.getItem('checkList').then(value => {
  //     setCheckList(JSON.parse(value));
  //   });
  // }, [checkList]);

  useEffect(() => {
    AsyncStorage.setItem('checkList', JSON.stringify(checkList));
  }, [checkList]);

  useEffect(() => {
    setCheckList(checkList);
  }, []);

  const handleAddCheckList = () => {
    setCheckList([
      {
        title: newCheckList,
        itens: [],
      },
      ...checkList,
    ]);
    Keyboard.dismiss();
  };

  const handleNavigate = list => {
    navigation.navigate('List', {...list});
    console.tron.log(list);
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewForm}>
        <TextInput
          style={styles.formInput}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="add checklist"
          onChangeText={text => setNewCheckList(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddCheckList}
        />
        <RectButton onPress={handleAddCheckList} style={styles.rectButton}>
          <Text> + </Text>
        </RectButton>
      </View>

      <View>
        <FlatList
          data={checkList}
          renderItem={({item}) => (
            <Text onPress={() => handleNavigate(item)}>
              <Text>{item.title}</Text>
            </Text>
          )}
          keyExtractor={item => item.title}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
    marginTop: 25,
    marginRight: 25,
    marginBottom: 25,
  },
  formInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 20,
  },
  viewForm: {
    flexDirection: 'row',
  },
  rectButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#04D361',
    borderRadius: 4,
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 10,
  },
  rectButtonText: {color: '#fff'},
});

Main.navigationOptions = {
  // title: 'Homes',
};
