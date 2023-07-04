import { Box } from '@mui/material'
import { ICONS } from 'AII-GB/app/utils'
import Image from 'next/image'
import React from 'react'

const HoverOnBrand = () => {
    return (
        <Box
            className="forward-popup"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "#00000069",
                opacity: 0,
            }}>
            <Image
                src={ICONS.forwardArraow}
                alt="hover-image"
                width={80}
                height={80} />
        </Box>
    )
}

export default HoverOnBrand