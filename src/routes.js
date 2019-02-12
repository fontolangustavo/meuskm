import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import MainRouter from './routes/Main.routes'

const switchApp = createSwitchNavigator({
    Main: {
        screen: MainRouter
    }
});

export default createAppContainer(switchApp);