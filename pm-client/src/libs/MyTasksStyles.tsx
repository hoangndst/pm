import { makeStyles, tokens, Text } from "@fluentui/react-components"

export const myTasksStyles = makeStyles({
  myTasksPage: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    flexDirection: 'column',
    minHeight: '1px',
    position: 'relative',
  },
  myTasksPageList: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    flexDirection: 'column',
    minHeight: '1px',
  },
  pageToolbarStructure: {
    height: '48px',
    alignItems: 'center',
    display: 'flex',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    paddingLeft: '24px',
    paddingRight: '24px',
    position: 'relative',
  },
  pageToolbarStructureLeftChildren: {
    alignItems: 'center',
    display: 'flex',
    marginRight: 'auto',
    overflowX: 'hidden',
    overflowY: 'hidden',
    paddingRight: '8px',
  },
  pageToolbarStructureRightChildren: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 'auto',
  },
  tableContainer: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    flexDirection: 'column',
    minHeight: '1px',
    position: 'relative',
    width: '100%',
  }
});