/**
 * Cheng Bing
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

import {
    TouchableOpacity,
    Platform,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
    Text,
    View
} from 'react-native';

export class BothSideNavigator extends Component {

    static propTypes = {
        style: PropTypes.oneOfType([PropTypes.object,PropTypes.array]),
        type: PropTypes.string,
        onPress: PropTypes.func
    };

    constructor(props){
        super(props);

    }

    shouldComponentUpdate(){
        return true;
    }

    render() {
        let { type, style } = this.props; type = type || 'right';
        let toString = Object.prototype.toString;
        if(!!style){
            style = toString.call(style) === '[object Array]' ? style : [style];
        }
        style = style || [];

        return (<TouchableOpacity style={[navigator.container,...style]} onPress={this._onPress}>
                    <View style={[navigator.cssNav,type == 'left' ? navigator.left: navigator.right]}></View>
                </TouchableOpacity>)
    }

    _onPress = () => {
        let { onPress } = this.props;
        onPress && onPress();
    }

}

export class TopNavigator extends Component{
    static propTypes = {
        style: PropTypes.oneOfType([PropTypes.object,PropTypes.array]),
        list: PropTypes.array.isRequired,
        onPress: PropTypes.func
    }

    constructor(props){
        super(props);

        this.state = {
            activeIndex: 0,
            tabWidth: 0,
            xAnimated: new Animated.Value(0)
        }
    }
    shouldComponentUpdate(){
        return true;
    }
    componentDidUpdate(){
        let { activeIndex, tabWidth } = this.state;
        let xLeft = tabWidth * activeIndex || 0;

        Animated.timing(this.state.xAnimated, {
            toValue: xLeft,
            duration: 300,
            easing: Easing.linear
        }).start();
    }
    render(){
        let { list } = this.props; list = list || [];

        let { activeIndex, tabWidth } = this.state;
        activeIndex = activeIndex || 0; tabWidth = tabWidth || 0;

        let underline = {
            width: tabWidth,
            left: activeIndex * tabWidth
        };

        return (<View onLayout={this._onLayout} style={[navigator2.container]}>
                    <View style={[navigator2.tabs]}>
                        {list.map((item,idx) => {
                            return (<TouchableOpacity key={'top_navigator_' + idx}
                                                      style={[navigator2.tab]}
                                                      onPress={() => {this._onPress(idx,item)}} >
                                        <Text style={[activeIndex == idx && navigator2.active]}>{item['title']}</Text>
                                    </TouchableOpacity>)
                        })}
                    </View>
                    <Animated.View style={[navigator2.underline,underline,{left: this.state.xAnimated}]}></Animated.View>
                </View>)
    }
    _onLayout = (event) => {
        let { nativeEvent } = (event || {}), { layout } = (nativeEvent || {});
        let { width = SCREEN_WIDTH } = (layout || {});

        let { list } = this.props; list = list || [];
        let len = list.length || 0;

        this.setState({
            tabWidth: len<= 0 ? 0 : width / len
        });
    }
    _onPress = (idx, item) => {
        this.setState({
            activeIndex: idx || 0
        },() => {
            let { onPress } = this.props;
            onPress && onPress(idx || 0, item);
        });
    }
    activeNavigator = (idx) => {
        let { list } = this.props,item = list[idx] || {};
        if(idx >= list.length){
            return ;
        }
        this._onPress(idx,item);
    }
}

export class BottomNavigator extends Component{
    static propTypes = {
        style: PropTypes.oneOfType([PropTypes.object,PropTypes.array]),
        list: PropTypes.array.isRequired,
        onPress: PropTypes.func
    }

    constructor(props){
        super(props);

        this.state = {
            activeIndex: 0
        }
    }

    shouldComponentUpdate(){
        return true;
    }

    render(){
        let { list } = this.props; list = list || [];

        let { activeIndex } = this.state; activeIndex = activeIndex || 0;

        return (<View style={[navigator3.container]}>
                    {
                        list.map((item,idx) => {
                            item = item || {};
                            let isActive = activeIndex == idx;

                            return (<TouchableOpacity key={'bottom_navigator_' + idx}
                                                      style={[navigator3.navButton]}
                                                      onPress={() => this._onPress(idx,item)}>
                                        {!!item['iconfont'] && <Text style={[navigator3.icon,!!isActive && navigator3.active]}>{String.fromCharCode(item['iconfont'])}</Text>}
                                        {!!item['title'] && <Text style={[navigator3.text,!!isActive && navigator3.active]}>{item['title']}</Text>}
                                    </TouchableOpacity>)
                        })

                    }
                </View>)
    }
    _onPress = (idx, item) => {
        this.setState({
            activeIndex: idx || 0
        },() => {
            let { onPress } = this.props;
            onPress && onPress(idx || 0, item);
        });
    }
    activeNavigator = (idx) => {
        let { list } = this.props,item = list[idx] || {};
        if(idx >= list.length){
            return ;
        }
        this._onPress(idx,item);
    }
}

const navigator = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        height: 40,
        width: 40,
        borderRadius: 20,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cssNav: {
        height: 16,
        width: 16,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderStyle: 'solid',
        borderColor: '#999',
    },
    left: {
        transform: [{rotate: '-135deg'}],
        marginLeft: 6,
    },
    right: {
        transform: [{rotate: '45deg'}],
        marginLeft: -6
    }
});

const navigator2 = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#FFF',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabs: {
        width: '100%',
        height: '100%',
        paddingBottom: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tab: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
      color: '#18A0F0',
      fontWeight: '600'
    },
    underline: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: 4,
        backgroundColor: '#18A0F0',
        width: 0
    }
});

const navigator3 = StyleSheet.create({
    container: {
        height: 60,
        width: '100%',
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#DDD',
        paddingBottom: 5,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 10
                },
                shadowRadius: 10,
                shadowOpacity: 1.0
            },
            android: {
                elevation: 4,
            },
        })
    },
    navButton: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontFamily:'iconfont',
        color: '#999',
        fontSize: 30,
        width: '100%',
        textAlign: 'center',
    },
    text: {
        color: '#999',
        width: '100%',
        textAlign: 'center'
    },
    active: {
        color: '#18A0F0'
    }
})
