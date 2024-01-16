"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { QuestionsSchema } from "@/lib/validations";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { createQuestion } from "@/lib/actions/Question.action";

const type: string = "create";

const Question = () => {
  const editorRef = useRef(null);
  const [isSubmitting, setisSubmitting] = useState(false);

  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    setisSubmitting(true);
    try {
      // make an async call to our api, to create a question
      // it should contain all form data.
      await createQuestion({ values });

      // navigate to home
    } catch (error) {
    } finally {
      setisSubmitting(false);
    }
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (field.value.length === 3) {
          return form.setError("tags", {
            type: "required",
            message: "You've reached the limit of 3 tags.",
          });
        }

        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
    form.clearErrors("tags");
  };

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div className="mt-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-10"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Question Title<span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Be specific and imagine you&apos;re asking a question to
                    another person.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Detailed explanation of your problem
                    <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                      onInit={(evt, editor) => {
                        // @ts-ignore
                        editorRef.current = editor;
                      }}
                      initialValue=""
                      init={{
                        height: 350,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "codesample",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                        ],
                        toolbar:
                          "codesample | " +
                          "undo redo |" +
                          "bold italic forecolor | alignleft aligncenter alignright alignjustify |" +
                          "bullist numlist",
                        content_style:
                          "body { font-family:Inter; font-size:16px }",
                      }}
                      onBlur={field.onBlur}
                      onEditorChange={(content) => field.onChange(content)}
                    />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Introduce the problem and explain. Minimum 100 characters.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Tags<span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <>
                      <Input
                        className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                        placeholder="Add tags..."
                        onKeyDown={(e) => handleInputKeyDown(e, field)}
                      />

                      {field.value.length > 0 && (
                        <div className="mt-2.5 flex gap-2.5">
                          {field.value.map((item) => (
                            <Badge
                              key={item}
                              className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                              onClick={() => {
                                handleTagRemove(item, field);
                              }}
                            >
                              <span>{item}</span>
                              <Image
                                src="/assets/icons/close.svg"
                                alt="close-icon"
                                width={12}
                                height={12}
                                className="dar:invert cursor-pointer object-contain invert-0"
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </>
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Add up to 3 tags to describe what your question is about.
                    Start typing to see suggestions.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="primary-gradient w-fit  !text-light-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>{type === "edit" ? "Editing..." : "Posting..."}</>
              ) : (
                <>{type === "edit" ? "Edit Question" : "Post Question"}</>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Question;
