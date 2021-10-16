import React from "react";
import Table from "./../../components/table";

const dummyData = [
  {
    _id: "llkj4d5f4sd8f45s4df65",
    date: "Oct 14 2021",
    tasks: [
      {
        _id: "46a5sd4f84sdf54asd6fas89d",
        content: "this is some task to do for today ",
        importance: 17,
        status: "NOT_TOUCHED",
      },
    ],
  },
  {
    _id: "llkj4d5f4sd8f45s4df65",
    date: "Oct 15 2021",
    tasks: [
      {
        _id: "46a5sd4f84sdf54asd6fas89d",
        content: "this is some task to do for today ",
        importance: 17,
        status: "DONE",
      },
      {
        _id: "46a5ssdf54dsfasdasd6fas89d",
        content: "this is some task to do for today ",
        importance: 19,
        status: "NOT_TOUCHED",
      },
      {
        _id: "46aasddsfdfdfdasdasd6fas89d",
        content: "this is some task to  ",
        importance: 19,
        status: "IN_PROGRESS",
      },
    ],
  },
  {
    _id: "llkj4d5f4sd8f45s4df65",
    date: "Oct 16 2021",
    tasks: [
      {
        _id: "46a5sd4f84sdf54asd6fas89d",
        content: "this is some task to do for today ",
        importance: 17,
        status: "NOT_TOUCHED",
      },
    ],
  },
  {
    _id: "llkj4d5f4sd8f45s4df65",
    date: "Oct 17 2021",
    tasks: [
      {
        _id: "46a5sd4f84sdf54asd6fas89d",
        content: "this is some task to do for today ",
        importance: 17,
        status: "NOT_TOUCHED",
      },
    ],
  },
  {
    _id: "llkj4d5f4sd8f45s4df65",
    date: "Oct 18 2021",
    tasks: [
      {
        _id: "46a5sd4f84sdf54asd6fas89d",
        content: "this is some task to do for today ",
        importance: 17,
        status: "NOT_TOUCHED",
      },
    ],
  },
  {
    _id: "llkj4d5f4sd8f45s4df65",
    date: "Oct 19 2021",
    tasks: [
      {
        _id: "46a5sd4f84sdf54asd6fas89d",
        content: "this is some task to do for today ",
        importance: 17,
        status: "NOT_TOUCHED",
      },
    ],
  },
  {
    _id: "llkj4d5f4sd8f45s4df65",
    date: "Oct 20 2021",
    tasks: [
      {
        _id: "46a5sd4f84sdf54asd6fas89d",
        content: "this is some task to do for today ",
        importance: 17,
        status: "NOT_TOUCHED",
      },
    ],
  },
];

function Home() {
  return (
    <div>
      <Table content={dummyData} />
    </div>
  );
}

export default Home;
