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

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

type Props = {};
export default class App extends Component<Props> {
    constructor(props){
        super(props);

        let { initPage = 0, containerPadding = 10 } = (props || {});
        initPage = initPage <=0 ? 0 : initPage;


        this.state = {
            pageNum: 5,
            pageIndex: initPage,
            containerWidth: SCREEN_WIDTH - containerPadding * 2,
            containerPadding: containerPadding
        }

    }

    componentDidUpdate(){

    }
    componentDidMount(){

    }

    render() {

        return (<PageableScrollView style={[styles.scroll]} contentStyle={[styles.page]}>
            <View style={[styles.content]}><Text style={[styles.normal]}>The first page</Text></View>
            <View style={[styles.content]}><Text style={[styles.normal]}>The second page</Text></View>
            <View style={[styles.content]}><Text style={[styles.normal]}>The third page</Text></View>
            <View style={[styles.content]}><Text style={[styles.normal]}>The fourth page</Text></View>
            <View style={[styles.content]}><Text style={[styles.normal]}>The fifth page</Text></View>
        </PageableScrollView>)
    }

}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        marginTop: 30,
    },
    page: {
        height: 100
    },
    beginning: {
        marginLeft: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#18A0F0'

    },
    normal: {
        color: '#FFF'
    }
});
