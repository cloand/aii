import React, { useEffect, useState } from 'react';
import CarouselBox from 'AII-GB/app/components/ui/CarouselBox/CarouselBox';
import CarouselBoxCard from 'AII-GB/app/components/ui/CarouselBox/CarouselBoxCard';
import { Box } from '@mui/material';
import base from 'AII-GB/app/apis/airtable';
import { useSelector } from 'react-redux';
import { RootState } from 'AII-GB/app/store/store';
import { dSlugs } from 'AII-GB/app/constants/slugs';
type Route = any
interface BrandData {
  Name?: string;
  // Add other properties of BrandData if available
}

interface Record {
  id: string;
  fields: {
    Brand: string;
    // Add other properties of the record if available
  };
  brandData: BrandData;
}

const SuggestionPage: React.FC<{ product: any }> = ({ product }) => {
  const tableName = 'Inventory';
  const maxRecords = 30;

  const routes: Route[] = useSelector((state: RootState) => state?.productsSlice.routes);

  const [records, setRecords] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [carouselRecords, setCarouselRecords] = useState<Record[]>([]);
  
  const fetchRecords = async (): Promise<void> => {
    const brandDataName = product?.brandData?.Name;
    if (!brandDataName) return;

    setIsLoading(true);

    try {
      const filterFormula = `AND(FIND('${brandDataName}', ARRAYJOIN(Brand, ',')))`;
      const options = {
        maxRecords: maxRecords,
        view: 'Grid view',
        filterByFormula: filterFormula,
      };

      const newRecords = await base(tableName).select(options).all();
      setRecords(newRecords);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error('Error retrieving records:', err);
    }
  };
  
  const fetchCarouselRecords = async (): Promise<void> => {
    const brandLookup: { [key: string]: BrandData } = {};
    setIsLoading(true);

    try {
      const brandRecords = await base('Brand').select().all();
      brandRecords.forEach((brandRecord) => {
        brandLookup[brandRecord.id] = brandRecord.fields;
      });

      const filterFormula = `AND(
        OR(
          FIND(LOWER("${dSlugs(routes[1]?.breadcrumb)}"), LOWER(ARRAYJOIN(Category, ','))),
          FIND(LOWER("${dSlugs(routes[1]?.breadcrumb)}"), LOWER(ARRAYJOIN({Brand}, ',')))
        ),
        {Brand} != ''
      )`;
      //`AND(FIND('${decodeURI(routes[0]?.breadcrumb)}', ARRAYJOIN(Category, ',')))`;
      const options = {
        maxRecords: maxRecords,
        view: 'Grid view',
        filterByFormula: filterFormula,
      };

      const newRecords = await base(tableName).select(options).all();
      const updatedRecords: Record[] = newRecords.map((record: any) => ({
        ...record,
        brandData: brandLookup[record.fields.Brand],
      }));

      setCarouselRecords(updatedRecords);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (product?.brandData?.Name) fetchRecords();
  }, [product?.brandData?.Name]);

  useEffect(() => {
    if (routes[0]?.breadcrumb) fetchCarouselRecords();
  }, [routes[0]?.breadcrumb]);

  return (
    <Box sx={{ marginTop: { xs: '20px', md: '80px' } }}>
      {records.length > 0 && (
        <CarouselBox label="Other Products On This Collection">
          {records.slice(0, 10).map((product: any, i: number) => (
            <CarouselBoxCard
              key={i}
              product={product}
              brandName={product?.brandData?.Name}
              isLoading={isLoading}
              routes={routes}
            />
          ))}
        </CarouselBox>
      )}
      {carouselRecords.length > 0 && (
        <CarouselBox label="You Might Also Like">
          {carouselRecords.slice(0, 10).map((product, i: number) => (
            <CarouselBoxCard
              key={i}
              product={product}
              routes={routes}
              isLoading={isLoading}
            />
          ))}
        </CarouselBox>
      )}
    </Box>
  );
};

export default SuggestionPage;
