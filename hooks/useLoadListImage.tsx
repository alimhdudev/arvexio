import { List } from "../types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { supabase } from "@supabase/auth-ui-shared";

const useLoadListImage = (list: List)=> {
    const supabaseClient = useSupabaseClient();

    if(!list) {
        return null;
    }
     
    const { data: imageData } = supabaseClient
     .storage
     .from('images')
     .getPublicUrl(list.image_url)

    return imageData.publicUrl;
}

export default useLoadListImage;