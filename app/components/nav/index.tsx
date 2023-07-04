"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './page.module.css'
import { Box, Typography, } from '@mui/material'
import { ICONS, THEMES } from 'AII-GB/app/utils';
import Image from 'next/image';
import BasicPopover from '../popover'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link';
import { RootState } from 'AII-GB/app/store/store'
import useDebounce from 'AII-GB/app/middleware/useDebounce';
import useSearch from 'AII-GB/app/middleware/useSearch';
import Suggestions from '../ui/suggestions';
import OutsideClicked from '../ui/captureEvent';
import { useRouter } from 'next/navigation';
import { slug } from 'AII-GB/app/constants/slugs';

import dynamic from "next/dynamic";
import Menu from "./menu";
import { fetchSearchResult } from 'AII-GB/app/store/reducers/products';
const Header: React.FC = () => {
  const category = useSelector((state: RootState) => state?.productsSlice?.Categories)
  const router = useRouter()
  const dispatch = useDispatch()
  const debounce = useDebounce()

  const [records, fetchRecords, isLoading] = useSearch()

  const [action, setAction] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleSubmit = (e: FormEvent<HTMLFormElement>, productName: string) => {
    e.preventDefault()

    setSearchText(productName)
    dispatch(fetchSearchResult(slug(productName)))
    router.push(`/search?g=${encodeURIComponent(slug(productName))}`)
    setAction(false)
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchText(value)

    if (value.length < 2) return setAction(false)
    setAction(true)
    debounce(() => fetchRecords(value), 1000)
  }
  return (
    <header
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: "#ffffff",
        // boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "0 16px",
          marginBottom: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Menu />
          <Box sx={{ display: { md: "none" } }}>
            <Link href={"/"}>
              <Image src={ICONS.logo} alt="logo" width={100} height={70} />
            </Link>
          </Box>

        </Box>

        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Link href={"/"}>
              <Image src={ICONS.logo} alt="logo" width={150} height={70} />
            </Link>
          </Box>

          <Box className={styles.search} sx={{
            width: { xs: "100%", md: "auto" },

            "& a": {
              textDecoration: "none",
              color: "#000",
              cursor: "pointer"
            },
            "h5": {
              fontFamily: "Lato",
              fontSize: THEMES.DISPLAY_RESOLUTION.PARAGRAPH,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
          }}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Typography
                variant='h5'
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                sx={{ background: "none", cursor: "pointer" }}
                aria-describedby={id}
                onClick={handleClick}>
                Categories
                <Image
                  src={ICONS.downArrows}
                  alt="select-products"
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  width={12}
                  height={7} />
              </Typography>
              <Link href={`/brand`}>
                <Typography
                  mx={3}
                  variant='h5'
                  component='h5'>Brands</Typography>
              </Link>
              <BasicPopover
                id={id}
                open={open}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                items={category}
                className="category-buttons"
              />
            </Box>

            <OutsideClicked setAction={setAction}>
              <form onSubmit={(e) => handleSubmit(e, searchText)}>
                <input type='text' placeholder='Search...' value={searchText} onChange={handleSearch} />
                <button><Image src={ICONS.searchIcon} alt="search-icon" width={20} height={20} /></button>
              </form>
              {action && <Suggestions
                items={records}
                handleItem={handleSubmit}
                loading={isLoading} />
              }
            </OutsideClicked>
          </Box>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
