"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  //form kuralları
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

type FieldErrorProps = {
  message?: string;
};

function FieldError({ message }: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-2 text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema), //react hook form ve zod u bağlar. Form submit edilmeden önce zod kuralları çalışıyor.
    defaultValues,
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitted(false);

    await new Promise((resolve) => setTimeout(resolve, 500));

    console.info("Validated contact form submission", values);
    setSubmitted(true);
    reset(defaultValues);
  }

  return (
    <Reveal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="glass-panel rounded-lg p-5 md:p-6"
        noValidate
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium">Name</span>
            <input
              {...register("name")}
              className={cn(
                "mt-2 h-11 w-full rounded-md border border-border/70 bg-background/70 px-3 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10",
                errors.name && "border-destructive/70 focus:border-destructive",
              )}
              placeholder="Your name"
            />
            <FieldError message={errors.name?.message} />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              {...register("email")}
              type="email"
              className={cn(
                "mt-2 h-11 w-full rounded-md border border-border/70 bg-background/70 px-3 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10",
                errors.email &&
                  "border-destructive/70 focus:border-destructive",
              )}
              placeholder="you@example.com"
            />
            <FieldError message={errors.email?.message} />
          </label>
        </div>

        <label className="mt-4 block">
          <span className="text-sm font-medium">Subject</span>
          <input
            {...register("subject")}
            className={cn(
              "mt-2 h-11 w-full rounded-md border border-border/70 bg-background/70 px-3 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10",
              errors.subject &&
                "border-destructive/70 focus:border-destructive",
            )}
            placeholder="Project, collaboration or feedback"
          />
          <FieldError message={errors.subject?.message} />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-medium">Message</span>
          <textarea
            {...register("message")}
            rows={6}
            className={cn(
              "mt-2 w-full resize-none rounded-md border border-border/70 bg-background/70 px-3 py-3 text-sm leading-6 outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10",
              errors.message &&
                "border-destructive/70 focus:border-destructive",
            )}
            placeholder="Tell me what you want to build..."
          />
          <FieldError message={errors.message?.message} />
        </label>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {submitted ? (
            <p className="inline-flex items-center gap-2 text-sm text-emerald-500">
              <CheckCircle2 className="size-4" />
              Form validated successfully. Email integration can be connected
              next.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Validation runs with React Hook Form and Zod before submission.
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md sm:min-w-36"
          >
            {isSubmitting ? "Sending..." : "Send message"}
            <Send className="size-4" />
          </Button>
        </div>
      </form>
    </Reveal>
  );
}
