/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    ScrollView,
    Dimensions,
    Text,
    View
} from 'react-native';

import PageableScrollView from 'react-native-pageable-scrollview';

import { BothSideNavigator, TabNavigator } from './components/Navigator';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

type Props = {};
export default class App extends Component<Props> {
    constructor(props){
        super(props);


        this.state = {
            view: ''
        }

    }

    componentDidUpdate(){

    }
    componentDidMount(){

    }

    render() {
        let list = [{title: 'React'},{title: 'Vue'},{title: 'Angular'}];

        return (<View style={[styles.container]}>
                    <View style={[styles.navigator]}><TabNavigator list={list} /></View>
                    <View style={[styles.main]}>
                        <BothSideNavigator style={[styles.navLeft]} type={'left'} />
                        <PageableScrollView style={[styles.scroll]} contentStyle={[styles.page]} containerPadding={0}>
                            <View style={[styles.content]}><Text style={[styles.normal]}>The first page</Text></View>
                            <View style={[styles.content]}><Text style={[styles.normal]}>The second page</Text></View>
                            <View style={[styles.content]}><Text style={[styles.normal]}>The third page</Text></View>
                            <View style={[styles.content]}><Text style={[styles.normal]}>The fourth page</Text></View>
                            <View style={[styles.content]}><Text style={[styles.normal]}>The fifth page</Text></View>
                        </PageableScrollView>
                        <BothSideNavigator style={[styles.navRight]} typpe={'right'} />
                    </View>
                </View>)
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    main: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        alignItems: 'center'

    },
    navigator: {
        height: 60,
        width: 375
    },
    navLeft: {
        marginHorizontal: 10
    },
    navRight: {
        marginHorizontal: 10,
    },
    scroll: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        height: 360
    },
    page: {

    },
    beginning: {
        marginLeft: 20,
    },
    content: {
        flex: 1,
        marginHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#18A0F0'

    },
    normal: {
        color: '#FFF'
    }
});
