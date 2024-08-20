A hook for react-hook-form that persists form data to storage

# Examples

- [Shadcn](https://use-persistent-form.vercel.app/)
- [Basic](https://use-persistent-form.vercel.app/?example=basic)

# Installation

```bash
npm install use-persistent-form

yarn add use-persistent-form

pnpm add use-persistent-form

bun add use-persistent-form
```

**OR**

Copy & past the [hook](packages/use-persistent-form/src/index.ts) into your app

# Usage

```tsx
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

function ImageGenerationForm() {
  // accepts all the options from react-hook-form's useForm
  const form = usePersistentForm<ImageGenerationSchemaValues>({
    storageKey: ["image-generation-form"], // key by which data will be stored in storage
    storage: localStorage, // or sessionStorage
    resolver: zodResolver(imageGenerationSchema),
    defaultValues: {
      prompt: "",
      quality: 100,
    },
  });

  ...
}
```
