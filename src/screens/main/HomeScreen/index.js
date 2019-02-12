import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'

import { FlatList } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { TextMask } from 'react-native-masked-text';
import ActionButton from 'react-native-action-button';
import Swipeout from 'react-native-swipeout';

import styles from './styles';

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
            if (infos) {
                infos = JSON.parse(infos);
            } else {
                infos = [];
            }

            this.setState({ infos });

        } catch (e) {
            console.log(e);
        }
    }

    _novoRegistro = () => {
        const { navigate } = this.props.navigation;
        navigate('AddInfo');
    }

    _apagarRegistro = async (index) => {
        let { infos } = this.state;
        infos.splice(index, 1);
        this.setState({ infos });

        await AsyncStorage.setItem('infos', JSON.stringify(infos));
    }

    _keyExtractor = (item) => item.id.toString();

    _renderItem = ({ item, index }) => {
        var swipeoutBtns = [
            {
                text: 'Apagar',
                type: 'delete',
                onPress: () => this._apagarRegistro(index)
            }
        ]

        return (
            <Swipeout
                style={styles.itemSwip}
                autoClose={true}
                right={swipeoutBtns}>
                <View style={styles.item}>
                    <View style={styles.itemLeft}>
                        <View style={{ backgroundColor: '#00CD00', height: '100%', width: 2 }}>
                        </View>
                    </View>
                    <View style={styles.itemRight}>
                        <View style={styles.itemRightInfo}>
                            <Text style={styles.itemContent}>
                                Tipo: {item.name}
                            </Text>
                            <Text style={styles.itemContent}>
                                Custo: {item.price}
                            </Text>
                            <Text style={styles.itemContent}>
                                Km: {item.km}
                            </Text>
                        </View>
                        <View style={styles.itemRightData}>
                            <Text style={styles.itemContent}>
                                Data:
                            </Text>
                            <TextMask
                                style={{ marginLeft: 5 }}
                                value={item.date}
                                type={'datetime'}
                                options={{
                                    format: 'DD/MM/YYYY'
                                }} />
                        </View>
                    </View>

                </View>
            </Swipeout>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.infos.length ?
                    <FlatList
                        style={{ height: '100%', width: '100%' }}
                        contentContainerStyle={{ padding: 10 }}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        data={this.state.infos}
                    />
                    :
                    <View style={styles.noRegisterContainer}>
                        <Text style={styles.noRegisterText}>Nenhum registro.</Text>
                    </View>
                }
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#6FD119' title="Novo registro" onPress={this._novoRegistro}>
                        <Icon name="create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }
}

export default HomeScreen
