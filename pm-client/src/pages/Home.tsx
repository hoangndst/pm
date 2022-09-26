import { SideBar } from "../components/SideBar"
import { TopBar } from "../components/TopBar";
import { makeStyles, tokens } from "@fluentui/react-components"


const homeStyles = makeStyles({
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
  }
});

export const Home = () => {
  
  const styles = homeStyles();

  return (
    <div className={styles.main}>
      <SideBar />
      <div className={styles.mainPage}>
        <TopBar />
      </div>
    </div>
  )
}