"use client"
import React from 'react'
import styles from './page.module.css'
import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { ICONS, THEMES } from 'AII-GB/app/utils'
import { useSelector } from 'react-redux'
import { RootState } from 'AII-GB/app/store/store'
import { useRouter } from 'next/navigation'

const Footer = () => {
  const router = useRouter()
  const { Categories = [] } = useSelector((state: RootState) => state.productsSlice);
  const handleRoute = (productName: string) => {
    router.push(`/home/${productName}`)
  }
  return (
    <Box className={styles.div}>
      <Box
        sx={{
          width: { xs: "130px", md: "200px" },
          height: { xs: "50px", md: "80px" },
          position: "relative",
          margin: { xs: 0, md: "0px 0px -55px 78px" }
        }}
      >
        <Image className="footer-logo" src={ICONS.logo} alt="logo" layout='fill' />
      </Box>

      <Box
        className={styles.footerItems}
        sx={{
          padding: { xs: "20px 10px", md: "32px" },
          "& h5": {
            fontSize: THEMES.DISPLAY_RESOLUTION.TITLE,
          },
          "& h6": {
            fontSize: THEMES.DISPLAY_RESOLUTION.PARAGRAPH,
            padding: { xs: "6px 20px", md: "10px 20px" },
          },
          "& h6, & h5 ": {
            paddingLeft: " 10px !important",

          }
        }}>
        <Grid
          item
          md={8}
          lg={6}
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant='h5' component="h5">CATEGORIES</Typography>
              <Box sx={{ height: "100%", display: "flex", flexWrap: "wrap" }}>
                {Categories?.map((item: any, i: number) => {
                  return (
                    <Box
                      onClick={() => handleRoute(item?.fields?.Category)}
                      key={i}
                      sx={{ cursor: "pointer", width: "50%", }}>
                      <Typography
                        variant='h6'
                        component="h6">
                        {item?.fields?.Category}
                      </Typography>
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Typography variant='h5' component="h5">BRANDS</Typography>
              <Box>
                <Typography variant='h6' component="h6">Featured Brands</Typography>
                {/* <Typography variant='h6' component="h6">Brand Index</Typography> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Box>
  )
}

export default Footer