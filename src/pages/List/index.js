import React, {useState, useEffect, useCallback} from 'react';
import CheckBox from '@react-native-community/checkbox';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Keyboard,
  RefreshControl,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {RectButton} from 'react-native-gesture-handler';

export default function List({route}) {
  console.tron.log(route);
  const [checkListItem, setCheckListItem] = useState([]);
  const [newCheckListItem, setNewCheckListItem] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(1000).then(() => setRefreshing(false));
  }, [refreshing]);

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const handleAddCheckList = () => {
    setCheckListItem([newCheckListItem, ...checkListItem]);
    Keyboard.dismiss();
  };

  useEffect(() => {
    async function storageList() {
      const checkListStorageItem = await AsyncStorage.getItem(
        route.params.list,
      );
      if (checkListStorageItem) {
        setCheckListItem(JSON.parse(checkListStorageItem));
      }
    }
    storageList();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(route.params.list, JSON.stringify(checkListItem));
  }, [checkListItem]);

  return (
    <View
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.viewForm}>
        <TextInput
          style={styles.formInput}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="add checklist"
          onChangeText={text => setNewCheckListItem(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddCheckList}
        />
        <RectButton onPress={handleAddCheckList} style={styles.rectButton}>
          <Text> + </Text>
        </RectButton>
      </View>

      <View>
        <FlatList
          data={checkListItem}
          renderItem={({item}) => (
            <Text>
              <CheckBox />
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

List.navigationOptions = {
  // title: 'Homes',
};
