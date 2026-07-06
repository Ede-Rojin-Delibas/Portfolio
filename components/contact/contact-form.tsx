"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter at least 2 characters.")
    .max(80, "Name should be shorter than 80 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z
    .string()
    .min(3, "Please add a short subject.")
    .max(120, "Subject should be shorter than 120 characters."),
  message: z
    .string()
    .min(20, "Please write at least 20 characters.")
    .max(1000, "Message should be shorter than 1000 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
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
              Contact form
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Tell me what you want to build.
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Name, email, subject and message are checked before the form can
              be submitted.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
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
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project, collaboration or feedback"
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
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    placeholder="Tell me what you want to build..."
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
                  Message format looks good. Email delivery can be connected
                  next.
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
                  Share the project context, goal and the kind of collaboration
                  you have in mind.
                </motion.p>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="pulse-button rounded-md sm:min-w-36"
            >
              {form.formState.isSubmitting ? "Sending..." : "Send message"}
              <Send className="size-4" />
            </Button>
          </div>
        </form>
      </Form>
    </Reveal>
  );
}
