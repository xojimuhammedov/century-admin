"use client";
import { idType } from "@/interFace/interFace";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { blogDataType } from "@/interFace/apiInterFace";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UpdateImg from "./UpdateImg";
import { toast } from "react-toastify";
import useGlobalContext from "@/hooks/use-context";
import apiUrl from "@/utils/api";
interface FormData {
  id: string
  name_uz: string;
  name_en: string;
  name_ru: string;
  name_tr: string;
}
const BlogUpdateMain = ({ id }: idType) => {
  const [myproduct, setProduct] = useState<FormData>();
  const router = useRouter();


  useEffect(() => {
    axios
      .get(`${apiUrl}/cats/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((e) => console.log(e));
  }, [id]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();


  const onSubmit: SubmitHandler<FormData> = (data) => {
    // setLoading(true);
    const formData = new FormData();

    // Append text fields to formData
    formData.append('name_uz', data.name_uz);
    formData.append('name_en', data.name_en);
    formData.append('name_ru', data.name_ru);
    formData.append('name_tr', data.name_tr);


    axios
      .put(`${apiUrl}/cats/${id}`, formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "multipart/form-data",
        }
      })
      .then((res) => {
        if (res.data.message === "Category was updated successfully") {
          router.push("/categories")
          toast.success(`Hudud o'zgartirildi`, {
            position: "top-left",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          toast.error("CURD Operation Is Disabled");
        } else {
          toast.error("CURD Operation Is Disabled");
        }
      });
  };



  return (
    <>
      {myproduct && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="cashier-content-area mt-[30px] px-7"
        >
          <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
            <h4 className="text-[20px] font-bold text-heading mb-9">
              Hududni o`zgartirish
            </h4>
            <div className="grid grid-cols-12 gap-x-5">
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Hudud nomi - Uz
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct.name_uz}

                        placeholder="O'zbek"
                        {...register("name_uz",)}
                      />
                      {errors.name_uz && <span>{errors.name_uz.message}</span>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Hudud nomi - En
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct.name_en}

                        placeholder="Inglizcha nomi"
                        {...register("name_en",)}
                      />
                      {errors.name_en && <span>{errors.name_en.message}</span>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Hudud nomi - Ru
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct.name_ru}

                        placeholder="Rus"
                        {...register("name_ru",)}
                      />
                      {errors.name_ru && <span>{errors.name_ru.message}</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Hudud nomi - Turk
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct.name_tr}
                        placeholder="Turk"
                        {...register("name_tr")}
                      />
                      {errors.name_tr && <span>{errors.name_tr.message}</span>}
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-span-12">
                <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                  <button className="btn-primary" type="submit">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default BlogUpdateMain;
