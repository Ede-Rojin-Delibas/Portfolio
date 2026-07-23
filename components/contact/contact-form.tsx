"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { defaultLocale, type Locale } from "@/data/i18n";
import { BorderBeam } from "@/components/shared/animation-effects";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const contactFormCopy = {
  en: {
    eyebrow: "Contact form",
    title: "Tell me what you want to build.",
    description:
      "Name, email, subject and message are checked before the form can be submitted.",
    fields: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
    },
    placeholders: {
      name: "Your name",
      email: "you@example.com",
      subject: "Project, collaboration or feedback",
      message: "Tell me what you want to build...",
    },
    idle:
      "Share the project context, goal and the kind of collaboration you have in mind.",
    success:
      "Message format looks good. Email delivery can be connected next.",
    sending: "Sending...",
    submit: "Send message",
    validation: {
      nameMin: "Please enter at least 2 characters.",
      nameMax: "Name should be shorter than 80 characters.",
      email: "Please enter a valid email address.",
      subjectMin: "Please add a short subject.",
      subjectMax: "Subject should be shorter than 120 characters.",
      messageMin: "Please write at least 20 characters.",
      messageMax: "Message should be shorter than 1000 characters.",
    },
  },
  tr: {
    eyebrow: "İletişim formu",
    title: "Ne geliştirmek istediğini anlat.",
    description:
      "Form gönderilmeden önce ad, e-posta, konu ve mesaj alanları doğrulanır.",
    fields: {
      name: "Ad",
      email: "E-posta",
      subject: "Konu",
      message: "Mesaj",
    },
    placeholders: {
      name: "Adın",
      email: "sen@example.com",
      subject: "Proje, iş birliği veya geri bildirim",
      message: "Ne geliştirmek istediğini anlat...",
    },
    idle:
      "Proje bağlamını, hedefini ve düşündüğün iş birliği türünü paylaş.",
    success:
      "Mesaj formatı doğru görünüyor. E-posta gönderimi sonraki adımda bağlanabilir.",
    sending: "Gönderiliyor...",
    submit: "Mesaj gönder",
    validation: {
      nameMin: "Lütfen en az 2 karakter gir.",
      nameMax: "Ad 80 karakterden kısa olmalı.",
      email: "Lütfen geçerli bir e-posta adresi gir.",
      subjectMin: "Lütfen kısa bir konu ekle.",
      subjectMax: "Konu 120 karakterden kısa olmalı.",
      messageMin: "Lütfen en az 20 karakter yaz.",
      messageMax: "Mesaj 1000 karakterden kısa olmalı.",
    },
  },
} as const;

function createContactSchema(copy: (typeof contactFormCopy)[Locale]) {
  return z.object({
    name: z
      .string()
      .min(2, copy.validation.nameMin)
      .max(80, copy.validation.nameMax),
    email: z.string().email(copy.validation.email),
    subject: z
      .string()
      .min(3, copy.validation.subjectMin)
      .max(120, copy.validation.subjectMax),
    message: z
      .string()
      .min(20, copy.validation.messageMin)
      .max(1000, copy.validation.messageMax),
  });
}

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type ContactFormProps = {
  locale?: Locale;
};

export function ContactForm({ locale = defaultLocale }: ContactFormProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const copy = contactFormCopy[locale] ?? contactFormCopy[defaultLocale];
  const contactSchema = React.useMemo(() => createContactSchema(copy), [copy]);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitted(false);

    await new Promise((resolve) => setTimeout(resolve, 500));

    console.info("Validated contact form submission", values);
    setSubmitted(true);
    form.reset(defaultValues);
  }

  return (
    <Reveal>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="contact-glow-surface glass-panel relative overflow-hidden rounded-lg p-5 md:p-6"
          noValidate
        >
          <BorderBeam />
          <div className="mb-6 border-b border-border/70 pb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {copy.eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {copy.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {copy.description}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{copy.fields.name}</FormLabel>
                  <FormControl>
                    <Input placeholder={copy.placeholders.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{copy.fields.email}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={copy.placeholders.email}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>{copy.fields.subject}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={copy.placeholders.subject}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>{copy.fields.message}</FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    placeholder={copy.placeholders.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  aria-live="polite"
                  className="inline-flex items-center gap-2 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-500"
                >
                  <CheckCircle2 className="size-4" />
                  {copy.success}
                </motion.p>
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="text-sm text-muted-foreground"
                >
                  {copy.idle}
                </motion.p>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="pulse-button rounded-md sm:min-w-36"
            >
              {form.formState.isSubmitting ? copy.sending : copy.submit}
              <Send className="size-4" />
            </Button>
          </div>
        </form>
      </Form>
    </Reveal>
  );
}
