import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

export const saveOrder = async (orderData: any) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase URL or Key not found. Order would be: ', orderData);
    // Mimic success for demo if keys aren't set yet
    return { data: { id: 'demo-id-' + Date.now() }, error: null };
  }

  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select();

  return { data, error };
};
