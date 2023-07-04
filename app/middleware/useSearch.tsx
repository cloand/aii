import { useEffect, useState } from 'react';
import base from '../apis/airtable';
import { Record as AirtableRecord } from 'airtable';
import { fetchFilterProduct } from '../store/reducers/products';
import { useDispatch } from 'react-redux';

interface InventoryRecord extends AirtableRecord<{ [key: string]: any }> {
    fields: {
        [key: string]: any;
    };
}

// Constant function for fetching inventory records
const useSearch = (): [InventoryRecord[], any, Boolean] => {
    const tableName = 'Inventory';
    
    const dispatch = useDispatch()

    const [records, setRecords] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
 

    const fetchRecords = (searchQuery: string) => {
        setIsLoading(true)
        
        const filterByFormula = `OR(SEARCH(LOWER("${searchQuery}"), LOWER({Name})),FIND(LOWER("${searchQuery}"), LOWER(ARRAYJOIN(Category, ','))) > 0,FIND(LOWER("${searchQuery}"), LOWER(ARRAYJOIN(Brand, ','))) > 0)`;

        base(tableName)
            .select({
                maxRecords: 30,
                filterByFormula,
                view: 'Grid view',
            })
            .eachPage(
                (records, fetchNextPage) => {
                    dispatch(fetchFilterProduct({ totalCount: records.length ?? 0 }))
                    setRecords(records)
                    setIsLoading(false)
                },
                (err) => {
                    if (err) {
                        setIsLoading(false)
                        console.error('Error retrieving records:', err);
                    }
                }
            );

    };

    return [records, fetchRecords, isLoading];
};

export default useSearch;
