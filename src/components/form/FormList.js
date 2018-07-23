import React, { Component } from 'react'
import Icon                 from 'react-native-vector-icons/FontAwesome'
import Card                 from '../common/Card'
import moment               from 'moment'

import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

class FormList extends Component {
  _keyExtractor = (form) => `${form.id}-${form.name}`

  _renderItem = ({ item }) => {
    const { onPress, selectedIds } = this.props
    const { id, name, updatedAt }  = item
    const updatedAtInWord          = moment(updatedAt).fromNow()

    return (
      <TouchableOpacity onPress={ () => { if (onPress) onPress(id) } }>
        <Card style={{marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View>
            <Text style={{ fontSize: 17, marginBottom: 5 }}>{ name }</Text>
            <Text style={{ fontSize: 10 }}>{ updatedAtInWord }</Text>
          </View>
          {
            (selectedIds !== undefined && selectedIds.includes(id)) &&
            <Icon name ='check-circle' color='#219724' size={30}/>
          }
        </Card>
      </TouchableOpacity>
    )
  }

  render() {
    const { dataSource, selectedIds } = this.props;

    return (
      <FlatList
        data={dataSource}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        showsVerticalScrollIndicator={false}
        extraData={ selectedIds }
      />
    );
  }
}

export default FormList;