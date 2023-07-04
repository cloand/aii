"use client"
import { Box, Grid, Toolbar } from '@mui/material';
import Breadcrumb from 'AII-GB/app/components/Breadcrumb';
import ImageSection from 'AII-GB/app/components/imageSecton';
import { IsArrayOfImageExsist } from 'AII-GB/app/constants/nonExistFile';
import useAirtableProduct from 'AII-GB/app/middleware/useAirtableProduct';
import { RootState } from 'AII-GB/app/store/store';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { dSlugs } from 'AII-GB/app/constants/slugs';
import Carousel from 'AII-GB/app/components/carousel';
const DetailsSection = dynamic(() => import("./detailsSection"))
const UpperSection = dynamic(() => import("./detailsSection/upperSection"))
const SuggestionPage = dynamic(() => import("./suggestionPage"))

const Product: React.FC = () => {
  const tableName = 'Inventory';
  const { productName } = useSelector((state: RootState) => state?.productsSlice);

  const [records, fetchRecords, isLoading] = useAirtableProduct(
    tableName
  );

  const [selectedRecords, setSelectedRecords] = useState<number>(0);

  useMemo(() => {
    dSlugs(productName) && fetchRecords(dSlugs(productName))
  }, [dSlugs(productName)])

  const selectedRecord = Array.isArray(records) ? records[selectedRecords] : undefined;

  return (
    <Box sx={{ mt: { xs: 4, md: "inherit" } }}>
      <Toolbar />
      <Breadcrumb />
      <Box sx={{ padding: { xs: '20px', md: '40px', lg: '60px' } }}>
        <Grid container>
          <Grid item xs={12} md={6.5}>
            <Box sx={{
              width: "100%",
              display: { xs: "block", md: "none" },
              "& .carousel-slide":{
              backgroundSize:"contain",
              }
            }}>
              <Carousel sliderContent={IsArrayOfImageExsist(selectedRecord)} />
            </Box>
            <Box sx={{
              width: "100%",
              display: { xs: "none", md: "block" }
            }}>
              <ImageSection
                imgArray={IsArrayOfImageExsist(selectedRecord)}
                product={records}
                isLoading={isLoading}
              />
            </Box>

          </Grid>
          <Grid item xs={12} md={5.5}>
            <UpperSection
              product={selectedRecord ?? []}
              allRecords={records}
              isLoading={isLoading}
              selectedRecords={selectedRecords}
              setSelectedRecords={setSelectedRecords}
            />
          </Grid>
        </Grid>
        <DetailsSection product={selectedRecord ?? []} isLoading={isLoading} />
        <SuggestionPage product={selectedRecord} />
      </Box>
    </Box>
  );
};

export default Product;
