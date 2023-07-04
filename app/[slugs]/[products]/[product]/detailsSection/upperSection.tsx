import { Box, Typography } from '@mui/material'
import { SkeletonList } from 'AII-GB/app/utils/loader/skeleton'
import React from 'react'

const UpperSection = ({ product, allRecords, selectedRecords, setSelectedRecords, isLoading }: any) => {
    return (
        <Box sx={{
            color: "#EE2026",
            fontFamily: "Lato",
            "h6,h5": {
                fontSize: { xs: "16px", md: "25px", lg: "30px" },
                marginBottom: "20px",
            },
            "h5": {
                color: "#000",
                fontWeight: 300,
            },
            "h4": {
                fontFamily: "Playfair Display",
                fontSize: { xs: "24px", md: "40px", lg: "60px" },
                color: "#000",
                marginBottom: "20px",
            }
        }}>{isLoading ?
            (<SkeletonList
                listsToRender={5}
                sx={{ width: "100%", height: 60, margin: "10px 0px" }} />) :
            <>
                <Box>
                    <Typography variant='h6' component='h6'>
                        {product?.brandData?.Name}
                    </Typography>
                    <Typography variant='h4' component='h4'>
                        {product?.fields?.Name}
                    </Typography>
                    <Typography variant='h5' component='h5'>
                        {product?.fields?.Notes}
                    </Typography>
                    <Typography variant='h6' component='h6'>
                        {`Item #:${product?.fields ? product?.fields["Item Number"] : ""}`}
                    </Typography>
                </Box>

                {product?.fields?.Color && <Box sx={{
                    "h5": {
                        color: "#000",
                        fontWeight: 400,
                        "span": {
                            fontWeight: 300,
                        }
                    },
                }}>
                    <Typography variant='h5' component='h5'>
                        Color: <span>{product?.fields?.Color}</span>
                    </Typography>

                    <Box sx={{
                        display: "flex",
                        "& div": {
                            marginLeft: { xs: "20px", md: "30px" },
                        },
                        "& div:nth-of-type(1)": {
                            marginLeft: 0,
                        }
                    }}>
                        {allRecords.map((color: any, i: number) => {
                            return (
                                <Box
                                    onClick={() => setSelectedRecords(i)}
                                    sx={{
                                        width: { xs: 40, md: 65, lg: 70 },
                                        height: { xs: 40, md: 65, lg: 70 },
                                        background: color?.fields?.Color,
                                        ...(selectedRecords === i && { border: `3px solid #B40001` }),
                                        borderRadius: "50%",
                                    }} key={i} />
                            )
                        })}
                    </Box>
                </Box>}
            </>

            }

        </Box>
    )
}

export default UpperSection