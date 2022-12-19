import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ProjectService from 'src/services/project.service';
import { useAppSelector } from 'src/app/hook';
import { useAppContext } from 'src/contexts/AppContext';
import { useProjects } from 'src/contexts/ProjectContext';

interface DateTimeProps {
  label?: string,
  task: any,
  dueDate: string,
  readOnly?: boolean
}

const DateTime = (props: DateTimeProps) => {
  const { label, task, dueDate, readOnly } = props;
  const { user } = useAppSelector((state) => state.user);
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(dueDate),
  );
  const { socket, setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useAppContext()
  const { selectedProject, setListMembers, setSelectedProject } = useProjects()

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    if (newValue) {
      const updateTask = {
        due_date: newValue
      }
      ProjectService.UpdateTaskByTaskId(user.id, task.id, updateTask)
        .then((res) => {
          console.log('checkk' ,task.assigned_to.id, user.id)
          if (task.assigned_to.id !== user.id) {
            socket.current.emit('sendNotificationtoMember',
              {
                userInfo: user,
                to_user_id: task.assigned_to.id,
                route: `/projects/${selectedProject.id}`,
                notification_content: `${user.username} has updated deadline of ${task.task_name} in project ${selectedProject.name}`,
                type: 'updateTask'
              },
              (error: any) => {
                if (error) {
                  console.log(error)
                }
              })
          }
          ProjectService.GetProjectByProjectId(selectedProject.id, user.id)
            .then((res) => {
              setListMembers(res.listMembers)
              setSelectedProject(res)
              setSnackbarMessage('Task updated successfully')
              setSnackbarSeverity('success')
              setOpenSnackbar(true)
            }).catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
          setOpenSnackbar(true)
          setSnackbarMessage('Error updating task')
          setSnackbarSeverity('error')
        })
    }
  };
  return (
    <Box sx={{ width: 220 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label={label ? label : null}
          value={value}
          readOnly={readOnly}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          minDate={dayjs()}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default DateTime