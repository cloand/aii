
"use client"
import styles from './page.module.css'
import Products from './[slugs]/productContainer';
import Carousel from './components/carousel';
import { IMAGES, THEMES } from './utils';
import { Box, Toolbar } from '@mui/material';
import useFetchAirtable from './middleware/useAirtable';
import HoverOnBrand from './components/ui/hoverOnBrand';
import { sliderContent } from './mocks/slider';

export default function Home() {
  const categorie = 'Categories';
  const brand = "Brand"

  const [categories, isLoading, Categories] = useFetchAirtable(categorie);
  const [brands, isLoadings, _, Brand] = useFetchAirtable(brand);

  return (
    <main className={styles.main}>
      <Box width={"100%"} sx={{ marginTop: { xs: "60px", md: "inherit" } }}>
        <Toolbar />
        <Carousel sliderContent={sliderContent} />

        <Box sx={{
          "img": {
            width: { xs: "260px", md: "310px" },
            height: { xs: "270px", md: "320px" }
          }
        }}>
          <Products
            products={Categories}
            name={"SHOP BY CATEGORY"}
            route={"categories"}
            imageWidth={310}
            imageHeight={320}
            noOfSlices={8}
            typoStyle={{
              fontSize: THEMES.DISPLAY_RESOLUTION.SUB_TITLE,
              padding: "10px 8px",
              fontFamily: "Playfair Display",
              width: "fit-content",
              background: "#fff",
              color: "#000",
              marginTop: "-25px",
            }}
            {...(Categories.length === 0 && { isLoading: isLoading })}
            grid={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            sectionBackground={{ background: "#F4EBE2" }}
          />
        </Box>
        <Box sx={{ padding: { xs: "0px 30px", md: "auto" } }}>
          <Products
            products={Brand}
            name={"SHOP BY BRAND"}
            noOfSlices={10}
            route={"brand"}
            imageWidth={228}
            imageHeight={218}
            typoStyle={{
              fontSize: THEMES.DISPLAY_RESOLUTION.PARAGRAPH,
              padding: "4px",
              fontFamily: "Poppins",
              width: "fit-content",
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#B40001",
            }}
            {...(Brand.length === 0 && { isLoading: isLoadings })}
            grid={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}
            innerBoxStyle={{ border: "1px solid #ACACAC" }}
            hoverPopup={<HoverOnBrand />}
            type={{ name: "Name", defaultImage: IMAGES.defaultBrandImage }}
          />
        </Box>

      </Box>



    </main>
  )
}
