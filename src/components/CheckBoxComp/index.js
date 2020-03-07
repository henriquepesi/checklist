import React from 'react';
import {View} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import {Container} from './styles';

export default function CheckBoxComp() {
  return <CheckBox value={true} disabled={false} />;
}
