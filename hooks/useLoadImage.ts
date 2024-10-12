import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { List } from "../types";

const useLoadImage = (list: List) => {
  const supabaseClient = useSupabaseClient();
  
  if (!list) {
    return null;
  }

  const { data: imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(list.image_url);

  return imageData.publicUrl;
};

export default useLoadImage;
