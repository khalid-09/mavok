"use client";

import {
  newsletterSchema,
  NewsletterSchema,
} from "@/lib/validation/newsletter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

const NewsletterForm = () => {
  const form = useForm<NewsletterSchema>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
      receiveUpdates: false,
    },
  });

  const onSubmit = (data: NewsletterSchema) => {
    console.log(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold uppercase -tracking-1%">
                Newsletter
              </FormLabel>
              <FormControl>
                <Input
                  className="border-primaryBorder border px-4 py-2"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="h-10 w-full rounded-[8px] bg-primaryGreen px-4 py-2 text-white"
          type="submit"
        >
          Subscribe
        </Button>
        <FormField
          control={form.control}
          name="receiveUpdates"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  className="border-primaryBorder border"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-primaryLight">
                  You agree to receive newsletters and marketing emails from
                  MAVOK.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default NewsletterForm;
