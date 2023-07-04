import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { IBreadcrumb } from "../libs/types/breadcrumb";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductName, fetchRoutes } from "../store/reducers/products";
import { RootState } from "../store/store";
import { dSlugs } from "../constants/slugs";
import { THEMES } from "../utils";

const convertBreadcrumb = (str: string) => {
  return str
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü");
};

const Breadcrumb = () => {

  const path = window?.location?.pathname + window?.location?.hash;

  const dispatch = useDispatch()
  const { productName } = useSelector((state: RootState) => state?.productsSlice);
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb[] | []>([]);

  useEffect(() => {
    if (path) {
      const paths = path.split("/");

      paths.shift();

      const pathsArray = paths.map((path, i) => {
        return {
          breadcrumb: path,
          href: `/` + paths.slice(0, i + 1).join("/"),
        };
      });
      if (!productName) dispatch(fetchProductName(decodeURI(paths[paths?.length - 1])))
      dispatch(fetchRoutes(pathsArray))
      setBreadcrumbs(pathsArray);
    }
  }, [path]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <Box sx={{
      marginTop: "20px",
      background: "#F4EBE2",
      padding: { xs: "15px", md: "22px" },
    }}>
      <Box
        component="ul"
        sx={{
          display: "flex",
          alignItems: "center",
          listStyle: "none",
          marginLeft: { xs: "5px", md: "36px" },
          "& p":{
            maxWidth: {xs:"100px", md:"300px"},
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
          "& a": {
            textDecoration: "none",
            color: "#000",
            fontSize: THEMES.DISPLAY_RESOLUTION.PARAGRAPH,
          }
        }}>
        <Box component="li">
          <Link href="/">
            Home
          </Link>
        </Box>

        {breadcrumbs.map((breadcrumb, i) => {

          return (
            <Box component="li"
              key={breadcrumb.href}
              sx={{ fontFamily: "Lato", fontWeight: "400", textTransform: "capitalize", }}>
              <Typography>
                <span style={{ margin: "0px 10px" }}>|</span>
                <Link href={breadcrumb.href}>
                  {convertBreadcrumb(dSlugs(decodeURI(breadcrumb.breadcrumb)))}
                </Link>
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Breadcrumb;
