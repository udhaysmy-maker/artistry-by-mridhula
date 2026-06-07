export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      blogs: {
        Row: {
          content: string;
          cover_image: string | null;
          created_at: string;
          excerpt: string | null;
          id: string;
          published_at: string;
          slug: string;
          title: string;
        };
        Insert: {
          content: string;
          cover_image?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          published_at?: string;
          slug: string;
          title: string;
        };
        Update: {
          content?: string;
          cover_image?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          published_at?: string;
          slug?: string;
          title?: string;
        };
        Relationships: [];
      };
      gallery_items: {
        Row: {
          category: string | null;
          created_at: string;
          id: string;
          image_url: string;
          title: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          id?: string;
          image_url: string;
          title: string;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          id?: string;
          image_url?: string;
          title?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          affiliate_url: string | null;
          category: string | null;
          created_at: string;
          description: string | null;
          id: string;
          image_url: string | null;
          name: string;
        };
        Insert: {
          affiliate_url?: string | null;
          category?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          name: string;
        };
        Update: {
          affiliate_url?: string | null;
          category?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          name?: string;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          created_at: string;
          email: string;
          event_date: string | null;
          id: string;
          message: string;
          name: string;
          phone: string;
          service: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          event_date?: string | null;
          id?: string;
          message: string;
          name: string;
          phone: string;
          service?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          event_date?: string | null;
          id?: string;
          message?: string;
          name?: string;
          phone?: string;
          service?: string | null;
        };
        Relationships: [];
      };
      bookings: {
        Row: {
          created_at: string;
          event_date: string | null;
          event_type: string | null;
          id: string;
          location: string | null;
          name: string;
          notes: string | null;
          phone: string;
          status: string;
        };
        Insert: {
          created_at?: string;
          event_date?: string | null;
          event_type?: string | null;
          id?: string;
          location?: string | null;
          name: string;
          notes?: string | null;
          phone: string;
          status?: string;
        };
        Update: {
          created_at?: string;
          event_date?: string | null;
          event_type?: string | null;
          id?: string;
          location?: string | null;
          name?: string;
          notes?: string | null;
          phone?: string;
          status?: string;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          key: string;
          updated_at: string;
          value: string;
        };
        Insert: {
          key: string;
          updated_at?: string;
          value: string;
        };
        Update: {
          key?: string;
          updated_at?: string;
          value?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertPayload<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
