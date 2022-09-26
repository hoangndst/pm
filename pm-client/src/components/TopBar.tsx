import { makeStyles, shorthands, tokens } from "@fluentui/react-components"
import { SearchBox } from "@fluentui/react";
import { 
  Input, 
  Menu, 
  MenuTrigger, 
  Tooltip, 
  MenuPopover, 
  MenuList, 
  MenuItem,
  MenuButton,
  Avatar,
  Button, 
} from "@fluentui/react-components";
import { SearchRegular, AddRegular } from "@fluentui/react-icons";

const topBarStyles = makeStyles({
  main: {
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackground2,
    boxSizing: 'border-box',
    display: 'flex',
    flexShrink: 0,
    minHeight: '72px',
    paddingRight: '24px',
    paddingLeft: '24px',
    position: 'relative',
    zIndex: 200,
  },
  baseHeader: {
    display: 'inline-flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    minWidth: '1px',
  },
  actionHeader: {
    alignItems: 'center',
    display: 'flex',
  }
});

const actionHeaderStyles = makeStyles({
  searchBox: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    position: 'relative',
    width: '240px',
  },
  avatar: {
    marginLeft: '16px',
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
  },
});

export const TopBar = () => {

  const wrapper = topBarStyles();
  const actionHeader = actionHeaderStyles();
  return (
    <div className={wrapper.main}>
      <div className={wrapper.baseHeader}>

      </div>
      <div className={wrapper.actionHeader}>
        <div className={actionHeader.searchBox}>
          <Input contentBefore={<SearchRegular />} placeholder="Search" />
        </div>
        <Menu>
          <MenuTrigger>
            <Tooltip content="Menu" relationship="label">
              <MenuButton icon={<AddRegular />} />
            </Tooltip>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Task</MenuItem>
              <MenuItem>Message</MenuItem>
              <MenuItem>Invite</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <div className={actionHeader.avatar}>
          <Avatar name="John Doe" />
        </div>
      </div>
    </div>
  )
}
