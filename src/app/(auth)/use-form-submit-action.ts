import type { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface Props {
  formAction: (formData: FormData) => Promise<{ message: string } | undefined>;
  pushTo: string;
  successMessage: string;
}

export default function useFormSubmitAction({ formAction, pushTo, successMessage }: Props) {
  const router = useRouter();

  const { mutate: server_auth_action, isPending: pending } = useMutation({
    mutationFn: formAction,
    onSuccess: (data) => {
      if (data) {
        toast.success(data.message, { duration: 3000 });
        router.replace(pushTo);
      }
    },
    onError: (error) => {
      toast.error(error.message, { duration: 15000 });
    }
  });

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    server_auth_action(formData);
  };

  return {
    onSubmit,
    pending
  };
}
