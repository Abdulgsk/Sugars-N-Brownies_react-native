// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"
import { stripe } from "../utils/stripe"

console.log("Hello from Functions!")




try{
    serve(async (req) => {
    
      const { amount } = await req.json();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'inr'
  })


  const res ={
    paymentIntent: paymentIntent.client_secret,
    publishableKey : Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
  }

  return new Response(
    JSON.stringify(res),
    { headers: { "Content-Type": "application/json" } },
  )
})

  }catch(error){
    return new Response(Json.stringify(error),{
      headers:{'Content-Type':application/json},
      status:400
    }),
  }


/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/paymentsheet' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
