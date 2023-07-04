import { Box } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { SkeletonList } from "../utils/loader/skeleton";
interface ImageSectionProps {
    imgArray: any; // Replace 'any' with the appropriate type for your imgArray
    product: any[];
    isLoading: boolean;
}
const ImageSection: React.FC<ImageSectionProps> = ({ imgArray, product, isLoading }) => {
    const [selectedImg, setSelectedImg] = useState(0);

    function onClickHandler(index: number) {
        setSelectedImg(index);
    }
    return (
        <Box sx={{ display: "flex" }}>
            <Box className="flex mt-4  md:p-4 w-full max-w-[350px] overflow-auto">
                {isLoading ?
                    (<SkeletonList
                        listsToRender={2}
                        sx={{ width: 161, height: 156, margin: "10px 0px" }} />) :
                    imgArray.map((imgItem: any, index: number) => {
                        return (
                            <Box
                                key={imgItem.id}
                                sx={{
                                    border: "1px solid #000", marginBottom: "40px",
                                    "& img": {
                                        objectFit: "contain"
                                    }
                                }}
                                onClick={() => onClickHandler(index)}
                            >
                                <Image
                                    src={imgItem?.url}
                                    width={161}
                                    height={156}
                                    alt="product img"
                                />
                            </Box>
                        );
                    })}
            </Box>

            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                "& img": {
                    objectFit: "contain"
                }
            }}>
                {isLoading ?
                    (<SkeletonList
                        listsToRender={1}
                        sx={{ width: 476, height: 380, margin: "10px 0px" }} />) :
                    <Image
                        src={imgArray[selectedImg]?.url}
                        alt="product img"
                        width={476}
                        height={380}
                        className="object-contain md:drop-shadow-xl dark:bg-palette-card"
                    />}
            </Box>
        </Box>
    );
};

export default ImageSection;
