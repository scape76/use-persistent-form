import { useCallback, useEffect, useMemo } from "react";

import {
  useForm,
  useWatch,
  type UseFormProps,
  type FieldValues,
  type UseFormReturn,
  type DefaultValues,
} from "react-hook-form";

type StorageKey = string | Array<string>;

type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown
) => Promise<TFieldValues>;

type FormDefaultValues<TFieldValues extends FieldValues = FieldValues> =
  | DefaultValues<TFieldValues>
  | AsyncDefaultValues<TFieldValues>;

type ExcludeOrInclude<T extends Record<string, any>> =
  | { include?: Partial<Record<keyof T, boolean>>; exclude?: never }
  | { include?: never; exclude?: Partial<Record<keyof T, boolean>> };

type UsePersistentFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
> = UseFormProps<TFieldValues, TContext> & {
  storageKey: StorageKey;
  skipStorageValidation?: boolean;
  storage?: Storage;
} & ExcludeOrInclude<TFieldValues>;

type UsePersistentFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TransformedValues extends FieldValues | undefined = undefined,
> = UseFormReturn<TFieldValues, TContext, TransformedValues> & {
  clearData: () => void;
};

function storageKeyToString(storageKey: StorageKey): string {
  if (Array.isArray(storageKey)) return storageKey.join();

  return storageKey;
}

function getFormDefaultValues<TFieldValues extends FieldValues = FieldValues>(
  key: string,
  storage: Storage,
  initValues?: FormDefaultValues<TFieldValues>
): FormDefaultValues<TFieldValues> | undefined {
  const values = storage.getItem(key);

  if (!values) {
    return undefined;
  }

  const parsed = JSON.parse(values);

  // TODO(scape76) maybe we can somehow validate the values here using resolver?
  if (typeof parsed === "object" && !Array.isArray(parsed) && parsed != null) {
    return {
      ...initValues,
      ...parsed,
    };
  }

  return undefined;
}

export function usePersistentForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  storage = typeof window != "undefined" ? sessionStorage : undefined,
  storageKey,
  skipStorageValidation = false,
  exclude,
  include,
  defaultValues: initValues,
  ...props
}: UsePersistentFormProps<TFieldValues, TContext>): UsePersistentFormReturn<
  TFieldValues,
  TContext,
  TTransformedValues
> {
  if (!storage)
    throw new Error(
      "usePersistentForm was called on the server. Server doesn't have any access to the storage object."
    );

  const key = storageKeyToString(storageKey);

  const defaultValues = getFormDefaultValues<TFieldValues>(
    key,
    storage,
    initValues
  );

  const form = useForm<TFieldValues, TContext, TTransformedValues>({
    ...props,
    defaultValues,
  });

  const watchedValues = useWatch({
    control: form.control,
  });

  const { includeKeys, excludeKeys } = useMemo(() => {
    const includeKeys = include ? Object.keys(include) : undefined;

    const excludeKeys = exclude ? Object.keys(exclude) : undefined;

    return { includeKeys, excludeKeys };
  }, [include, exclude]);

  useEffect(() => {
    const filtered = Object.keys(watchedValues).filter((key) => {
      if (includeKeys && includeKeys.includes(key)) {
        return include?.[key];
      } else if (excludeKeys && excludeKeys.includes(key)) {
        return !exclude?.[key];
      }

      return !includeKeys || includeKeys.length === 0;
    });

    const toSave = filtered.reduce(
      (acc, key) => ({
        ...acc,
        [key]: watchedValues[key],
      }),
      {}
    );

    storage.setItem(key, JSON.stringify(toSave));
  }, [watchedValues, includeKeys, excludeKeys]);

  const clearData = useCallback(() => {
    storage.removeItem(key);
  }, [key, storage]);

  return { ...form, clearData };
}
