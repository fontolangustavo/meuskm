import React, { Component } from 'react';
import { Text, TextInput, View, TouchableHighlight, AsyncStorage } from 'react-native';

import styles from './styles';

export class AddInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      price: '',
      km: ''
    };
  }

  _registrar = async () => {
    const { goBack } = this.props.navigation;

    try {
      let infos = await AsyncStorage.getItem('infos');
      infos = JSON.parse(infos);
      let { ...registro } = this.state;

      if (!infos.length) {
        infos = [];
        registro.id = 1;
      }else{
        registro.id = infos[infos.length - 1].id + 1;
      }

      infos.push(registro);

      console.log(infos);

      await AsyncStorage.setItem('infos', JSON.stringify(infos));
      goBack();
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.placeholder}>
          Descrição
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ name: text })}
          value={this.state.name}
        />

        <Text style={styles.placeholder}>
          Preço
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ price: text })}
          value={this.state.price}
        />

        <Text style={styles.placeholder}>
          Kilometragem
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ km: text })}
          value={this.state.km}
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor='#F9F9F9'
          onPress={this._registrar}>
          <Text style={styles.buttonText}>
            Adicionar
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default AddInfoScreen
