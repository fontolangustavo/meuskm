import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import { Icon } from 'react-native-elements'
import ActionButton from 'react-native-action-button';

import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';

export class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infos: [
            ]
        }
        
        this.didFocusListener = this.props.navigation.addListener(
            'didFocus',
            this.componentWillMount
        );
    }

    componentWillMount = async () => {
        try {
            let infos = await AsyncStorage.getItem('infos');
            infos = JSON.parse(infos);
            console.log(infos);
            this.setState({ infos });

            // await AsyncStorage.clear();
        } catch (e) {
            console.log(e);
        }
    }

    _novoRegistro = () => {
        const { navigate } = this.props.navigation;
        navigate('AddInfo');
    }

    _keyExtractor = (item) => item.id.toString();

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
