import { DefaultTheme as paperTheme } from "react-native-paper"
import { DefaultTheme as navigatorTheme } from '@react-navigation/native';

// console.log(paperTheme)
console.log(navigatorTheme)

const myPaperTheme = {
    ...paperTheme,
    roundness: 2,

    colors: {
        ...paperTheme.colors,
        backdrop: '#000000',
        background:'#263f96',
        primary: '#4771a6',
        accent: '#4771a6',
    },
}

const myNavigatorTheme = {
    ...navigatorTheme,
    roundness: 2,
    colors: {
        ...navigatorTheme.colors,
        text: "#ffffff",
        background: '#70a7ff',
        card: '#507dbb',
        primary: '#000000',
        accent: '#4771a6',
    },
}

module.exports.paperTheme = myPaperTheme;
module.exports.navigatorTheme = myNavigatorTheme;
