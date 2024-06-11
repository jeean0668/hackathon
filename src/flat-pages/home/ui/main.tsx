"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
 
import { Button } from "@/components/shadcn/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"

const FormSchema = z.object({
    
    time: z.string().min(1, {
      message: "time must be at least 1 characters.",
    }),
  })
export function Home() {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          time: "",
        },
      })
  const [pageNum, setPageNum] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pageNum) {
      router.push(`/main?pageNum=${pageNum}`);
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    router.push(`/main?pageNum=${data.time}`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold">해안가 풍향 시각화 자료</h1>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>시간 입력</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                ex) 5분 전 데이터 : "5" 입력 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
</div>

  );
}
