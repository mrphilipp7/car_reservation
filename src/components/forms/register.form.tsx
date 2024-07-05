import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
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
import { signUpWithEmailAndPassword } from "@/supabase/api";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import Spinner from "../spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  terms: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "You must accept the terms.",
    }),
});

export interface IRegisterFormProps {}

export default function RegisterForm(props: IRegisterFormProps) {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      return signUpWithEmailAndPassword({
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
        return;
      } else {
        // -- send request for email verification -- //
        setRegistrationSuccess(true);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "zach",
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="text-start w-80">
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Enter your email below to create your account
              </CardDescription>
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
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row  items-start space-x-3 space-y-0 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Accept terms and conditions </FormLabel>
                      <FormDescription>
                        You agree to our Terms of Service and Privacy Policy.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <>
                    <Spinner />
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      {/* Show AlertDialog upon successful registration */}
      <AlertDialog open={registrationSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Registration Successful</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Your account has been successfully created. Check your inbox for a
            verification email.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setRegistrationSuccess(false);
              }}
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
