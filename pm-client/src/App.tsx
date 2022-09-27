import { Outlet } from 'react-router-dom';
import { mainStyles } from './libs/MainStyles';
import { SideBar } from './components/SideBar';
import { TopBar } from './components/TopBar';

function App() {
  const styles = mainStyles();
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className={styles.main}>
        <SideBar />
        <div className={styles.mainPage}>
          <TopBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
