import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Stores } from "../types";

const useLoadStoreImage = (store: Stores) => {
  const supabaseClient = useSupabaseClient();
  
  if (!store) {
    return null;
  }

  const { data: imageData } = supabaseClient
    .storage
    .from('stores')
    .getPublicUrl(store.image_url);

  return imageData.publicUrl;
};

export default useLoadStoreImage;
