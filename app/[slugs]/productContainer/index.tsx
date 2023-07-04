'use-client'

import { Box, Grid, Typography } from "@mui/material"
import CustomButton from "AII-GB/app/components/buttons"
import { IsImageExist } from "AII-GB/app/constants/nonExistFile"
import { slug } from "AII-GB/app/constants/slugs"
import { fetchFilterProduct } from "AII-GB/app/store/reducers/products"
import { THEMES } from "AII-GB/app/utils"
import { SkeletonList } from "AII-GB/app/utils/loader/skeleton"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"

const Products = ({
    products,
    name,
    imageWidth,
    imageHeight,
    typoStyle,
    noOfSlices,
    grid: { xs, sm, md, lg },
    sectionBackground,
    innerBoxStyle,
    hoverPopup,
    type,
    route,
    isLoading,
    searchType
}: any) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const handleRoute = (e: any) => {
        router.push(`/brand`)
    }

    return (
        <>
            <Box sx={{ padding: { xs: "20px 0", md: "40px 0px 0px 0px" } }}>
                {searchType && <Typography
                    sx={{
                        fontFamily: "Playfair Display",
                        fontSize: THEMES.DISPLAY_RESOLUTION.PARAGRAPH,
                        color: "#000",
                        marginBottom: "20px",
                    }}>
                    {searchType}
                </Typography>}
                <Typography
                    sx={{
                        textAlign: "center",
                        fontFamily: "Playfair Display",
                        fontSize: THEMES.DISPLAY_RESOLUTION.TITLE,
                        color: "#000",
                        marginBottom: { xs: route === "Brand" ? "20px" : "38px", md: "-24px" },
                    }}>
                    {name}
                </Typography>
                <Grid container spacing={2}
                    sx={{
                        ...sectionBackground,
                        padding: { xs: "10", md: "40px 30px 36px 30px" },
                    }}> {isLoading ?
                        (<SkeletonList
                            listsToRender={noOfSlices ?? 10}
                            sx={{ width: imageWidth, height: imageHeight, margin: "10px 20px" }} />) :
                        products?.slice(0, noOfSlices)?.map((product: any, i: number) => {
                            const productName = type?.name === "Name" ? product?.fields?.Name : product?.fields?.Category
                            return (
                                <Grid key={i} item xs={xs} sm={sm} md={md} lg={lg}>
                                    <Link
                                        onClick={() => dispatch(
                                            fetchFilterProduct({ totalCount: product?.fields?.Inventory?.length }))
                                        }
                                        style={{ textDecoration: "none" }}
                                        href={`/${route}/${slug(productName)}`}
                                    >
                                        <Box className="card-component" sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            margin: "10px 0",
                                            position: "relative",
                                            ...innerBoxStyle
                                        }}>
                                            <Image
                                                src={IsImageExist(product, type?.defaultImage)}
                                                alt={productName}
                                                width={imageWidth ?? 30}
                                                height={imageHeight ?? 30}
                                                className="product-image" />

                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                    ...typoStyle
                                                }}>
                                                {productName}
                                            </Typography>
                                            {hoverPopup}
                                        </Box>
                                    </Link>
                                </Grid>
                            )
                        })}
                    {noOfSlices && name !== "SHOP BY CATEGORY" && <CustomButton
                        className="custom-button"
                        style={{
                            border: "1px solid #EE2026",
                            color: "#EE2026",
                            fontFamily: "Lato",
                            padding: "15px",
                            fontSize: THEMES.DISPLAY_RESOLUTION.PARAGRAPH,
                            marginTop: { xs: "20px", md: "30px" },
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                        onClick={handleRoute}
                        label={type?.name === "Name" ? "See all brands" : "See all Categories"} />}
                </Grid>
            </Box>
        </>


    )
}

export default Products