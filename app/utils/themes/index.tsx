export const COLORS = {
    // base colors
    primary: "#EB010E", // main Color
    secondary: "#CDCDD2",   // gray

    // colors
    black: "#1E1F20",
    white: "#FFFFFF",
    paragraphText: "#545454",

    lightGray: "#F5F5F6",
    lightGray2: "#F6F6F7",
    lightGray3: "#EFEFF1",
    lightGray4: "#F8F8F9",
    transparent: "transparent",
    darkgray: '#898C95',
    searchBorder: '#e1e1e1',
    backgroundHover: "#f3f3f3"
};

export const SIZES = {
    // font sizes
    lg_desktop_largeTitle: "35px",
    lg_desktop_medimumTitle: "26px",
    lg_desktop_smallTitle: "18px",

    desktop_largeTitle: "34px",
    desktop_medimumTitle: "25px",
    desktop_smallTitle: "18px",

    ipad_largeTitle: "24px",
    ipad_medimumTitle: "23px",
    ipad_smallTitle: "18px",

    mobile_largeTitle: "18px",
    mobile_medimumTitle: "21px",
    mobile_smallTitle: "16px",

    sm_mobile_largeTitle: "18px",
    sm_mobile_medimumTitle: "19px",
    sm_mobile_smallTitle: "15px",


    h1: "30px",
    h2: "22px",
    h3: "20px",
    h4: "18px",
    body3: "16px",
    body4: "14px",
    body5: "12px",
};

export const DISPLAY_RESOLUTION = {
    TITLE: {
        xl: SIZES.lg_desktop_largeTitle,
        lg: SIZES.desktop_largeTitle,
        md: SIZES.ipad_largeTitle,
        sm: SIZES.mobile_largeTitle,
        xs: SIZES.sm_mobile_largeTitle,
    },

    SUB_TITLE: {
        xl: SIZES.lg_desktop_medimumTitle,
        lg: SIZES.desktop_medimumTitle,
        md: SIZES.ipad_medimumTitle,
        sm: SIZES.mobile_medimumTitle,
        xs: SIZES.sm_mobile_medimumTitle,
    },

    PARAGRAPH: {
        xl: SIZES.lg_desktop_smallTitle,
        lg: SIZES.desktop_smallTitle,
        md: SIZES.ipad_smallTitle,
        sm: SIZES.mobile_smallTitle,
        xs: SIZES.sm_mobile_smallTitle,
    },
}

const WEB_THEMES = { COLORS, SIZES, DISPLAY_RESOLUTION };

export default WEB_THEMES;

// borderBottom: { xs: "3px solid #ef4e24", sm: "5px solid #ef4e24", md: "8px solid #ef4e24" },