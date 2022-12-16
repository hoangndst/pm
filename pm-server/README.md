### Create Project
#### Client
``` json
{
    "userId": "",
    "teamId": "",
    "project": {
        "name": "",
        "description?": "",
    }
}
```

### Create Task
#### Client
``` json
{
    "userId": "",
    "task": {
        "name": "",
        "description?": "",
        "dueDate": "",
        "projectId": ""
    }
}
```

### Create Sub Task
#### Client
``` json
{
    "userId": "",
    "taskId": "",
    "subtask": {
        "name": "",
        "description?": "",
        "dueDate": "",
        "projectId": ""
    }
}
```

### Back-end
```js
    const subtask = {
        id: uniqid(),
        task_name: req.body.subtask.name,
        ...,
        task_id: req.body.taskId
    }
```

### Create comment
#### Client
``` json
{
    "userId": "",
    "taskId": "",
    "commentContent": ""
}
```

#### Back-end
``` js
    const comment = {
        id: uniqid(),
        task_id: req.body.taskId,
        user_id: req.body.userId,
        comment_content: req.body.commentContent,
    }
    // database.comment.create(comment)
```

### Create comment_reaction

#### Client
``` json

```


``` get comment by task id
``` json
[
    {
        id: "1",
        comment_content: "asdkasjdas",
        user: {
            id: 1232132,
            username:
            f
            l
        },
        likes: [
            {
                user: {
                    id
                    username
                    f
                    l
                },
                reaction: option
            }
        ]
    }
]
```