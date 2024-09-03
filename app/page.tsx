"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {useState} from "react";

const userLoginSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [success, setSuccess] = useState(false);

  async function onSubmit(data: z.infer<typeof userLoginSchema>) {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const resData = (await res.json()) as { success: boolean; msg: string };

    if (resData.success) {
      setSuccess(true)
      form.reset();
    } else {
      setSuccess(false)
      toast.error(resData.msg);
    }
  }

  return (
    <main className="min-h-dvh grid place-items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-lg flex flex-col space-y-5 bg-card p-10 border rounded-md"
        >
          <h1>Login</h1>
          {
            success && (
                <h3>Login successful</h3>
              )
          }

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="email address"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button size="default" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </main>
  );
}
