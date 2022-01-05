import { DefaultTheme as paperTheme } from "react-native-paper"
import { DefaultTheme as navigatorTheme } from '@react-navigation/native';

// console.log(paperTheme)
// console.log(navigatorTheme)

export const myPaperTheme = {
    ...paperTheme,
    roundness: 2,

    colors: {
        ...paperTheme.colors,
        text: '#000000',
        backdrop: 'rgba(255,255,255,0.26)',
        background:'#ffffff',
        primary: '#4681bb',
        accent: '#4771a6',
    },
    font:{

    }
}

export const myNavigatorTheme = {
    ...navigatorTheme,
    colors: {
        ...navigatorTheme.colors,
        text: "#000000",
        background: '#ffffff',
        card: '#507dbb',
        primary: '#000000',
        accent: '#4771a6',
    },
}
