import { Box, Typography } from '@mui/material'
import { THEMES } from 'AII-GB/app/utils'
import images from 'AII-GB/app/utils/images'
import Image from 'next/image'
import React from 'react'

const NotFound = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "60vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection:"column",
            }}>
            <Image
                src={images.productNotFound}
                alt='NOT-FOUND'
                width={250}
                height={250} />
            <Typography variant='h4' component="h4" sx={{
                textAlign: "center",
                fontFamily: "Playfair Display",
                fontSize: THEMES.DISPLAY_RESOLUTION.PARAGRAPH,
                color: "#000",
            }}>PRODUCT NOT FOUND</Typography>
        </Box>
    )
}

export default NotFound