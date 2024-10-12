import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { List } from "../types";

const useLoadSongUrl = (list: List) => {
  const supabaseClient = useSupabaseClient();

  if (!list) {
    return '';
  }

  const { data: listData } = supabaseClient
  .storage
  .from('list')
  .getPublicUrl(list.image_url);

  return listData.publicUrl;
};

export default useLoadSongUrl;
