import { mainStyles } from "../libs/MainStyles"
import { myTasksStyles } from "../libs/MyTasksStyles";
import { Menu, MenuTrigger, MenuButtonProps, SplitButton, MenuPopover, MenuList, MenuItem, MenuButton } from "@fluentui/react-components";
import { AddRegular, CheckmarkCircleRegular, ArrowSortRegular } from "@fluentui/react-icons";
import { DetailsListDocumentsExample } from "../components/Table";
export const MyTasks = () => {
  const styles = mainStyles();
  const myTasks = myTasksStyles();


  return (
    <div className={styles.ContentWrapper}>
      <div className={myTasks.myTasksPage}>
        <div className={myTasks.myTasksPageList}>
          <div className={myTasks.pageToolbarStructure}>
            <div className={myTasks.pageToolbarStructureLeftChildren}>
              <Menu positioning="below-end">
                <MenuTrigger>
                  {(triggerProps: MenuButtonProps) => (
                    <SplitButton menuButton={triggerProps} appearance="primary" icon={<AddRegular />}>
                      Add Task
                    </SplitButton>
                  )}
                </MenuTrigger>

                <MenuPopover>
                  <MenuList>
                    <MenuItem>Item a</MenuItem>
                    <MenuItem>Item b</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </div>
            <div className={myTasks.pageToolbarStructureRightChildren}>
              <div className={styles.buttonHideWrapper}>
                <Menu>
                  <MenuTrigger>
                    <MenuButton appearance="subtle" icon={<CheckmarkCircleRegular />} menuIcon={null} >Completed Tasks</MenuButton>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem>Item a</MenuItem>
                      <MenuItem>Item b</MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              </div>
              <div className={styles.buttonHideWrapper}>
                <Menu>
                  <MenuTrigger>
                    <MenuButton appearance="subtle" icon={<ArrowSortRegular />} menuIcon={null} >Sort by: </MenuButton>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem>Item a</MenuItem>
                      <MenuItem>Item b</MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              </div>
            </div>
          </div>
          <div className={myTasks.tableContainer}>
            <DetailsListDocumentsExample />
          </div>
        </div>
      </div>
    </div>
  )
};