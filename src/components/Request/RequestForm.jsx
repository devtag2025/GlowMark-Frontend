"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import Image from "next/image";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const RequestForm = () => {
  const { t, lang } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Form Submitted!");
  };

  const RequiredStar = () => <span className="text-red-500 ml-1">*</span>;

  const inputClass =
    "w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-6 py-4 text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:border-purple-500 transition-all";

  const errorClass = "text-red-500 text-sm mt-1 ml-1";

  return (
    <main className="min-h-screen bg-[var(--background)] text-theme">
      <div className="h-24" />

      <article className="max-w-5xl mx-auto px-6 pb-24 pt-6">
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
          <Link
            href={lang === "en" ? "/" : `/${lang}`}
            className="inline-flex items-center gap-2 text-theme-secondary hover:text-theme transition-colors"
          >
            <span className="text-lg">&#8592;</span>
            <span>{t("common.backToHome")}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr,1fr] gap-10 mb-12">
          <div className="relative w-full h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-lg">
            <Image
              src="/request.png"
              alt="Request Free Trial"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
                {t("request_page.title")}{" "}
                <span className="text-gradient-purple">
                  {t("request_page.titleHighlight")}
                </span>
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] backdrop-blur-3xl border border-[var(--border-color)] p-8 md:p-12 rounded-[3rem] shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <p className="text-lg text-theme-muted leading-relaxed">
              {t("request_page.description")}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-bold text-theme-muted ml-1">
                  {t("request_page.formFirstName")}
                  <RequiredStar />
                </label>
                <input
                  type="text"
                  placeholder={t("request_page.formFirstNamePlaceholder")}
                  className={inputClass}
                  {...register("firstName", {
                    required: t("request_page.request"),
                  })}
                />
                {errors.firstName && (
                  <p className={errorClass}>{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-bold text-theme-muted ml-1">
                  {t("request_page.formLastName")}
                  <RequiredStar />
                </label>
                <input
                  type="text"
                  placeholder={t("request_page.formLastNamePlaceholder")}
                  className={inputClass}
                  {...register("lastName", {
                    required: t("request_page.request"),
                  })}
                />
                {errors.lastName && (
                  <p className={errorClass}>{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2 font-bold text-theme-muted ml-1">
                {t("request_page.formPhone")}
                <RequiredStar />
              </label>
              <input
                type="text"
                placeholder={t("request_page.formPhonePlaceholder")}
                className={inputClass}
                {...register("phone", { required: t("request_page.request") })}
              />
              {errors.phone && (
                <p className={errorClass}>{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-bold text-theme-muted ml-1">
                {t("request_page.formEmail")}
                <RequiredStar />
              </label>
              <input
                type="email"
                placeholder={t("request_page.formEmailPlaceholder")}
                className={inputClass}
                {...register("email", { required: t("request_page.request") })}
              />
              {errors.email && (
                <p className={errorClass}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-bold text-theme-muted ml-1">
                {t("request_page.formWebsite")}
                <RequiredStar />
              </label>
              <input
                type="text"
                placeholder={t("request_page.formWebsitePlaceholder")}
                className={inputClass}
                {...register("website", {
                  required: t("request_page.request"),
                })}
              />
              {errors.website && (
                <p className={errorClass}>{errors.website.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-bold text-theme-muted ml-1">
                {t("request_page.formMessage")}
              </label>
              <textarea
                rows="4"
                placeholder={t("request_page.formMessagePlaceholder")}
                className={`${inputClass} resize-none`}
                {...register("message")}
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                id="declaration"
                type="checkbox"
                className="h-6 w-6 rounded border-[var(--input-border)] bg-[var(--input-bg)] text-purple-600 focus:ring-purple-500"
                {...register("declaration", {
                  required: "You must accept this",
                })}
              />
              <label
                htmlFor="declaration"
                className="text-theme-muted leading-relaxed cursor-pointer text-lg"
              >
                {t("request_page.decleration")}
              </label>
            </div>
            {errors.declaration && (
              <p className={errorClass}>{errors.declaration.message}</p>
            )}

            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(107,32,122,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full gradient-purple text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 group transition-all"
            >
              {t("request_page.sendMessage")}
              <Send
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </motion.button>
          </form>
        </div>
      </article>
    </main>
  );
};

export default RequestForm;
