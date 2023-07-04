import { Box } from '@mui/material'
import React from 'react'
interface Buttons {
    style?: any,
    label: string,
    className?: string,
    onClick?: any,
}
const CustomButton = ({ style, label, className, onClick }: Buttons) => {

    return (
        <Box
            className={className}
            sx={{ ...style }}
            onClick={onClick}>
            {label}
        </Box>
    )
}

export default CustomButton