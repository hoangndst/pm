import { makeStyles, tokens, Text } from "@fluentui/react-components"

export const mainStyles = makeStyles({
  main: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    // flexDirection: 'column',
    minHeight: '1px',
  },
  mainPage: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    flexDirection: 'column',
    minWidth: '920px',
    position: 'relative',
  },
  ContentWrapper: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    paddingRight: '32px',
    paddingLeft: '32px',
    width: '100%',
  },
  Content: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1200px',
    width: '100%',
  },
  buttonHideWrapper: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'inline-flex',
    flexShrink: 0,
    justifyContent: 'center',
    overflowX: 'hidden',
    overflowY: 'hidden',
    transitionDuration: '0.2s',
    transitionProperty: 'background, border, color, fill',
    userSelect: 'none',
  }
});