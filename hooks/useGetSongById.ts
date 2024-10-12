import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { List } from "../types";

const useSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<List | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from('list')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }
      
      setList(data as List);
      setIsLoading(false);
    }

    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    list
  }), [isLoading, list]);
};

export default useSongById;
