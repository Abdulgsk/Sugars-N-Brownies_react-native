import { useQuery , useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/app/lib/supabase";



export const useProductList = () => {


    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
          const {data , error } = await supabase.from('products').select('*');
             if(error)
              {
                 throw new Error(error.message);
              }
             return data;
         }
         });

};

export const UseProduct = (id : number) =>{
    return useQuery({
        queryKey: ['products' , id],
        queryFn: async () => {
          const {data , error } = await supabase.
          from('products').select('*').
          eq('id',id).
          single();

          
             if(error)
              {
                 throw new Error(error.message);
              }
             return data;
         }
         });
};

export const  useInsertProduct = () =>{
    const queryClient = useQueryClient(); 

    return useMutation({
        async mutationFn(data :any) {
           const {data: newProduct , error } = await supabase.from('products').insert({
              name: data.name,
              image: data.image,
              price: data.price,
            })
            .single(); 

            
            if(error)
                {
                   throw new Error(error.message);
                }
                
                return newProduct;
            },
            async onSuccess() {
              await queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === 'products',
              });
              },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient(); 

    return useMutation({
        async mutationFn(data :any) {
           const {data: updatedProduct , error } = await supabase.from('products').update({
              name: data.name,
              image: data.image,
              price: data.price,
            })
            .eq('id', data.id)
            .select()
            .single(); 

            
            if(error)
                {
                   throw new Error(error.message);
                }
                
                return updatedProduct;
            },
            async onSuccess(_ ,data) {
              await queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === 'products',
              });
              await queryClient.invalidateQueries(data.id);
            },
          });
};
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(id: number) {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
          throw new Error(error.message);
        }
      },
      async onSuccess() {
        await queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'products',
        });
        },
    });
  };