import { type FormEvent, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface Props {
  formAction: (data: FormData) => Promise<{ message: string }>;
  pushTo: string;
  successMessage: string;
}

export default function useFormSubmitAction({ formAction, pushTo, successMessage }: Props) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    startTransition(async () => {
      const submitAction = await formAction(formData);
      if (submitAction.message !== "success") {
        toast.error(submitAction.message, { duration: 15000 });
        return;
      }

      toast.success(successMessage, { duration: 3000 });
      router.replace(pushTo);
    });
  };

  return {
    onSubmit,
    pending
  };
}
