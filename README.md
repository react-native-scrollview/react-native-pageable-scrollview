# react-native-pageable-scrollview

## Example one

![pageable-scrollview preview](https://github.com/react-native-scrollview/react-native-pageable-scrollview/blob/master/docs/images/1.gif)

## Example two

![pageable-scrollview preview](https://github.com/react-native-scrollview/react-native-pageable-scrollview/blob/master/docs/images/2.gif)

## Installation
```
npm install --save react-native-pageable-scrollview
```

## Usage example

See Example/App.js for a more detailed example.
See the [Wiki](https://github.com/react-native-scrollview/react-native-pageable-scrollview/wiki) usage tips.

```js
import PageableScrollView from 'react-native-pageable-scrollview';

<View style={[styles.main]}>
    <PageableScrollView style={[styles.scroll]} contentStyle={[styles.page]} containerPadding={0}>
        <View style={[styles.content]}><Text style={[styles.normal]}>The first page</Text></View>
        <View style={[styles.content]}><Text style={[styles.normal]}>The second page</Text></View>
        <View style={[styles.content]}><Text style={[styles.normal]}>The third page</Text></View>
        <View style={[styles.content]}><Text style={[styles.normal]}>The fourth page</Text></View>
        <View style={[styles.content]}><Text style={[styles.normal]}>The fifth page</Text></View>
    </PageableScrollView>
</View>

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        alignItems: 'center'

    },
    scroll: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        height: 360
    },
    page: {

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

```
