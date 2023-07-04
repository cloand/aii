import { Box, Skeleton } from "@mui/material";

export const SkeletonList = ({ listsToRender, sx }: any) => {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "space-between" },
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap",
            padding: "16px",
        }}>
            {Array(listsToRender)
                .fill(1)
                .map((card, index) => (
                    <Skeleton
                        key={index}
                        variant="rectangular"
                        sx={sx} />
                ))}
        </Box>
    );
};