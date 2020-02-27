import React, {useState, useEffect} from 'react';
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

export default function Main({navigation}) {
  const [checkList, setCheckList] = useState([]);
  const [newCheckList, setNewCheckList] = useState('');

  const handleAddCheckList = () => {
    setCheckList([newCheckList, ...checkList]);
    Keyboard.dismiss();
  };

  const handleNavigate = list => {
    navigation.navigate('List', {...list});
  };

  useEffect(() => {
    AsyncStorage.setItem('checkList', JSON.stringify(checkList));
  }, [checkList]);

  useEffect(() => {
    async function getAsyncData() {
      console.tron.log(await AsyncStorage.getItem('checkList'));
    }

    getAsyncData();
  }, [checkList]);

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
              <Text>{item}</Text>
            </Text>
          )}
          keyExtractor={item => item}
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
