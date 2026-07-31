"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/admin/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your password."),
    requestedRole: z.enum(["admin", "editor", "viewer"]),
    accessReason: z
      .string()
      .min(12, "Explain why this account needs CMS access."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [serverMessage, setServerMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      requestedRole: "editor",
      accessReason: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setServerMessage(null);

    const response = await fetch("/api/admin/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    if (!response.ok) {
      setServerMessage({
        type: "error",
        text: data?.message ?? "Registration failed. Please try again.",
      });
      return;
    }

    setServerMessage({
      type: "success",
      text:
        data?.message ??
        "Access request created. A Super Admin must approve it before login.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" autoComplete="name" {...field} />
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
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Repeat password"
                    autoComplete="new-password"
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
          name="requestedRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requested role</FormLabel>
              <FormControl>
                <select
                  className="h-11 w-full rounded-md border border-border/70 bg-background/70 px-3 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
                  {...field}
                >
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                  <option value="admin">Admin</option>
                </select>
              </FormControl>
              <FormDescription>
                Super Admin is never self-selected. It must be assigned manually.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accessReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Access reason</FormLabel>
              <FormControl>
                <textarea
                  className="min-h-28 w-full rounded-md border border-border/70 bg-background/70 px-3 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
                  placeholder="Explain which content or workflow you need to manage."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {serverMessage ? (
          <div
            className={
              serverMessage.type === "success"
                ? "rounded-md border border-cyan-500/30 bg-cyan-500/10 p-3 text-sm text-cyan-800 dark:text-cyan-100"
                : "rounded-md border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-200"
            }
          >
            <div className="flex items-start gap-2">
              {serverMessage.type === "success" ? (
                <CheckCircle2 className="mt-0.5 size-4" />
              ) : (
                <AlertCircle className="mt-0.5 size-4" />
              )}
              <p>{serverMessage.text}</p>
            </div>
            {serverMessage.type === "success" ? (
              <Button asChild className="mt-3 h-10" variant="outline">
                <Link href="/admin/login">
                  Continue to login
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : null}
          </div>
        ) : null}

        <Button
          className="h-11 w-full"
          disabled={form.formState.isSubmitting}
          type="submit"
        >
          {form.formState.isSubmitting
            ? "Creating request..."
            : "Create access request"}
          <ArrowRight className="size-4" />
        </Button>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <Link className="hover:text-foreground" href="/admin/login">
            Already have access?
          </Link>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-primary" />
            Pending until approved
          </span>
        </div>
      </form>
    </Form>
  );
}
