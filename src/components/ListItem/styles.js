import styled from 'styled-components/native';

export const Item = styled.TouchableOpacity`
  /* border: 1px solid red; */
  position: relative;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  background: ${props => props.theme.colors.white};
  box-shadow: 10px 5px 15px black;
`;

export const ItemTitle = styled.Text`
  color: ${props => props.theme.colors.text};
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
  margin-left: 15px;
`;

export const ItemExcerpt = styled.Text`
  color: ${props => props.theme.colors.gray};
`;

export const SpanCircle = styled.Text`
  position: absolute;
  left: 10px;
  top: 15px;
  height: 10px;
  width: 10px;
  background: ${props => props.theme.colors.secundary};
  border-radius: 25px;
`;
