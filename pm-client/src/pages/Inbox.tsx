import React from "react"
import { Container, Box, SwipeableDrawer } from "@mui/material"
import InboxNavDrawer from "../modules/components/InboxNavDrawer"

const Inbox = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        flexGrow: 1,
        boxBizing: "border-box",
      }}
    >
      <InboxNavDrawer
        disablePermanent={false}
        onClose={() => setMobileOpen(false)}
        onOpen={() => setMobileOpen(true)}
        mobileOpen={mobileOpen}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
            position: "relative",
            top: 0,
            width: "100%",
          }}
        >
          this
        </Box>

      </InboxNavDrawer>
    </Box>
  )
}

export default Inbox