"use client";
import { toast } from "react-toastify";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import apiUrl from "@/utils/api";
import { useRouter } from "next/navigation";

interface FormData {
  name_uz: string;
  name_en: string;
  name_ru: string;
  name_tr: string;
}

const CreateServiceMain = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {


    const formData = new FormData();

    formData.append('name_uz', data.name_uz);
    formData.append('name_en', data.name_en);
    formData.append('name_ru', data.name_ru);
    formData.append('name_tr', data.name_tr);

    axios
      .post(
        `${apiUrl}/cats/`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            "Content-Type": "multipart/form-data",
          }
        }
      )
      .then((res) => {
        switch (res.data.message) {
          case "Category was created succesfully!":
            toast.success(`Hudud yaratildi!🎉`, {
              position: "top-left",
            });
            reset();
            router.push("/categories")
            break;
          case "custom error":
            reset();
            toast.error(`something is wrong`, {
              position: "top-left",
            });
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        if (error.response.status === 403 || error.response.status === 403) {
          toast.error(`Qaytadan login qiling!`, {
            position: "top-left",
          });
          console.error("Unauthorized access");
        } else {
          console.error("Unauthorized access");
        }
      });
  };



  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-content-area mt-[30px] px-7"
      >
        <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          <h4 className="text-[20px] font-bold text-heading mb-9">
            Hudud yaratish
          </h4>
          <div className="grid grid-cols-12 gap-x-5">
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Name (Uzbek)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Name (Uzbek)"
                      {...register("name_uz", {
                        required: "Name (Uzbek) is required",
                      })}
                    />
                    {errors.name_uz && (
                      <span>{errors.name_uz.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Name (English)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Name (English)"
                      {...register("name_en", {
                        required: "Name (English) is required",
                      })}
                    />
                    {errors.name_en && (
                      <span>{errors.name_en.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Name (Russian)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Name (Russian)"
                      {...register("name_ru", {
                        required: "Name (Russian) is required",
                      })}
                    />
                    {errors.name_ru && (
                      <span>{errors.name_ru.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Name (Turk)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Name (Turk)"
                      {...register("name_tr", {
                        required: "Name (Turk) is required",
                      })}
                    />
                    {errors.name_tr && (
                      <span>{errors.name_tr.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>


            <div className="col-span-12">
              <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                <button className="btn-primary" type="submit">
                  Yaratish
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateServiceMain;
