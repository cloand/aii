import React from 'react'
import MiddleSection from './detailsSection/bottomsection'

const DetailsSection = ({ product, isLoading }: any) => {
    return (
        <>
            <MiddleSection product={product} isLoading={isLoading} />
        </>

    )
}

export default DetailsSection