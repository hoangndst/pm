import { Menu, MenuButton, MenuPopover, MenuTrigger, Text, MenuList, MenuItem, CounterBadge } from "@fluentui/react-components"
import { homeStyles, homeContentStyles } from "../libs/HomeStyles";
import { format } from 'date-fns';

export const Home = () => {

  const styles = homeStyles();
  const contentStyles = homeContentStyles();
  const date = new Date();

  return (
    <div className={styles.homeContentWrapper}>
      <div className={styles.homeContent}>
        <div className={contentStyles.time}>
          <Text size={400} weight="bold" > {format(date, 'PPPP')} </Text>
        </div>
        <div className={contentStyles.time}>
          <Text size={900} weight="semibold" >Good morning, Sir</Text>
        </div>
        <div className={contentStyles.achievementsAndCustomize}>
          <div className={contentStyles.achievement}>
            <div className={contentStyles.achievementsWidgetContent}>
              {/* <Menu>
                    <MenuTrigger>
                      <MenuButton size="large">Default</MenuButton>
                    </MenuTrigger>
                    <MenuPopover>
                      <MenuList>
                        <MenuItem>Item a</MenuItem>
                        <MenuItem>Item b</MenuItem>
                      </MenuList>
                    </MenuPopover>
                  </Menu> */}
              <Text size={400} weight="semibold" >Task completed</Text>
              <CounterBadge count={5} color="brand" size="medium" style={{ marginLeft: '16px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}