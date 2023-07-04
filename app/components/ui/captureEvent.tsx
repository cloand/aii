import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";

interface OutsideClickedProps {
    children: React.ReactNode;
    setAction: (action: boolean) => void;
}

function OutsideClicked({ children, setAction }: OutsideClickedProps) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setAction(false);
        }
    };

    return <Box sx={{
        marginTop: "6px",
        position: "relative",
        width: { xs: "100%", md: "auto" },
        "form": {
            display: "flex",
            justifyContent: "space-between",
        },
        "& input": {
            minWidth: { xs: "80%", md: "300px" },
            fontSize: { xs: "15px", md: "18px" },
        }
    }}
        ref={wrapperRef}>{children}</Box>;
}

export default OutsideClicked;
