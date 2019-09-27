import React, { Component } from 'react';
import {Text} from 'react-native';

export default class reviewScreen extends Component{
    render(){
        const { navigation } = this.props;
        let data1 = navigation.getParam("mess_details");
        console.log(data1);
        return(
            <Text>xxx</Text>
        );
    }
}