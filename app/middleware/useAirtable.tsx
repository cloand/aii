import { useEffect, useState } from 'react';
import base from '../apis/airtable';
import { Record as AirtableRecord } from 'airtable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/reducers/products';
import { RootState } from '../store/store';
import { useSearchParams } from 'next/navigation';
interface InventoryRecord extends AirtableRecord<{ [key: string]: any }> {
    fields: {
        [key: string]: any;
    };
}

// Constant function for fetching inventory records
const useFetchAirtable = (tableName: string, maxRecords?: number, isPagination?: boolean): [InventoryRecord[], Boolean, any, any] => {
    const dispatch = useDispatch()

    const { Categories, Brand } = useSelector((state: RootState) => state?.productsSlice)

    const [records, setRecords] = useState<InventoryRecord[]>([]);
    const [isLoading, setIsloading] = useState<Boolean>(false)
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
      
      
            fetchRecords()
      
    }, [])

    const fetchRecords = () => {
        setIsloading(true)
        base(tableName)
            .select({
                maxRecords: maxRecords ?? 100,
                view: "Grid view",
                offset: offset,
            })
            .eachPage(
                (newRecords, fetchNextPage) => {
                    const updatedRecords = isPagination ? [...records, ...newRecords] : [...newRecords];
                    setRecords(updatedRecords);

                    if (Categories.length === 0) {
                        dispatch(fetchProducts({ name: tableName, data: updatedRecords }))
                    }

                    isPagination && fetchNextPage();
                    setIsloading(false)
                },
                (err) => {
                    if (err) {
                        setIsloading(false)
                        console.error('Error retrieving records:', err);
                        return;
                    }
                }
            );
    };

    return [records, isLoading, Categories, Brand];
};

export default useFetchAirtable;
