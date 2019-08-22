import React, { Component } from 'react'
import Spalsh from './src/screen/Splash'
import MainNavigator from './src/public/MainNavigation'

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            view: <Spalsh />
        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                view: <MainNavigator />
            })
        }, 1500)
    }
    render(){
        return(
            <>
                {this.state.view}
            </>
        )
    }
}
