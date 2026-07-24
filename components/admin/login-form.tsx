"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
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
  const [submitted, setSubmitted] = React.useState(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  function onSubmit() {
    setSubmitted(true);
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

        {submitted ? (
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-200">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4" />
              <p>
                Form validation works. The next implementation step is checking
                this account against a server-side auth provider.
              </p>
            </div>
          </div>
        ) : null}

        <Button className="h-11 w-full" type="submit">
          Sign in
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
