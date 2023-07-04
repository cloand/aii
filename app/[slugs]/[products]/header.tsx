import React, { useState } from 'react'
import { Box, Typography, InputLabel, FormControl, NativeSelect } from '@mui/material'
import { THEMES } from 'AII-GB/app/utils'
import { productsLimits } from 'AII-GB/app/mocks/filters'
import { useSelector } from 'react-redux'
import { RootState } from 'AII-GB/app/store/store'

const Headers = ({ product, selectedValue, setSelectedValue }: any) => {
    const { filterProduct: { totalCount = 0 } = {} } = useSelector((state: RootState) => state.productsSlice)

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(+e.target.value)
    }

    return (
        <Box sx={{
            width: "100%",
            padding: { xs: "0 20px", md: "auto" },
            marginTop: { xs: "20px", md: "inherit" }
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "baseline", md: "center" },
                flexDirection: { xs: "column", md: "inherit" },
            }}>
                <Typography
                    variant='h5'
                    component='h5'
                    sx={{
                        fontFamily: "Playfair Display",
                        color: THEMES.COLORS.primary,
                        fontSize: THEMES.DISPLAY_RESOLUTION.TITLE,
                        textTransform: "capitalize",
                    }}>
                    {product}
                </Typography>

                <Box sx={{ display: "flex" }}>
                    <FormControl>
                        <NativeSelect
                            defaultValue={28}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                            sx={{
                                maxWidth: "150px",
                                fontFamily: "Grandiflora One",
                                fontWeight: "bolder",
                                fontSize: THEMES.DISPLAY_RESOLUTION.SUB_TITLE,
                                marginRight: "30px"
                            }}

                        >
                            {productsLimits.map(({ value, label }, i) => {
                                return (
                                    <option key={label} value={value}>{label}</option>
                                )
                            })}
                        </NativeSelect>
                    </FormControl>
                    <FormControl>
                        <NativeSelect
                            defaultValue={0}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                            sx={{
                                maxWidth: "150px",
                                fontFamily: "Grandiflora One",
                                fontWeight: "bolder",
                                fontSize: THEMES.DISPLAY_RESOLUTION.SUB_TITLE,
                            }}
                        >
                            <option value={0}>Sort By</option>
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </NativeSelect>
                    </FormControl>
                </Box>
            </Box>
            <Typography
                variant='h5'
                sx={{
                    fontFamily: "Lato",
                    fontWeight: "200",
                    marginTop: "20px",
                    // color:"#787878",
                    fontSize: THEMES.DISPLAY_RESOLUTION.SUB_TITLE
                }}>
                {`Showing 1-${selectedValue} products of ${totalCount} results`}
            </Typography>
        </Box>
    )
}

export default Headers 