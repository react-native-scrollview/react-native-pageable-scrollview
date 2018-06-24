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
import {
    BothSideNavigator,
    TopNavigator,
    BottomNavigator
} from 'react-native-pageable-scrollview/components/Navigator';

/*import { BothSideNavigator, TopNavigator, BottomNavigator } from './components/Navigator';*/

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
        let list2 = [
                {title: '微信',iconfont: '58894'},      // 字体对应的16进制 &#xe60e;
                {title: '通信录',iconfont: '58965'},    // 字体对应的16进制 &#xe655;
                {title: '发现',iconfont: '58889'},     // 字体对应的16进制 &#xe609;
                {title: '我',iconfont: '58918'}       // 字体对应的16进制 &#xe626;
            ];

        return (<View style={[styles.container]}>
                    <View style={[styles.navigator]}><TopNavigator list={list} onPress={this.onNavigate} /></View>
                    <View style={[styles.main]}>
                        <BothSideNavigator style={[styles.navLeft]} type={'left'} onPress={this.onPrevPage} />
                        <PageableScrollView ref={'scrollview'} style={[styles.scroll]} contentStyle={[styles.page]} containerPadding={0}>
                            <View style={[styles.content]}><Text style={[styles.normal]}>The first page</Text></View>
                            <View style={[styles.content]}><Text style={[styles.normal]}>The second page</Text></View>
                            <View style={[styles.content]}><Text style={[styles.normal]}>The third page</Text></View>
                            <View style={[styles.content]}><Text style={[styles.normal]}>The fourth page</Text></View>
                            <View style={[styles.content]}><Text style={[styles.normal]}>The fifth page</Text></View>
                        </PageableScrollView>
                        <BothSideNavigator style={[styles.navRight]} typpe={'right'} onPress={this.onNextPage} />
                    </View>
                    <View style={[styles.bottomNav]}><BottomNavigator list={list2} onPress={this.onNavigate} /></View>
                </View>)
    }

    onNavigate = (idx,item) =>{
        if(!this.refs['scrollview'] || !this.refs['scrollview'].goToPage){
            return;
        }
        this.refs['scrollview'].goToPage(idx);
    }
    onPrevPage = () => {
        if(!this.refs['scrollview'] || !this.refs['scrollview'].goToPrev){
            return;
        }
        this.refs['scrollview'].goToPrev();
    }
    onNextPage = () => {
        if(!this.refs['scrollview'] || !this.refs['scrollview'].goToNext){
            return;
        }
        this.refs['scrollview'].goToNext();
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#F5F5F5'
    },
    main: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
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
    },
    bottomNav: {
        width: '100%'
    }
});
