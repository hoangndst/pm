import { makeStyles, mergeClasses, shorthands, tokens, Tab, TabList, Image, Tooltip, CompoundButton, Button } from "@fluentui/react-components";
import * as React from 'react';
import { HomeRegular, TaskListSquareLtrRegular, AlertRegular, ChevronLeftRegular, ChevronCircleRightRegular } from '@fluentui/react-icons';

type ExampleTab = {
  id: string;
  name: string;
  icon: React.ReactElement;
};
const tabs: ExampleTab[] = [{
  id: 'home',
  name: 'Home',
  icon: <HomeRegular />
}, {
  id: 'my-tasks',
  name: 'My Tasks',
  icon: <TaskListSquareLtrRegular />
}, {
  id: 'inbox',
  name: 'Inbox',
  icon: <AlertRegular />
}];

const useExampleStyles = makeStyles({
  example: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.overflow('hidden'),
    ...shorthands.padding('5px'),
    zIndex: 0, //stop the browser resize handle from piercing the overflow menu
  },
  vertical: {
    height: '100%',
    // minHeight: '100px',
    width: '240px',
    display: 'sticky',
  },
  head: {
    display: 'flex',
    alignItems: 'center',
    height: '72px',
    justifyContent: 'space-between',
    ...shorthands.padding('5px'),
    // ...shorthands.margin('5px'),
    // marginTop: '10px',
    // marginBottom: '10px',
  }
});

const VerticalExample = () => {
  const styles = useExampleStyles();
  const [selectedTabId, setSelectedTabId] = React.useState<string>('home');

  const onTabSelect = (tabId: string) => {
    setSelectedTabId(tabId);
  };

  return <div className={mergeClasses(styles.example, styles.vertical)}>
    <div className={styles.head}>
      <Image src='https://upload.wikimedia.org/wikipedia/vi/b/bf/Logo_HUET.svg'
        style={{ width: '40%', objectFit: 'contain', paddingLeft: '24px' }}
      />
      <Tooltip content='Collapse' relationship="label">
        <Button icon={<ChevronLeftRegular />} />
      </Tooltip>
    </div>
    <TabList vertical selectedValue={selectedTabId} onTabSelect={(_, d) => onTabSelect((d.value as string))}
      style={{minHeight: 32}}
    >
      {tabs.map(tab => {
        return <Tab key={tab.id} value={tab.id} icon={<span>{tab.icon}</span>} 
          style={{
            alignItems: 'center',
            display: 'flex',
            height: '32px',
            lineHeight: '32px',
            padding: '0 24px 0 24px',
          }}
        >
          {tab.name}
        </Tab>
      })}
    </TabList>
  </div>;
};

export const SideBar = () => {
  return <VerticalExample />
};

SideBar.parameters = {
  docs: {
    description: {
      story: ['A tab list can support overflow by using Overflow and OverflowItem.', '', '**Note**: when adding custom buttons to a tablist, e.g. the overflow button in this example,' + '`role="tab"` must be manually added for screen reader accessibility.'].join('\n')
    }
  }
};