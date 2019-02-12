import { createStackNavigator } from 'react-navigation';

import HomeScreen from 'meuskm/src/screens/main/HomeScreen'
import AddInfoScreen from 'meuskm/src/screens/main/AddInfoScreen'

const MainRouter = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                title: 'Meus KM'
            }
        },
        AddInfo: {
            screen: AddInfoScreen,
            navigationOptions: {
                title: 'Adicionar registro'
            }
        }
    }
);

export default MainRouter;