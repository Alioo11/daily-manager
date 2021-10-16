import React from 'react'
import TL from './table.module.css'
import { MdOutlineDelete, MdEdit } from "react-icons/md"

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




function Table_Colunm({ date, tasks, _id }, index) {
    const dayStatus = calculatedateStatus(tasks)

    const exactDate = new Date(date)
    return <div className={TL.table_column} style={{ background: index % 2 === 0 ? "white" : "#F5F5F5" }}>
        <div className={TL.date}>
            <div className={TL.date_day_week}>{exactDate.toString().slice(0, 3)}</div>
            <div className={TL.date_date}>{exactDate.toString().slice(3, 15)}</div>

        </div>

        <div className={TL.progress_main} >
            {Progress_bar(dayStatus[0], colors.not_touched)}
            {Progress_bar(dayStatus[1], colors.done)}
            {Progress_bar(dayStatus[2], colors.in_progress)}
        </div>


        <div className={TL.task_list}>
            {tasks.map((task) => {
                return Table_Task(task.content)
            })}
        </div>
        <div>
            <div className={TL.edit_column}>
                <div className={TL.edit_column_btn}><MdEdit /></div>
            </div></div>

    </div>
}

function Table_Task(taskContent) {
    return <div className={TL.task}>
        {taskContent.slice(0, 25)}...
         <div className={TL.delete_btn}><MdEdit /></div>
        <div className={TL.delete_btn}><MdOutlineDelete /></div> </div>
}



function Table({ content }) {
    return (
        <div>
            {content.map((dayTask, index) => {
                return <div key={dayTask._id}>
                    {Table_Colunm(dayTask, index)}
                </div>
            })}
        </div>
    )
}

export default Table
