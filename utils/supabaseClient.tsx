
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

export interface LectureLineaire {
	id: any,
	title: string,
	extract: string,
	introduction: string,
	explanation: string,
	videoLink: string,
}
