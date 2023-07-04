import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { AccordionSummary, Typography, Box } from '@mui/material';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { ICONS, THEMES } from 'AII-GB/app/utils';
import { SkeletonList } from 'AII-GB/app/utils/loader/skeleton';
import { useDispatch } from 'react-redux';
import { fetchFilterProduct } from 'AII-GB/app/store/reducers/products';
import { usePathname, useRouter } from 'next/navigation';
import { dSlugs, slug } from 'AII-GB/app/constants/slugs';
import Image from 'next/image';
import { sideNavBarActions } from 'AII-GB/app/store/reducers/sideNavBar-slice';

const CustomExpandIcon = ({ type }: any) => {
    return (
        <Box
            sx={{
                ".Mui-expanded & > .collapsIconWrapper": {
                    display: "none",
                },
                ".expandIconWrapper": {
                    display: "none",
                },
                ".Mui-expanded & > .expandIconWrapper": {
                    display: "block",
                    fontSize: "30px",
                }
            }}
        >{type ? <>
            <Image className="collapsIconWrapper" src={ICONS.leftArrow} alt='right-arrow' width={20} height={15} />
            <Image className="expandIconWrapper" src={ICONS.downArrows} alt='left-arrow' width={15} height={15} />
        </> : <>
            <div className="expandIconWrapper">-</div>
            <div className="collapsIconWrapper">+</div>
        </>}

        </Box>
    );
};

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    borderBottom: `2px solid #000`,
    padding: "10px 0",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
}));

export default function Accordians({ label, items, isLoading = false, type }: any) {
    const router = useRouter()
    const path = usePathname()
    const dispatch = useDispatch()
    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const [checkBox, setCheckBox] = React.useState<any>("")

    React.useEffect(() => {
        const paths = path.split("/");
        setCheckBox(dSlugs(paths[paths.length - 1]))
    }, [path])

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>, label: string, item: any): void => {
        const { value, name, checked } = e.target;
        setCheckBox(checked)
        dispatch(fetchFilterProduct({ value, name, checked, label, totalCount: item?.fields?.Inventory?.length ?? 0 }))
    };

    const handleRoute = (productName: string) => {
        router.push(`/${label}/${slug(productName)}`)
        type && dispatch(sideNavBarActions.closeNavbar());
    }

    return (
        <div>
            <Accordion
                defaultExpanded={true}
                onChange={handleChange('panel1')}
                sx={{
                    ...(type && { background: "none" }),
                    ...(type && { border: "none" })
                }}>
                <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    sx={{
                        ...(type && { padding: "0" })
                    }}
                    expandIcon={<CustomExpandIcon type={type} />}>
                    <Typography variant='h5' component='h6' sx={{
                        fontFamily: "Playfair Display",
                        textTransform: "capitalize",
                        fontSize: THEMES.DISPLAY_RESOLUTION.TITLE,
                    }}>{label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {isLoading ?
                        (<SkeletonList
                            listsToRender={5}
                            sx={{ width: "100%", height: "40px", margin: "10px 0px" }} />) :
                        <Box sx={{
                            maxHeight: "320px",
                            overflow: "scroll",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                            "&": {
                                scrollbarWidth: "none",
                            }
                        }}>
                            {items.map((item: any) => {

                                const name = item?.fields?.Name?.toLowerCase() ?? item?.fields?.Category?.toLowerCase()

                                return (
                                    <Box key={name}
                                        onClick={() => handleRoute(name)}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginTop: "15px",
                                            textTransform: "capitalize",
                                        }}>
                                        <Typography sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "300",
                                            fontSize: THEMES.DISPLAY_RESOLUTION.SUB_TITLE,
                                        }}>{name} {`(${item?.fields?.Inventory?.length ?? 0})`}</Typography>

                                        <input
                                            type='checkbox'
                                            name={label}
                                            value={checkBox}
                                            checked={name === checkBox}
                                            onChange={(e) => handleFilter(e, label, item)}
                                            className='filter-check-box' />
                                    </Box>
                                )
                            })}
                        </Box>}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
