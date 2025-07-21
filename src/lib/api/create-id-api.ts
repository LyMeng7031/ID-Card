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
  const UPDATE_CARD = async (
    id: string,
    payload: CreateCardType
  ): Promise<ICardResponse> => {
    return await request({
      url: `/card/update-card/${id}`,
      method: "PUT",
      data: payload,
    });
  };

  return {
    UODATE_CARD,
    CREATE,
  };
};
