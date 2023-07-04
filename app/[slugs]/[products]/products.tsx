'use-client'

import { Box, Grid, Typography } from "@mui/material";
import NotFound from "AII-GB/app/components/ui/NotFound";
import { IsImageExist } from "AII-GB/app/constants/nonExistFile";
import { slug } from "AII-GB/app/constants/slugs";
import { fetchProductName } from "AII-GB/app/store/reducers/products";
import { SkeletonList } from "AII-GB/app/utils/loader/skeleton";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const Products = ({
    products,
    imageWidth,
    imageHeight,
    typoStyle,
    route,
    noOfSlices,
    grid: { xs, sm, md, lg },
    sectionBackground,
    innerBoxStyle,
    type,
    isLoading,
}: any) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const handleRedirect = (path: string, productName: string) => {
        dispatch(fetchProductName(productName))
        router.push(path)
    }

    return (
        <Grid container spacing={2}
            sx={{
                ...sectionBackground,
                // marginTop: "10px",
            }}>

            {isLoading ?
                (<SkeletonList
                    listsToRender={28}
                    sx={{ width: imageWidth, height: imageHeight, margin: "10px 0px" }} />) :
                products.length === 0 ?
                    <NotFound />
                    :
                    products?.slice(0, noOfSlices)?.map((product: any, i: number) => {
                        const productName = type?.name === "Name" ? product?.fields?.Name : product?.fields?.Category
                        return (
                            <Grid key={i} item xs={xs} sm={sm} md={md} lg={lg}>

                                <Box
                                    onClick={() => handleRedirect(`/${slug(route?.slugs)}/${slug(route?.products)}/${slug(productName)}`, productName)}
                                    sx={{
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        width: "100%",
                                        padding: { xs: "0 10px", md: "inherit" }
                                    }}>
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        // justifyContent: "center",
                                    }}>
                                        <Image
                                            src={IsImageExist(product, type?.defaultImage)}
                                            alt={productName}
                                            width={imageWidth ?? 30}
                                            height={imageHeight ?? 30}
                                            className="product-image" />
                                        <Box sx={{
                                            width:"100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: { xs: "center", md: "baseline" },
                                            justifyContent: "center",
                                        }}>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                    ...typoStyle,
                                                    maxWidth: "96%",
                                                    fontWeight: "bold",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden !important",
                                                    textOverflow: "ellipsis",
                                                }}>
                                                {productName}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                    ...typoStyle,
                                                    fontSize: "15px",
                                                }}>
                                                {product?.brandData?.Name}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                    ...typoStyle
                                                }}>
                                                {`Item Sku #${product?.fields["Item Number"]}`}
                                            </Typography>
                                        </Box>

                                    </Box>
                                </Box>
                            </Grid>
                        )
                    })
            }

        </Grid >


    )
}

export default Products