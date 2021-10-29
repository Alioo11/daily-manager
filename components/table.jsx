import React, { useEffect, useState } from 'react'
import TL from './table.module.css'
import { MdRemoveDone, MdOutlineDoneAll } from "react-icons/md"
import { FcProcess } from 'react-icons/fc'
import { GrInProgress } from 'react-icons/gr'
import { FiMoreVertical } from 'react-icons/fi'
import { BsCheck } from 'react-icons/bs'
import show_more from '../public/media/show_more.svg'
import { useMutation, useQuery } from '@apollo/client'
import { gql } from 'apollo-boost'
import { findSat } from './../helpers/findSat'
import { useRouter } from 'next/router'
import { isAuth } from './../helpers/isAuthenticated'

const GET_DAYS_INFO = gql`
query GET_DAYS($starterDate: String, $limit: Int , $auth : String!) {
  day(starterDate: $starterDate, limit: $limit) {
    _id
    date
    tasks (auth:$auth){
      content
      importance
      _id
      status
    }
  }
}
`
const CHANGE_TASK_STATUS = gql`
mutation changeTaskStatus(
  $_id: String!
  $status : String!
	$auth : String!
) {
  editTask(
    status:$status
    auth: $auth
    taskId: $_id
  ) {
    _id
    content
    importance
  }
}

`


const colors = {
    not_touched: "#FF6464",
    done: "#64FFAC",
    in_progress: "#FFE064"
}

function Progress_bar(percentage, color) {
    return <div className={TL.progress_container}>
        <div style={{ width: `${percentage}%`, background: color }} className={TL.progress_inner}></div>
    </div>
}

const calculatedateStatus = (tasks) => {
    if (tasks.length == 0) {
        return [0, 0, 0]
    }
    let n_t = 0
    let d = 0;
    let i_p = 0;
    let sum = 0
    let result = []

    tasks.map((task) => {
        if (task.status === "NOT_TOUCHED") {
            n_t += task.importance;
        } else if (task.status === "DONE") {
            d += task.importance;
        } else {
            i_p += task.importance;
        }
    })
    sum = n_t + d + i_p;
    result[0] = Math.round((n_t / sum) * 100)
    result[1] = Math.round((d / sum) * 100)
    result[2] = Math.round((i_p / sum) * 100)
    return result
}

function Table_Task(taskContent, handleTaskChange) {
    return <div className={TL.task}>
        <div>{taskContent.content}</div>
        <div className={TL.task_btnBox}>
            <div onClick={() => handleTaskChange(taskContent._id, "DONE")} className={TL.task_btn}><MdOutlineDoneAll /></div>
            <div onClick={() => handleTaskChange(taskContent._id, "IN_PROGRESS")} className={TL.task_btn}><GrInProgress /></div>
            <div onClick={() => handleTaskChange(taskContent._id, "NOT_TOUCHED")} className={TL.task_btn}><MdRemoveDone /></div>
        </div>
    </div>
}



function Table_Colunm({ date, tasks, _id }, index, handleOpenTask, isTaskExpanded, handlNavigateAddTask, handleTaskChange) {


    const dayStatus = calculatedateStatus(tasks);
    const exactDate = new Date(date);

    return <div className={TL.table_row_container} style={{ background: index % 2 === 0 ? "white" : "#F5F5F5" }}>
        <div className={`${TL.table_row} ${isTaskExpanded ? TL.task_open : ""} `}>

            <div className={TL.date}>
                <div className={TL.date_day_week}>{exactDate.toString().slice(0, 3)}</div>
                <div className={TL.date_date}>{exactDate.toString().slice(3, 15)}</div>
            </div>

            <div className={TL.progress_main} >
                {Progress_bar(dayStatus[0], colors.not_touched)}
                {Progress_bar(dayStatus[1], colors.done)}
                {Progress_bar(dayStatus[2], colors.in_progress)}
            </div>

            <div className={`${TL.task_list} ${isTaskExpanded ? TL.task_open : ""}`}>
                {tasks.map((task) => {
                    return Table_Task(task, handleTaskChange)
                })}
            </div>
            <div className={TL.edit_column}>
                <div onClick={() => handleOpenTask(index)} className={`${TL.edit_show_more_btn} ${isTaskExpanded ? TL.mirror : ""}`}><img src={show_more.src} alt="show more" /></div>
                <div onClick={() => { handlNavigateAddTask(date) }} className={TL.edit_column_btn}><FiMoreVertical /></div>
            </div>
        </div>
    </div>
}




function Table() {
    const rout = useRouter();
    const [limit, setLimit] = useState(14)
    const SatDate = findSat()
    const Token = isAuth()

    const handlNavigateAddTask = (date) => {
        rout.push({
            pathname: "/addTask",
            query: { date: date }
        })
    }
    const handleUnAuthorized = () => {
        rout.push('/signIn')
    }


    const [variables, setVariables] = useState({
        starterDate: SatDate.toString().slice(0, 15),
        limit,
        auth: Token
    })
    const [OpenTaskList, setOpenTaskList] = useState(new Array(limit).fill(false))

    const { data, error, loading, refetch } = useQuery(GET_DAYS_INFO, { variables })
    const [changeTaskStatus] = useMutation(CHANGE_TASK_STATUS)


    const handleTaskChange = (taskId, TaskStatus) => {
        console.log(taskId, TaskStatus, localStorage.getItem('TOKEN'));
        changeTaskStatus({
            variables: {
                _id: taskId,
                auth: localStorage.getItem('TOKEN'),
                status: TaskStatus
            }
        }).then(res => {
            console.log(res)
            refetch()
        }
        ).catch((error) => console.log(error))
    }


    const handleOpenTask = (taskIndex) => {
        setOpenTaskList(OpenTaskList.map((item, inx) => {
            if (taskIndex === inx) {
                return !item
            } else {
                return false
            }
        }))
    }

    useEffect(() => {
        refetch()
        console.log(data);
    }, [data])

    if (error) {
        return <div> error hahaha</div>
    }

    if (loading) {
        return <div> loading ...</div>
    }
    if (!error && !loading) {
        return (
            <div>
                {data.day.map((dayTask, index) => {
                    return <div key={dayTask._id}>
                        {Table_Colunm(dayTask, index, handleOpenTask, OpenTaskList[index], handlNavigateAddTask, handleTaskChange)}
                    </div>
                })}
            </div>
        )
    }

}


export default Table
