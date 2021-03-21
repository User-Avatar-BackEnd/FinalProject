const API ={
    id: 0,
    isOwner: true,
    title: "Board Title",
    members:["{user}"],
    columns:[
        {
            id: 0,
            order: 0,
            title:"To Do",
            //color: "#f1e429",
            tasks:[
                {
                    id: 0,
                    title: "New Task",
                    description: "Some text",
                    priority: 0, // 0 minimal, 1 normal, 2 high, 3 critical
                    responsible: "USER ID",
                    isHidden: false,
                    comments: 1
                },
                {
                    id: 1,
                    title: "Another New Task",
                    description: "Some another text",
                    priority: 3,
                    responsible: "USER ID",
                    isHidden: false,
                    comments: 0
                }
            ]
        },
        {
            id: 1,
            order: 1,
            title:"In Progress",
            tasks:[]
        },
        {
            id: 2,
            order: 2,
            title:"Done",
            tasks:[]
        }
    ]
}

export default API;