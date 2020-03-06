import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Keyboard,
  RefreshControl,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {RectButton} from 'react-native-gesture-handler';

export default function Main({navigation}) {
  const [checkList, setCheckList] = useState([]);
  const [newCheckList, setNewCheckList] = useState('');

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
    setCheckList([newCheckList, ...checkList]);
    Keyboard.dismiss();
  };

  const handleNavigate = list => {
    navigation.navigate('List', {list});
  };

  useEffect(() => {
    async function storageList() {
      const checkListStorage = await AsyncStorage.getItem('checklist');
      if (checkListStorage) {
        setCheckList(JSON.parse(checkListStorage));
      }
    }
    storageList();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('checklist', JSON.stringify(checkList));
  }, [checkList]);

  return (
    <SafeAreaView>
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
    </SafeAreaView>
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
    borderRadius: 4,
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
