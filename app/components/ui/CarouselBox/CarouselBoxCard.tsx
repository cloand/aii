import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { styled } from "@mui/system";
import { THEMES } from "AII-GB/app/utils";
import { IsImageExist } from "AII-GB/app/constants/nonExistFile";
import { useDispatch } from "react-redux";
import { fetchProductName } from "AII-GB/app/store/reducers/products";
import { useParams, useRouter } from "next/navigation";
import { SkeletonList } from "AII-GB/app/utils/loader/skeleton";
import { slug } from "AII-GB/app/constants/slugs";

const CardContainer = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "0.5rem",
  margin: "0.5rem",
});

const CardImage = styled(Image)(({ theme }) => ({
  width: 160,
  height: 185,
  objectFit: "contain",
  transition: "transform 0.3s",
  padding: "0.5rem",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const DiscountIcon = styled(Image)({
  position: "absolute",
  top: "-0.5rem",
  right: "-0.5rem",
});

const ProductName = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const CarouselBoxCard = ({ product, brandName, routes, isLoading }: any) => {
  const dispatch = useDispatch()
  const param = useParams();
  const router = useRouter()
  const handleProduct = (productName: string, id: string) => {

    dispatch(fetchProductName(productName))
    router.push(`/${slug(param?.slugs)}/${slug(param?.products)}/${slug(productName)}`)

  }
  return (
    <CardContainer>
      <Box
        onClick={() => handleProduct(product?.fields?.Name, product?.id)}
        sx={{
          border: "1px solid #eeeeee",
          borderRadius: "5px",
          "&:hover .typography-container": {
            background: '#F0F0F0',
          }
        }}
      >
        {isLoading ?
          (<SkeletonList
            listsToRender={10}
            sx={{ width: 250, height: 250, margin: "10px 0px" }} />) :
          <>
            <Box
              textAlign="center"
              flexGrow={1}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}>

              <CardImage
                src={IsImageExist(product)}
                alt="laptop image"
                width={150}
                height={185}
              />

              {product.isOffer && (
                <DiscountIcon
                  src="/images/discount-icon/discount.webp"
                  width={40}
                  height={40}
                  alt="discount-icon"
                />
              )}
            </Box>
            <Box
              className="typography-container"
              sx={{
                padding: "10px",
                "h5,h6": {
                  fontSize: "16px",
                },
                "h4,h5": {
                  marginBottom: "6px",
                  fontFamily: "Lato",
                  color: "#000",
                },
                "h4": {
                  fontSize: THEMES.DISPLAY_RESOLUTION.PARAGRAPH
                },
                "h6": {
                  color: "#781323",
                }
              }}>
              <ProductName variant="h4">{product?.fields?.Name}</ProductName>
              <Typography variant="h5" component="h5">{brandName ?? product?.brandData?.Name}</Typography>
              {product?.fields && <Typography variant="h6" component="h6">{`Item Sku #${product?.fields["Item Number"]}`}</Typography>}
            </Box>
          </>}

      </Box>
    </CardContainer>
  );
};

export default CarouselBoxCard;
