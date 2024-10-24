import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import layerStyles from "./layerStyles";

const config:ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    layerStyles
});

export default theme;
