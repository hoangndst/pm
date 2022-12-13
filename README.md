# pm
Project Management Web Application
getAllProjs: 
    req {
        teamId
    }
    res {
        [
            proj1 {
                ...
            }
            proj2 {
                ...
            }
        ]
    }
updateProj: 
    req {
        userId,
        projId
        updateData {

        }
    }
    res {
        new projObj{
            projUpdateData {}
            ...oldProj{}
        }
    }
deleteProj: 
    req {
        userId,
        projId
    }
    res{
        noti
    }
createTask:
    req {
        userId,
        projId,
        task {
            name,
            assignTo

        }
    }
createSubTask:
    req {
        userId,
        parentTaskId,
        subtask {
            name,
            assignTo
        }
    }