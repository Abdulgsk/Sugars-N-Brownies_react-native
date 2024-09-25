import { supabase } from "@/app/lib/supabase";
import { useMutation} from "@tanstack/react-query";
import { InsertTables } from "@/types";

export const  useInsertOrderItems = () =>{

    return useMutation({
        async mutationFn(items : InsertTables<'order_items'>[]) {
           const {data: newProduct , error } = await supabase.
           from('order_items')
           .insert(items)
           .select();

            
            if(error)                {
                   throw new Error(error.message);
                }
                
                return newProduct;
            },
    });
};