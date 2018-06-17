/**
 * bingcheng
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Platform,
    StyleSheet,
    ScrollView,
    Dimensions,
    View
} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const DefaultPadding = 10;

export default class PageableScrollView extends Component {

    static propTypes = {
        style: PropTypes.oneOfType([PropTypes.object,PropTypes.array]),
        contentStyle: PropTypes.oneOfType([PropTypes.object,PropTypes.array]),
        onScroll: PropTypes.func,
        onPageChanged: PropTypes.func,
        children: PropTypes.arrayOf(PropTypes.element).isRequired
    };

    constructor(props){
        super(props);

        let { initPage = 0, containerPadding = DefaultPadding, children } = (props || {});
        initPage = initPage <=0 ? 0 : initPage; children = children || [];

        initPage = initPage >= children.length - 1 ? children.length - 1 : initPage;

        this.state = {
            pageNum: children.length,
            pageIndex: initPage,
            containerWidth: SCREEN_WIDTH - containerPadding * 2,
            containerPadding: containerPadding
        }
    }

    componentDidUpdate(){
        let { pageIndex, containerWidth, containerPadding } = this.state;
        let xOffset = (containerWidth - containerPadding) * pageIndex || 0;

        this.scrollView.scrollTo({x: xOffset, y: 0, animated: true});
    }
    componentDidMount(){
        let { pageIndex, containerWidth, containerPadding } = this.state;
        let xOffset = (containerWidth - containerPadding) * pageIndex || 0;

        this.scrollView.scrollTo({x: xOffset, y: 0, animated: true});
    }

    render() {
        let { containerWidth, containerPadding } = this.state;

        let beginningStyle = {
            marginLeft: containerPadding * 2
        };

        let { children = [], style, contentStyle } = this.props;
        let scrollStyle = [],pageStyle = [{
            width: containerWidth,
            paddingRight: containerPadding * 2,
            marginLeft: -containerPadding
        }];

        let toString = Object.prototype.toString;
        if(!!style){
            let styleProps = toString.call(style) === '[object Array]' ? style : [style];
            scrollStyle = [...scrollStyle,...styleProps];
        }
        if(!!contentStyle){
            let contentStyleProps = toString.call(contentStyle) === '[object Array]' ? style : [style];
            pageStyle = [...pageStyle,...contentStyleProps];
        }



        return (<ScrollView ref={(scrollView) => { this.scrollView = scrollView; }}
                            style={[styles.scroll,...scrollStyle]}
                            pagingEnabled
                            scrollEnabled
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            onScroll={this._onScroll}
                            onScrollEndDrag={this._onScrollEnd} >
                    {
                        children.map((component,index) => {
                            let style = [...pageStyle]; index == 0 && (style.push(beginningStyle));
                            return <View key={'children_component_' + index} style={[...[styles.content],...style]}>{component}</View>
                        })
                    }
                </ScrollView>);
    }
    _onScroll = (event) => {
        let { nativeEvent } = (event || {}),{ contentOffset } = (nativeEvent || {});
        let { x, y } = (contentOffset || {});

        let { pageIndex, pageNum, containerWidth, containerPadding } = this.state; pageIndex = pageIndex || 0;
        let prevX = (containerWidth - containerPadding ) * pageIndex;

        let offsetX = x - prevX,offsetY = 0,{ onScroll } = this.props;
        onScroll && onScroll({offsetX, winWidth: containerWidth});

    }
    _onScrollEnd = (event) => {
        let { nativeEvent } = (event || {}),{ contentOffset } = (nativeEvent || {});
        let { x, y } = (contentOffset || {});

        let { pageIndex, pageNum, containerWidth, containerPadding } = this.state;

        let prevX = (containerWidth - containerPadding ) * pageIndex;
        let xOffset = x - prevX,xHalf = containerWidth / 2.0;

        if(xOffset <= -xHalf && pageIndex > 0){
            this.goToPage(pageIndex - 1);
        }
        else if(xOffset >= xHalf && pageIndex < pageNum - 1){
            this.goToPage(pageIndex + 1);
        }
        else{
            this.goToPage(pageIndex);
        }
    }
    _onPageChanged = () =>{
        let { pageIndex } = this.state,{ onPageChanged } = this.props;

        onPageChanged && onPageChanged(pageIndex);

    }

    /****************************** 暴露给外部调用的接口 开始 *******************************************/

    goToPrev = () => {
        let { pageIndex } = this.state; pageIndex -= 1;
        if(pageIndex < 0){ return; }

        this.goToPage(pageIndex);
    }
    goToNext = () => {
        let { pageIndex, pageNum } = this.state;pageIndex += 1;
        if(pageIndex > pageNum - 1){ return; }

        this.goToPage(pageIndex);
    }
    goToFirst = () => {
        let { pageIndex } = this.state;
        if(pageIndex <= 0){ return ; }

        this.goToPage(0);
    }
    goToLast = () => {
        let { pageIndex, pageNum } = this.state;
        if(pageIndex >= pageNum - 1){ return ; }

        this.goToPage(pageNum -1);
    }
    goToPage = (pageIndex) => {
        pageIndex = pageIndex || 0;
        let { pageNum,pageIndex: prevPageIndex } = this.state;

        pageIndex = pageIndex < 0 ? 0 : pageIndex;
        pageIndex = pageIndex > pageNum - 1 ? pageNum - 1 : pageIndex;

        this.setState({
            pageIndex: pageIndex
        },() => {
            this._onPageChanged();
        });
    }

    /****************************** 暴露给外部调用的接口 结束 *******************************************/

}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: 'transparent'
    },
    content: {
        height: '100%'
    }
});
