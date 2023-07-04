import * as React from 'react';
import Accordians from './accordian';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'AII-GB/app/store/store';

export default function CustomizedAccordions({ type }: any) {
    const { Brand, Categories } = useSelector((state: RootState) => state.productsSlice)

    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <Box
            sx={{
                width:"100%",
                padding: { xs: "0 20px", md: "0 40px" },
            }}>
            <Accordians label={"categories"} items={Categories} type={type} />
            <Accordians label={"brands"} items={Brand} type={type} />
        </Box>
    );
}

