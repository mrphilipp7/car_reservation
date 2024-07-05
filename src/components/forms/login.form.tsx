import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { signInWithEmailAndPassword } from "@/supabase/api";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import Spinner from "../spinner";
import { useUserStore, useUserStoreProps } from "@/context/user.store";
import { useState } from "react";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .email(),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  remember: z.boolean().default(false),
});

export interface ILoginFormProps {}

export default function LoginForm(props: ILoginFormProps) {
  const navigate = useNavigate();
  const user: useUserStoreProps = useUserStore();
  const [isValidCredentials, setIsValidCredentials] = useState(true);

  const mutation = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      return signInWithEmailAndPassword({
        email: username,
        password: password,
      });
    },
    onSuccess: (variables) => {
      if (variables.error) {
        toast("An Error occurred", {
          description: formatDate(new Date()),
          action: {
            label: "close",
            onClick: () => console.log(variables),
          },
        });
        setIsValidCredentials(false);
        return;
      } else {
        setIsValidCredentials(true);
        user.setUser(variables.data.user?.id);
        navigate("/app");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "zachphilipp@icloud.com",
      password: "testing",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutation.mutateAsync({
        username: values.username,
        password: values.password,
      });
    } catch (err) {
      console.log(err);
      toast("An Error occurred", {
        description: formatDate(new Date()),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="text-start w-80">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter credintials to access 'app'</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row  items-start space-x-3 space-y-0 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Remember Me </FormLabel>
                    <FormDescription>
                      For a quicker login the next time you visit.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col justify-start items-start">
            <Button type="submit" disabled={mutation.isPending} className="">
              {mutation.isPending ? (
                <>
                  <Spinner />
                  Loading...
                </>
              ) : (
                "Login Account"
              )}
            </Button>
            {isValidCredentials ? null : (
              <div className="flex justify-center items-center w-full pt-2">
                <p className="text-sm text-red-500">
                  Email or Password are incorrect
                </p>
              </div>
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
