import { Box, Typography } from '@mui/material';
import { IsImageExist } from 'AII-GB/app/constants/nonExistFile';
import { IMAGES, THEMES } from 'AII-GB/app/utils';
import { SkeletonList } from 'AII-GB/app/utils/loader/skeleton';
import Image from 'next/image';
const Suggestions = ({ items, handleItem, loading }: any) => {

    return (
        <Box
            sx={{
                width: { xs: "100%", sm: 260, md: 320 },
                position: "absolute",
                background: "#fff",
                overflowY: "scroll",
                maxHeight: "320px",
                zIndex: 10000,
                boxShadow: "2px 3px 5px 0px rgba(0,0,0,0.4)"
            }}>
            {loading ? (<SkeletonList
                listsToRender={8}
                sx={{ width: "100%", height: 20, margin: "10px 0px" }} />) :
                items.length === 0 ?
                    <Box>
                        <Typography sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontFamily: "Lato",
                            fontSize: THEMES.DISPLAY_RESOLUTION.PARAGRAPH
                        }}>Not Found</Typography>
                    </Box> :
                    items?.map((item: any, i: number) => {
                        return (<Box key={i}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: "10px 15px",
                                "&:hover": {
                                    background: "#9f9f9f28",
                                    cursor: "pointer",
                                }
                            }}
                            onClick={(e) => handleItem(e, item?.fields.Name)}>
                            <Box>
                                <Image
                                    style={{ objectFit: "contain" }}
                                    src={IsImageExist(item, IMAGES.ProductDefaultImage)}
                                    alt="food-image"
                                    width="60"
                                    height="60" />
                            </Box>
                            <Box ml={2}>
                                <Typography
                                    variant="h5"
                                    component="h5"
                                    sx={{
                                        fontSize: THEMES.DISPLAY_RESOLUTION.PARAGRAPH,
                                        fontFamily: "Lato"
                                    }}>
                                    {item?.fields.Name}
                                </Typography>
                            </Box>
                        </Box>)
                    })}
        </Box>
    )
}

export default Suggestions