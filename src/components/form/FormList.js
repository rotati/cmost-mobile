import React, { Component } from 'react'
import Icon                 from 'react-native-vector-icons/FontAwesome'
import Card                 from '../common/Card'

import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

class FormList extends Component {
  _keyExtractor = (form) => `${form.id}-${form.name}`

  _renderItem = ({ item }) => {
    const { onPress, selectedIds } = this.props;

    return (
      <TouchableOpacity onPress={ () => { if (onPress) onPress(item.id) } }>
        <Card style={{marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View>
            <Text style={{ fontSize: 17, marginBottom: 5 }}>{ item.name }</Text>
            <Text style={{ fontSize: 10 }}>{ item.created_at }</Text>
          </View>
          {
            (selectedIds !== undefined && selectedIds.includes(item.id)) &&
            <Icon name ='check-circle' color='#219724' size={30}/>
          }
        </Card>
      </TouchableOpacity>
    )
  }

  render() {
    const { dataSource } = this.props;

    return (
      <FlatList
        data={dataSource}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

export default FormList;