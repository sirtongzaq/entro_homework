import React from "react";
import { HiOutlineChevronLeft, HiPlusCircle } from "react-icons/hi";
import { useRouter } from "next/router";
import style from "../styles/create.module.css";

export default function Create() {
  const router = useRouter();
  return (
    <div>
      <div class={style.header}>
        <h1>
          <button
            id={style.back_btn}
            onClick={() => {
              router.back();
            }}
          >
            <span id={style.back_icon}>
              <HiOutlineChevronLeft />
            </span>
            Back
          </button>
        </h1>
      </div>
      <div className={style.main}>
        <h1>Create Survey</h1>
        <div className={style.card}>
          <p>Title</p>
          <input type="text" id={style.input} placeholder="" />
          <label>0/100 Character</label>
          <p>Description</p>
          <input type="text" id={style.input} placeholder="" />
          <label>0/5000 Character</label>
          <p>Point</p>
          <input type="text" id={style.input} placeholder="0" />
        </div>
        <button className={style.qbtn}>
          <span id={style.plus_icon}>
            <HiPlusCircle />
          </span>
          Question
        </button>
        <div className={style.btnflex}>
          <button className={style.cancelbtn}>Cancel</button>
          <button className={style.createbtn}>Create</button>
        </div>
      </div>
    </div>
  );
}
