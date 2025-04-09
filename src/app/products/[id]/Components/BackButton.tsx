'use client';

import Button from "@/app/SharedComponents/Button";
import { BackIcon } from "@/app/SharedComponents/Icons";
import { useNavHistoryStore } from "@/domain/store/navHistory";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  const { previousURL } = useNavHistoryStore();

  if (!previousURL) return null;

  return (
    <Button onClick={router.back}>
      <BackIcon width={48} height={48} />
    </Button>
  );
};

export default BackButton;
