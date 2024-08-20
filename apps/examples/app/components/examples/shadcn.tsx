"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Slider } from "@/components/ui/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import Image from "next/image";

import { toast } from "sonner";
import * as z from "zod";

import { usePersistentForm } from "use-persistent-form";

const ratios = [1, 16 / 9, 4 / 3];

const imageGenerationSchema = z.object({
  prompt: z
    .string()
    .min(1, "Please, provide a prompt")
    .max(600, "Prompt is too long"),
  quality: z.number().min(10).max(100),
  aspectRatio: z.enum(ratios.map(String) as [string, ...string[]]),
});

type ImageGenerationSchemaValues = z.infer<typeof imageGenerationSchema>;

function ShadcnExampleContent() {
  const form = usePersistentForm<ImageGenerationSchemaValues>({
    storageKey: ["image-generation-form"],
    resolver: zodResolver(imageGenerationSchema),
    defaultValues: {
      prompt: "",
      quality: 100,
    },
  });

  const onSubmit = (values: ImageGenerationSchemaValues) => {
    toast.success(`values ${JSON.stringify(values, null, 2)}`);
  };

  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle>Generate an image</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 sm:flex-row">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full sm:max-w-[300px] space-y-4"
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder={`black forest gateau cake spelling out the words "FLUX SCHNELL", tasty, food photography, dynamic shot`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    *Tip: exclude "generate me an image"
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quality ({field.value}%)</FormLabel>
                  <FormControl>
                    <Slider
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      disabled={field.disabled}
                      onValueChange={([value]) => {
                        if (value && value < 10) return;
                        field.onChange(value);
                      }}
                      value={[field.value]}
                      min={10}
                      max={100}
                      step={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aspectRatio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aspect ratio</FormLabel>
                  <div className="flex gap-2">
                    {ratios.map((ratio) => (
                      <div key={ratio} className="flex-1">
                        <AspectRatio
                          ratio={ratio}
                          className={cn("bg-muted rounded-md", {
                            "border-2 border-primary":
                              Number(field.value) == ratio,
                          })}
                          {...field}
                          role="button"
                          onClick={() => {
                            field.onChange(String(ratio));
                          }}
                        >
                          <Image
                            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                            alt={`Aspect ratio ${ratio}`}
                            fill
                            className="rounded-md object-cover"
                          />
                        </AspectRatio>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Generate
            </Button>
          </form>
        </Form>
        <Separator className="sm:hidden" />
        <div className="w-full">
          <AspectRatio ratio={1}>
            <img
              src={"/generate-example.webp"}
              alt="generated image example"
              className={cn("rounded-md blur-sm")}
            />
          </AspectRatio>
        </div>
      </CardContent>
    </Card>
  );
}

export const ShadcnExample = dynamic(
  () => Promise.resolve(ShadcnExampleContent),
  {
    ssr: false,
    suspense: true,
    loading: () => (
      <Card className="mx-auto">
        <CardHeader>
          <CardTitle>Generate an image</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 sm:flex-row">
          <div className="w-full sm:max-w-[300px] space-y-4">
            <div className="space-y-2">
              <Label>Prompt</Label>
              <Textarea
                rows={4}
                placeholder={`black forest gateau cake spelling out the words "FLUX SCHNELL", tasty, food photography, dynamic shot`}
                disabled
              />
              <p className="text-sm text-muted-foreground">
                *Tip: exclude "generate me an image"
              </p>
            </div>
            <div className="space-y-2">
              <Label>Quality (100%)</Label>
              <Slider disabled value={[100]} min={10} max={100} step={1} />
            </div>
            <div className="space-y-2">
              <Label>Aspect ratio</Label>
              <div className="flex gap-2">
                {[
                  { key: "1", ratio: 1 },
                  { key: "16/9", ratio: 16 / 9 },
                  { key: "4/3", ratio: 4 / 3 },
                ].map((item) => (
                  <div key={item.key} className="flex-1">
                    <AspectRatio
                      ratio={item.ratio}
                      className={cn("bg-muted rounded-md")}
                      role="button"
                    >
                      <Image
                        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                        alt={`Aspect ratio ${item.key}`}
                        fill
                        className="rounded-md object-cover"
                      />
                    </AspectRatio>
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full" disabled>
              Generate
            </Button>
          </div>
          <Separator className="sm:hidden" />
          <div className="w-full">
            <AspectRatio ratio={1}>
              <img
                src={"/generate-example.webp"}
                alt="generated image example"
                className={cn("rounded-md blur-sm")}
              />
            </AspectRatio>
          </div>
        </CardContent>
      </Card>
    ),
  }
);
