import { useEffect, useMemo, useState } from 'react';
import base from '../apis/airtable';

interface BrandData {
  // Define the properties of BrandData
  // Example: Name: string;
}

interface Record {
  id: string;
  fields: any;
  brandData: BrandData;
}

const useAirtableProduct = (
  tableName: string,
): [Record[], (productName: string) => void, boolean] => {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecords = (productName: string) => {
    
    setIsLoading(true);
    base(tableName)
      .select({
        view: 'Grid view',
        filterByFormula: `LOWER({Name}) = LOWER('${productName}')`,
      })
      .eachPage(
        async (records, fetchNextPage) => {
          const updatedRecords = await Promise.all(
            records.map(async (record: any) => {
              const brandData = await base('Brand').find(record.fields.Brand);
              return {
                id: record.id,
                fields: record.fields,
                brandData: brandData.fields as BrandData,
              };
            })
          );
          setRecords(updatedRecords);
          setIsLoading(false);
        },
        (err) => {
          setIsLoading(false);
          console.error(err);
        }
      );
  };

  return [records, fetchRecords, isLoading];
};

export default useAirtableProduct;
