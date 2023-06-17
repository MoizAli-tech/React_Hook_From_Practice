import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import * as Yup from "yup";

function Contact() {

  


  let { register, control, handleSubmit, formState,watch,getValues,setValue,reset} = useForm({
    defaultValues:{
      name:"",
      email:"",
      message:"",
      terms:false
    },
    mode:"onBlur"
  });
  let { errors,touchedFields,dirtyFields,isSubmitted,isSubmitting,isSubmitSuccessful } = formState;

  function onSubmit(values) {
    console.log(values)
    
  }

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset();
    }
  },[isSubmitSuccessful])

  function onError(error){
    console.log(error)
  }

  return (
    <div className="contact border-2 border-emerald-300 p-8 flex justify-center bg-emerald-500">
      <DevTool control={control} />
      <div className="bg-emerald-600  shadow-sm shadow-black flex flex-col align-center justify-center rounded-md w-1/2 p-4 ">
        <h1 className="text-4xl text-center p-2 text-white">Contact Us</h1>




        <form onSubmit={handleSubmit(onSubmit,onError)}>
          <div className="form-group flex flex-col">

            <label htmlFor="name" className={errors.name?.message ? "text-red-500 " : ""}>{errors.name?.message ? errors.name.message : "Name"}</label>
            <input
              type="text"
              className="border-2 border-teal-500  w-1/2 focus:outline-none focus:border-emerald-700  rounded-md m-1"
              id="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required"
                }
              })}
            />
          </div>
          <div className="form-group flex flex-col">
            <label htmlFor="email" className={errors.email?.message ? "text-red-500 " : ""}>{errors.email?.message ? errors.email.message : "Email"}</label>
            <input
              type="email"
              id="email"
              className="border-2 border-teal-500  w-1/2 focus:outline-none focus:border-emerald-700  rounded-md m-1"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required "
                },
                validate: {
                  ending(fieldValue) {
                    if (fieldValue == "admin@gmail.com") {
                      return "Enter a valid email"
                    }
                  }
                }
              })}
            />
          </div>
          <div className="form-group flex flex-col">
            <label htmlFor="message" className={errors.message?.message ? "text-red-500 " : ""}>{errors.message?.message ? errors.message.message : "Message"}</label>
            <textarea
              id="message"
              className="border-2 border-teal-500 focus:outline-none focus:border-teal-600 rounded-md m-1"
              {...register("message", {
                required: {
                  value: true,
                  message: "Message is required"
                },
                validate: {
                  count(fieldValue) {
                    if(fieldValue.length<20){
                      return "Must be greater than 20 characters"
                    }
                  }
                }
              })}
            />
          </div>
          <div className="form-group">

            <p className={errors.message?.message ? "text-red-500 " : ""}>{errors.terms?.message}</p>
            <input
              type="checkbox"
              id="terms"
              className="border-2 border-teal-600 focus:outline-none mx-2"
              {...register("terms",{
                required:{
                  value:true,
                  message:"you must agree with our terms & conditions"
                }
              })}
            />
            <label htmlFor="terms">I agree to the terms and conditions</label>
          </div>
          <div className="mt-4  flex align-center justify-center">
            <button type="submit"
              className="btn bg-emerald-400 rounded-md px-4 py-1 hover:bg-emerald-700">
              Send</button>

              <button type="button"
               onClick={()=>{setValue("name","hassan",{shouldValidate:true,shouldTouch:true})}}
              className="btn ml-2 bg-emerald-400 rounded-md px-4 py-1 hover:bg-emerald-700">
             
              setter</button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default Contact;
