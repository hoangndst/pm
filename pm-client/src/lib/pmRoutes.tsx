import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';

export const pmRoutes = [
  {
    label: 'pm',
    pages: [
      { title: 'Home', slug: '/pm/home', draft: true, icon: <HomeTwoToneIcon /> },
      { title: 'My Tasks', slug: '/pm/tasks', icon: <AssignmentTurnedInTwoToneIcon /> },
      { title: 'Inbox', slug: '/pm/inbox', icon: <MailTwoToneIcon /> },
      { title: 'Reporting', slug: '/pm/reporting', icon: <AssessmentTwoToneIcon /> },
    ],
  },
];