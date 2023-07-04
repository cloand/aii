import * as React from 'react';
import { Box, Popover, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';

const CustomPopover = styled(Popover)`
  .MuiPaper-root {
    border-radius: 0; // Remove border radius
  }
`;

interface Props {
    id: string | undefined;
    open: boolean;
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: any;
    items: any
    className: string;
}

export default function BasicPopover({ id, open, anchorEl, setAnchorEl, items, className }: Props) {
    const router = useRouter()
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRoute = (productName: string) => {
        router.push(`/home/${productName}`)
        setAnchorEl(null);
    }

    return (
        <div>
            <CustomPopover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                elevation={0}
                sx={{ borderRadius: "0px !important" }}
            >
                <Box sx={{ display: "flex" }}>
                    {items?.map((item: any, i: number) => {
                        return (
                            <Box
                                onClick={() => handleRoute(item?.fields?.Category)}
                                className={className}
                                key={i}
                                sx={{ cursor: "pointer" }}>
                                <Typography sx={{ p: 2 }}>{item?.fields?.Category}</Typography>
                            </Box>

                        )
                    })}
                </Box>
            </CustomPopover>
        </div>
    );
}