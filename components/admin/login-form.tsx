"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  remember: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [serverMessage, setServerMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setServerMessage(null);

    const response = await fetch("/api/admin/auth/login", {
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
        text: data?.message ?? "Login failed. Please try again.",
      });
      return;
    }

    setServerMessage({
      type: "success",
      text: data?.message ?? "Signed in successfully.",
    });
    router.push("/admin");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="admin@example.com"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="At least 8 characters"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-4 rounded-md border border-border/70 bg-background/50 p-3">
              <div>
                <FormLabel>Remember this device</FormLabel>
                <FormDescription>
                  Later this will control session duration.
                </FormDescription>
              </div>
              <FormControl>
                <input
                  checked={field.value}
                  className="size-4 accent-primary"
                  type="checkbox"
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  ref={field.ref}
                  name={field.name}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {serverMessage ? (
          <div
            className={
              serverMessage.type === "success"
                ? "rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-200"
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
          </div>
        ) : null}

        <Button
          className="h-11 w-full"
          disabled={form.formState.isSubmitting}
          type="submit"
        >
          {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
          <ArrowRight className="size-4" />
        </Button>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <Link className="hover:text-foreground" href="/admin/register">
            Request access
          </Link>
          <span className="inline-flex items-center gap-1">
            <LockKeyhole className="size-3.5 text-primary" />
            Approval required
          </span>
        </div>
      </form>
    </Form>
  );
}
