import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { CiCircleRemove } from "react-icons/ci";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.css";

const TodoList = () => {
  const [inpVal, setinpVal] = useState("");
  const [todoS, settodoS] = useState([]);
  const [eBtn, seteBtn] = useState(true);
  const [eBtnAdd, seteBtnAdd] = useState(null);

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);

  // add todo

  const addtodo = () => {
    if (!inpVal) {
      alert("Please Enter Some Values");
    } else if (inpVal && !eBtn) {
      settodoS(
        todoS.map((val) => {
          if (val.id === eBtnAdd) {
            return {
              ...val,
              name: inpVal,
            };
          }
          return val;
        })
      );
      seteBtn(true);
      setinpVal("");
      seteBtnAdd(null);
    } else {
      const allData = { id: new Date().getTime().toString(), name: inpVal };
      settodoS([...todoS, allData]);
      setinpVal("");
    }
  };

  // del todo

  const delTodo = (ind) => {
    const del = todoS.filter((val) => {
      return ind !== val.id;
    });
    settodoS(del);
  };

  // edit todo

  const editTodo = (id) => {
    let edit = todoS.find((val) => {
      return val.id === id;
    });
    seteBtn(false);
    setinpVal(edit.name);
    seteBtnAdd(id);
  };
  // remove all
  const remtodo = () => {
    settodoS([]);
  };

  return (
    <>
      <div className="container col-lg-5 col-md-6 col-sm-12">
        <div>
          <h1 className="text-center">Todo List</h1>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex flex-wrap form-control  justify-content-between">
              <input
                className="myInput "
                placeholder="Enter Todo...✍ "
                value={inpVal}
                onChange={(e) => setinpVal(e.target.value)}
              />

              <div className="btnDiv">
                {eBtn ? (
                  <GrAdd onClick={addtodo} className=" myBtn" />
                ) : (
                  <GrAdd onClick={addtodo} className=" myBtn" />
                )}
                <AiOutlineDelete onClick={remtodo} className=" myBtn" />
              </div>
            </div>
            <div className="mt-5 text-capitalize text-break">
              {todoS.map((val) => {
                return (
                  <div
                    className="d-flex mt-2 flex-wrap form-control justify-content-between align-items-center"
                    key={val.id}
                  >
                    <h3>{val.name}</h3>
                    <div>
                      <CiCircleRemove
                        onClick={() => {
                          delTodo(val.id);
                        }}
                        className="myBtn"
                      />
                      <AiOutlineEdit
                        onClick={() => {
                          editTodo(val.id);
                        }}
                        className="myBtn"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
