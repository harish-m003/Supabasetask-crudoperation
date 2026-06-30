import { createClient } from "@supabase/supabase-js";

const supabaseurl = "https://rgimfquysamhanziowjf.supabase.co";
const supabasekey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnaW1mcXV5c2FtaGFuemlvd2pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NDc1MTAsImV4cCI6MjA5ODEyMzUxMH0.M1vrydaWonNdiYSvME2euXk-SKVfqjj3CsTD96b2DWA';


export const supabase = createClient(supabaseurl, supabasekey);
