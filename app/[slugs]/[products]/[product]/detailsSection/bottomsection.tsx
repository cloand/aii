import { Box, Grid, Typography } from '@mui/material'
import { THEMES } from 'AII-GB/app/utils'
import images from 'AII-GB/app/utils/images'
import { SkeletonList } from 'AII-GB/app/utils/loader/skeleton'
import Image from 'next/image'
import React from 'react'

const MiddleSection = ({ product, isLoading }: any) => {
    return (
        <Grid container item xs={12} sx={{ marginTop: { xs: 3, md: 10 } }}>
            <Grid item xs={12} md={6.5} justifyContent={"center"} sx={{
                "& img": {
                    width: { xs: "100%", md: "400px" },
                    height: { xs: "30vh", md: "400px" },
                    marginbottom: { xs: "10px", md: "inherit" },
                }
            }}>
                {isLoading ?
                    (<SkeletonList
                        listsToRender={1}
                        sx={{ width: "100%", height: 400, margin: "10px 0px" }} />) :
                    <Image src={images.ProductDefaultImage} alt={'product-image'} width={400} height={400} />
                }

            </Grid>
            <Grid item xs={12} md={5.5}>
                {isLoading ?
                    (<SkeletonList
                        listsToRender={5}
                        sx={{ width: "100%", height: 50, margin: "10px 0px" }} />) :
                    <Box sx={{
                        color: "#B40001",
                        "h5": {
                            fontFamily: "Playfair Display",
                            fontSize: { xs: "24px", md: "40px", lg: "60px" },
                            marginBottom: "25px",
                            marginTop: { xs: "10px", md: "inherit" },
                        },
                        "h6": {
                            marginBottom: "15px",
                            fontFamily: "Lato",
                            fontSize: THEMES.DISPLAY_RESOLUTION.SUB_TITLE,
                            "span": {
                                color: "#000",
                                fontWeight: 300,
                            }
                        }
                    }}>
                        <Typography variant='h5' component='h5'>
                            Details
                        </Typography>
                        <Typography variant='h6' component='h6'>
                            Size: <span>Medium</span>
                        </Typography>
                        <Typography variant='h6' component='h6'>
                            Minimum Order: <span>{product?.fields ? product?.fields["Minimum Order"] : ""}</span>
                        </Typography>
                        <Typography variant='h6' component='h6'>
                            Case Pack: <span>{product?.fields ? product?.fields["Case Pack"] : ""}</span>
                        </Typography>
                        <Typography variant='h6' component='h6'>
                            Kit Contains: <span>20</span>
                        </Typography>
                    </Box>
                }

            </Grid>
        </Grid>
    )
}

export default MiddleSection