import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Icon, Divider } from 'react-native-elements'
import ActionButton from 'react-native-action-button';

import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';

export class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infos: [
                {
                    id: '01',
                    name: 'Gasolina',
                    price: 40,
                    km: 22033411
                },
                {
                    id: '03',
                    name: 'Freios',
                    price: 195.90,
                    km: 22067411
                },
                {
                    id: '02',
                    name: 'Gasolina',
                    price: 100,
                    km: 22093411
                }
            ]
        }
    }

    _novoRegistro = () => {
        const { navigate } = this.props.navigation;
        navigate('AddInfo');
    }

    _keyExtractor = (item) => item.id;

    _renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <View style={{ backgroundColor: '#00CD00', height: '100%', width: 2 }}>
                    </View>
                </View>
                <View style={styles.itemRight}>
                    <Text style={styles.itemContent}>
                        Tipo: {item.name}
                    </Text>
                    <Text style={styles.itemContent}>
                        Custo: R$ {item.price}
                    </Text>
                    <Text style={styles.itemContent}>
                        Km: {item.km}
                    </Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    style={{ height: '100%', width: '100%' }}
                    contentContainerStyle={{ padding: 10 }}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    data={this.state.infos}
                />
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="Novo registro" onPress={this._novoRegistro}>
                        <Icon name="create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    {/* <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => { }}>
                        <Icon name="notifications-off" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
                        <Icon name="done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item> */}
                </ActionButton>

                {/* <FlatList
                    data={[{ key: 'a' }, { key: 'b' }]}
                    renderItem={({ item }) => <Text>{item.key}</Text>}
                /> */}

            </View>
        )
    }
}

export default HomeScreen
