"use client"
import { Box, Grid, Toolbar } from '@mui/material'
import React, { useEffect } from 'react'
import Products from './productContainer'
import { IMAGES, THEMES } from '../utils'
import HoverOnBrand from '../components/ui/hoverOnBrand'
import useFetchAirtable from '../middleware/useAirtable'
import Breadcrumb from '../components/Breadcrumb'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { dSlugs } from '../constants/slugs'
import NotFound from '../components/ui/NotFound'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import useSearch from '../middleware/useSearch'
import { fetchSearchResult } from '../store/reducers/products'
import SearchProduct from './[products]/products'
import CustomButton from '../components/buttons'
import dynamic from 'next/dynamic'
const SideBar = dynamic(() => import("./[products]/sidebar"))
const Home = () => {
    const { search } = useSelector((state: RootState) => state.productsSlice)

    const pagesContent: any = {
        brand: "Brand",
    }
    const categorie = 'Categories';
    const { slugs } = useParams();

    const dispatch = useDispatch()
    const param = useSearchParams()

    const decodeProduct = dSlugs(decodeURI(slugs));
    const [categories, isLoading, Categories] = useFetchAirtable(categorie);
    const [brands, isLoadings, _, Brand] = useFetchAirtable(pagesContent.brand);
    const [records, fetchRecords, isLoading2] = useSearch()

    useEffect(() => {
        if (!search) {
            const paramValue = param.get('g');
            dispatch(fetchSearchResult(paramValue))
        }

        search && fetchRecords(dSlugs(search))
    }, [search])
    return (
        <>
            <Toolbar />
            <Grid container sx={{ mt: { xs: 8, md: 0 } }}>
                <Grid item xs={12}>
                    <Breadcrumb />
                </Grid>
                <Grid item xs={12} sx={{ padding: { xs: "0 20px", md: "auto" } }}>
                    {pagesContent[decodeProduct] &&
                        <Products
                            products={Brand}
                            name={"Featured Brands"}
                            imageWidth={228}
                            imageHeight={218}
                            route={"Brand"}
                            typoStyle={{
                                fontSize: THEMES.DISPLAY_RESOLUTION.PARAGRAPH,
                                padding: "4px",
                                fontFamily: "Poppins",
                                width: "fit-content",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                color: "#B40001",
                            }}
                            {...(Brand.length === 0 && { isLoading: isLoading })}
                            grid={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}
                            innerBoxStyle={{ border: "1px solid #ACACAC" }}
                            hoverPopup={<HoverOnBrand />}
                            type={{ name: "Name", defaultImage: IMAGES.defaultBrandImage }} /> 
                    }

                    {decodeProduct === "search" && <Box sx={{
                        display: "flex",
                        "& .side-bar": {
                            width: { md: "25%", lg: "28%" }
                        },
                        "& .product-items": {
                            width: { xs: "100%", md: "75%", lg: "72%" },
                            margin: { xs: "inherit", md: "25px" },
                        }
                    }}>
                        <Box
                            className="side-bar"
                            sx={{
                                display: { xs: "none", md: "block" },
                            }}>
                            <SideBar brands={Brand} />
                        </Box>
                        <Box
                            className="product-items"
                            sx={{
                                "& .card-component": {
                                    padding: "0px 13px",
                                    alignItems: "center",
                                },
                                "& .product-image": {
                                    width: { xs: "80% !important", md: "100% !important" },
                                },
                            }}
                        >
                            <Box sx={{ width: "100%" }}>
                                <Products
                                    searchType={`Showing 1 – ${records.length} of 30 results for "${search}"`}
                                    typoStyle={{
                                        fontSize: '16px',
                                        padding: '0px 8px',
                                        fontFamily: 'Lato',
                                        width: 'fit-content',
                                        color: '#000',
                                    }} x
                                    isLoading={isLoading}
                                    route={param}
                                    grid={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                    imageWidth={255}
                                    imageHeight={235}
                                    type={{
                                        name: 'Name',
                                        field: 'brand',
                                        like: 'like',
                                    }}
                                    products={records}
                                />
                            </Box>
                        </Box>
                    </Box>}

                    {!isLoadings && Brand.length === 0 || !isLoading2 && records.length === 0 && <NotFound/>}
                </Grid>
            </Grid>
        </>
    )
}

export default Home