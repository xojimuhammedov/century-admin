"use client";
import { idType } from "@/interFace/interFace";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import apiUrl from "@/utils/api";
interface FormData {
  id:string
  name_uz: string;
  name_en: string;
  name_ru: string;
  name_tr: string;
  text_uz: string;
  text_en: string;
  text_ru: string;
  text_tr: string;
  address: string;
  rating: string; 
  images: []
}
const BlogUpdateMain = ({ id }: idType) => {
  const [myproduct, setProduct] = useState<FormData>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [changeImage, setchangeImage] = useState(false);
  const router = useRouter(); 
 

  useEffect(() => {
    axios
      .get(`${apiUrl}/hotels/${id}`)
      .then((res) => { 
        setProduct(res.data.data);
      })
      .catch((e) => console.log(e));
  }, [id, changeImage]);
 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();


  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();

    if (data.images && data.images.length) {
      for (let i = 0; i < data.images.length; i++) {
          formData.append('images', data.images[i]);
      }
    } 
      
      // Append text fields to formData
      formData.append('name_uz', data.name_uz); 
      formData.append('name_en', data.name_en); 
      formData.append('name_ru', data.name_ru);
      formData.append('name_tr', data.name_tr); 
      formData.append('text_uz', data.text_uz); 
      formData.append('text_en', data.text_en); 
      formData.append('text_ru', data.text_ru);
      formData.append('text_tr', data.text_tr);
      formData.append('address', data.address);
      formData.append('rating', data.rating);
    
    axios
      .put(`${apiUrl}/hotels/${id}`, formData,{
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type":"multipart/form-data", 
        }
      })
      .then((res) => {
        if (res.data.message === "Hotel was updated successfully") {
          router.push("/services");
          toast.success(`hotel o'zgartirildi`, {
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
               Hotelni o`zgartirish 
            </h4>
            <div className="grid grid-cols-12 gap-x-5"> 
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Hotel nomi - Uz
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      defaultValue={myproduct.name_uz}

                      placeholder="O'zbek"
                      {...register("name_uz",  )}
                    />
                    {errors.name_uz && <span>{errors.name_uz.message}</span>}
                  </div>
                </div>
              </div>
            </div> 
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Hotel nomi - En
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      defaultValue={myproduct.name_en}

                      placeholder="Inglizcha nomi"
                      {...register("name_en",  )}
                    />
                    {errors.name_en && <span>{errors.name_en.message}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Hotel nomi - Ru
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      defaultValue={myproduct.name_ru}

                      placeholder="Rus"
                      {...register("name_ru",  )}
                    />
                    {errors.name_ru && <span>{errors.name_ru.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Hotel nomi - Turk
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

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Hotel tavsifi - Uz
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      defaultValue={myproduct.text_uz}

                      placeholder="O'zbek"
                      {...register("text_uz",  )}
                    />
                    {errors.text_uz && <span>{errors.text_uz.message}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Hotel tavsifi - Ru
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      defaultValue={myproduct.text_ru}

                      placeholder="Rus"
                      {...register("text_ru",  )}
                    />
                    {errors.text_ru && <span>{errors.text_ru.message}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Hotel tavsifi - En
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      defaultValue={myproduct.text_en}

                      placeholder="O'zbek"
                      {...register("text_en",  )}
                    />
                    {errors.text_en && <span>{errors.text_en.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Hotel tavsifi - Turk
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      defaultValue={myproduct.text_tr}
                      placeholder="Turk"
                      {...register("text_tr",  )}
                    />
                    {errors.text_tr && <span>{errors.text_tr.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Hotel Reytingi
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct.rating}
                        placeholder="Hotel Reytingi"
                        {...register("rating")}
                      />
                      {errors.rating && <span>{errors.rating.message}</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Hotel Manzili
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct.address}
                        placeholder="Hotel Manzili"
                        {...register("address")}
                      />
                      {errors.address && <span>{errors.address.message}</span>}
                    </div>
                  </div>
                </div>
              </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Qo`shimcha rasm yuklash 
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="file"
                      placeholder="Add Product Rating"
                      {...register("images")}
                      style={{padding:4}}  
                    />
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
