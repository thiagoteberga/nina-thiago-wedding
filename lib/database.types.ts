export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      familias: {
        Row: {
          id: string
          nome_familia: string
          token_unico: string
          telefone: string | null
          created_at: string
        }
        Insert: {
          id?: string
          nome_familia: string
          token_unico?: string
          telefone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          nome_familia?: string
          token_unico?: string
          telefone?: string | null
          created_at?: string
        }
      }
      convidados: {
        Row: {
          id: string
          familia_id: string
          nome: string
          confirmado: boolean
          data_confirmacao: string | null
          created_at: string
        }
        Insert: {
          id?: string
          familia_id: string
          nome: string
          confirmado?: boolean
          data_confirmacao?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          familia_id?: string
          nome?: string
          confirmado?: boolean
          data_confirmacao?: string | null
          created_at?: string
        }
      }
    }
  }
}
