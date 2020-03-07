import React from 'react';

import {Item, ItemTitle, ItemExcerpt, SpanCircle} from './styles';

export default function ListItem(props) {
  return (
    <Item onPress={props.onPress}>
      <SpanCircle />
      <ItemTitle>{props.name}</ItemTitle>
      <ItemExcerpt>Lorem ipsum dolor sit amet consectetur</ItemExcerpt>
    </Item>
  );
}
