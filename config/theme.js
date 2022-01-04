import { DefaultTheme as paperTheme } from "react-native-paper"
import { DefaultTheme as navigatorTheme } from '@react-navigation/native';

// console.log(paperTheme)
// console.log(navigatorTheme)

export const myPaperTheme = {
    ...paperTheme,
    roundness: 2,

    colors: {
        ...paperTheme.colors,
        text: '#ffffff',
        backdrop: '#ffffff',
        background:'#4771a6',
        primary: '#4771a6',
        accent: '#4771a6',
    },
    font:{

    }
}

export const myNavigatorTheme = {
    ...navigatorTheme,
    colors: {
        ...navigatorTheme.colors,
        text: "#ffffff",
        background: '#70a7ff',
        card: '#507dbb',
        primary: '#000000',
        accent: '#4771a6',
    },
}
