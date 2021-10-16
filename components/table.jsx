import React from 'react'
import TL from './table.module.css'
import {MdOutlineDelete , MdEdit} from "react-icons/md"

function Table_Colunm ({date , tasks , _id  },index){
    const exactDate = new Date(date)
    return <div className={TL.table_column} style={{background : index%2===0 ? "white":"#F5F5F5"}}>
        <div className={TL.date}>
            <div className={TL.date_day_week}>{exactDate.toString().slice(0,3)}</div>
            <div className={TL.date_date}>{exactDate.toString().slice(3,15)}</div>

        </div>
        <div className={TL.task_list}>
            {tasks.map((task)=>{
                return Table_Task(task.content)
            })}
             </div>
        <div className={TL.edit_column}>
            <div className={TL.edit_column_btn}><MdEdit/></div>
        </div>
    </div>
}

function Table_Task(taskContent){
    return <div className={TL.task}>
        {taskContent.slice(0,25)}...   
         <div className={TL.delete_btn}><MdEdit/></div>
        <div className={TL.delete_btn}><MdOutlineDelete/></div> </div>
}



function Table({ content }) {
    return (
        <div>
            {content.map((dayTask , index)=>{
                return <div key ={dayTask._id}>
                    {Table_Colunm(dayTask , index)}
                </div>
            })}
        </div>
    )
}

export default Table
