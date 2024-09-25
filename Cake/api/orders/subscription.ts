import { supabase } from "@/app/lib/supabase";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

export const useExportOrderSubscription = () =>{
const queryClient= useQueryClient();
useEffect(() => {
    const orders = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
            queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === 'orders',});
          },
      )
      .subscribe();
    return () => {
      orders.unsubscribe();
    };
  }, []);

  
}


export const useUpdateOrderSubscription = (id : Float) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const orders = supabase // Assuming supabase is correctly imported or defined
      .channel('custom-filter-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${id}`,
        },
        (payload) => {
          queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'orders',});
        },
      )
      .subscribe();

    return () => {
      orders.unsubscribe();
    };
  }, [id, queryClient]); // Ensure dependencies are correctly listed in useEffect
};

