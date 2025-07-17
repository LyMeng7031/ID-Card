import axios from "@/lib/api/request";
import { CardItem } from "@/types/card-type";

export const createCardRequest = () => {
  const CREATE = async (formData: FormData): Promise<CardItem> => {
    const response = await axios({
      url: "/card/create-card", // ✅ Don't repeat /api/v1 here
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response as unknown as CardItem;
  };

  return {
    CREATE,
  };
};
