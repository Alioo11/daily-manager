import React,{useState , useRef} from 'react'
import {gql} from 'apollo-boost'
import {useMutation} from '@apollo/client'
import {useRouter} from 'next/router'

import style from './addTask.module.css'

const UPDATE_TASK =gql`
mutation addTask(
  $auth : String!
  $content : String!
  $importance : Int!
  $date : String!
){
  addTask(auth:$auth ,
    content:$content, 
    importance:$importance,
    date:$date
  ){
    date
    status
    importance
    content
  }
}
`



//const ADD_TASK;

function AddTask({type}) {
  const contentRef = useRef()
  const importanceRef = useRef()

  const [updateTask , {data , error}] = useMutation(UPDATE_TASK)

  const rout = useRouter()
  const {date} = rout.query;


    const submit = ()=>{
      if(type === "EDIT"){
        alert("you have to eidt a task")
      }
      else if(type === "ADD"){
        const content = contentRef.current.value;
        const importance = importanceRef.current.value
        updateTask({variables:{
          auth: localStorage.getItem('TOKEN'),
          content,
          importance:parseInt(importance),
          date
        }}).then(res =>{
          console.log(res);
          rout.push('/home')
        })
      }
    }

    

    return (
        <div>
            <div className={style.Container}>
              <h1 className={style.center_title}>{type==="ADD"?"Add Task":"Edit Task"}</h1>
                <div className={style.date_badge}>{date}</div>
                <div className={style.input_section}>
                    <label className={style.input_lable}>content :</label> 
                    <input type="text" name="content" id="content" ref={contentRef} />
                </div>
                <div className={style.input_section}>
                    <label className={style.input_lable}>importance :</label> 
                    <input type="number" name="importance" id="importance" ref={importanceRef} />
                </div>
                <button onClick={()=>submit()} className={style.submit}>submit</button>
            </div>
        </div>
    )
}

export default AddTask
