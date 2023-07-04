"use client"
import { useMemo, useState } from 'react';
import base from 'AII-GB/app/apis/airtable';
import { Box, Toolbar, Grid } from '@mui/material';
import { useParams } from 'next/navigation';
import Headers from './header';
import { THEMES } from 'AII-GB/app/utils';
import CustomButton from 'AII-GB/app/components/buttons';
import Breadcrumb from 'AII-GB/app/components/Breadcrumb';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from 'AII-GB/app/store/reducers/products';
import { RootState } from 'AII-GB/app/store/store';
import { dSlugs } from 'AII-GB/app/constants/slugs';
import useFetchAirtable from 'AII-GB/app/middleware/useAirtable';


const SideBar = dynamic(() => import("./sidebar"))
const Products = dynamic(() => import("./products"))
const Product = (): JSX.Element => {
  const tableName = 'Inventory';
  const categorie = 'Categories';
  // const route = useParams();
  const param = useParams();
  const dispatch = useDispatch()
  const { Brand } = useSelector((state: RootState) => state?.productsSlice)

  const decodeProduct = dSlugs(param?.products);

  const [categories, Categories] = useFetchAirtable(categorie);
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [offset, setOffset] = useState<number>(0);
  const [selectedValue, setSelectedValue] = useState(28);

  const fetchRecords = async (): Promise<void> => {
    setIsLoading(true)
    const brandLookup: { [key: string]: any } = {};

    // Fetch all brand records upfront
    const brandRecords = await base('Brand').select().all();

    if (Brand.length === 0) {
      dispatch(fetchProducts({ name: "Brand", data: brandRecords }))
    }

    brandRecords.forEach((brandRecord) => {
      brandLookup[brandRecord.id] = brandRecord.fields;
    });

    const filterByFormula = `OR(SEARCH(LOWER("${decodeProduct}"), LOWER({Name})),FIND(LOWER("${decodeProduct}"), LOWER(ARRAYJOIN(Category, ','))) > 0,FIND(LOWER("${decodeProduct}"), LOWER(ARRAYJOIN(Brand, ','))) > 0)`;
    const options = {
      pageSize: selectedValue, //maxRecords, pageSize
      view: 'Grid view',
      filterByFormula,
    };

    base(tableName)
      .select(options)
      .eachPage(
        (records, fetchNextPage) => {
          const updatedRecords = records.map((record: any) => ({
            ...record,
            brandData: brandLookup[record.fields.Brand],
          }));

          setRecords((prevRecords) => [...prevRecords, ...updatedRecords]);
          setOffset(offset + +records.length)
          setIsLoading(false)
          // fetchNextPage()
        },
        (err) => {
          setIsLoading(false)
          if (err) {
            console.error(err);
          }
        }
      );
  };

  const handleFetchNextPage = (): void => {
    // setPageCount(pageCount + 1)
  };

  useMemo(() => {
    setRecords([])
    fetchRecords();
  }, [selectedValue]);

  return (
    <Box sx={{ marginTop: { xs: "55px", md: "inherit" } }}>
      <Toolbar />
      <Breadcrumb />
      <Box sx={{
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            "& .card-component": {
              padding: "0px 13px",
              alignItems: "center",
            },
            "& .product-image": {
              width: { xs: "80% !important", md: "100% !important" },
            },
          }}
        >
          <Headers
            product={decodeProduct}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue} />

          <Box sx={{ width: "100%" }}>
            <Products
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

          {/* {records.length >= selectedValue &&
            <CustomButton
              className="custom-button"
              onClick={handleFetchNextPage}
              style={{
                border: '1px solid #EE2026',
                color: '#EE2026',
                fontFamily: 'Lato',
                padding: '12px',
                borderRadius: '4px',
                minWidth: '250px',
                textAlign: 'center',
                fontSize: THEMES.DISPLAY_RESOLUTION.PARAGRAPH,
                margin: { xs: '20px 0px 30px 0px', md: '30px 0px 40px 0px' },
              }}
              label={'Load More'}
            />} */}
        </Box>
      </Box>

    </Box>
  );
};

export default Product;
