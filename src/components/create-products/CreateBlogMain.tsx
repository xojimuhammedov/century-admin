"use client";

import moment from "moment/moment";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import useGlobalContext from "@/hooks/use-context";
import apiUrl from "@/utils/api";
import { useRouter } from "next/navigation";



interface FormData {
  title_uz: string;
  title_en: string;
  title_ru: string;
  title_tr: string;
  text_uz: string;
  text_en: string;
  text_ru: string;
  text_tr: string;
  cat_id: string;
  images: []
}



const CreateServiceMain = () => {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();

    if (data.images && data.images.length) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }
    }

    formData.append('title_uz', data.title_uz);
    formData.append('title_en', data.title_en);
    formData.append('title_ru', data.title_ru);
    formData.append('title_tr', data.title_tr);
    formData.append('text_uz', data.text_uz);
    formData.append('text_en', data.text_en);
    formData.append('text_ru', data.text_ru);
    formData.append('text_tr', data.text_tr);
    formData.append('cat_id', data.cat_id);

    axios
      .post(
        `${apiUrl}/prods/`,
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
          case "Product was created succesfully!":
            toast.success(`Hudud yaratildi!🎉`, {
              position: "top-left",
            });
            reset();
            router.push("/products")
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

  useEffect(() => {
    axios
      .get(`${apiUrl}/cats/`)
      .then((res) => {
        setBlogs(res.data.data);
      })
      .catch((e) => console.log(e));
  }, []);



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
                      {...register("title_uz", {
                        required: "Name (Uzbek) is required",
                      })}
                    />
                    {errors.title_uz && (
                      <span>{errors.title_uz.message}</span>
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
                      {...register("title_en", {
                        required: "Name (English) is required",
                      })}
                    />
                    {errors.title_en && (
                      <span>{errors.title_en.message}</span>
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
                      {...register("title_ru", {
                        required: "Name (Russian) is required",
                      })}
                    />
                    {errors.title_ru && (
                      <span>{errors.title_ru.message}</span>
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
                      {...register("title_tr", {
                        required: "Name (Turk) is required",
                      })}
                    />
                    {errors.title_tr && (
                      <span>{errors.title_tr.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Text (Uzbek) */}
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Text (Uzbek)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Text (Uzbek)"
                      {...register("text_uz", {
                        required: "Text (Uzbek) is required",
                      })}
                    />
                    {errors.text_uz && (
                      <span>{errors.text_uz.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Text (English) */}
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Text (English)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Text (English)"
                      {...register("text_en", {
                        required: "Text (English) is required",
                      })}
                    />
                    {errors.text_en && (
                      <span>{errors.text_en.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Text (Russian) */}
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Text (Russian)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Text (Russian)"
                      {...register("text_ru", {
                        required: "Text (Russian) is required",
                      })}
                    />
                    {errors.text_ru && (
                      <span>{errors.text_ru.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Text (Turk)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Text (Turk)"
                      {...register("text_tr", {
                        required: "Text (Turk) is required",
                      })}
                    />
                    {errors.text_tr && (
                      <span>{errors.text_tr.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Mashhur joylarning rasmlarini yuklang
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="file"
                      placeholder="Add Product Rating"
                      {...register("images")}
                      style={{ padding: 0 }}
                      multiple
                      required
                    />
                  </div>
                </div>
              </div>
            </div>


            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Hududlar bo`yicha tanlang
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <select  {...register("cat_id", {
                      required: "Hudud (Uzbek) is required",
                    })} name="cat_id">
                      <option selected value="Tanlang">
                        Tanlang
                      </option>
                      {
                        blogs.map((item: any, index: any) => (
                          <option key={index} value={item.id}>{item.name_uz}</option>
                        ))
                      }
                    </select>
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