import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  ChevronLeft, 
  Image as ImageIcon, 
  Loader2, 
  Save,
  Send,
  Settings2
} from 'lucide-react';
import { toast } from 'sonner';

import { RichTextEditor } from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from '@/services/queries/category';
import { useAuth } from '@/hooks/useAuth';

const createPostSchema = z.object({
  title: z.string().min(5, 'O título deve ter pelo menos 5 caracteres'),
  content: z.string().min(20, 'O conteúdo é muito curto'),
  categoryId: z.string().min(1, 'Selecione uma categoria'),
  featuredImageUrl: z.string().url().optional().or(z.literal('')),
});

type CreatePostSchema = z.infer<typeof createPostSchema>;

export function NewPost() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: categories } = useCategories();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: '',
      title: '',
    }
  });

  const onSubmit = async (data: CreatePostSchema, status: 'DRAFT' | 'PUBLISHED' | 'PENDING') => {
    setIsSubmitting(true);
    try {
      console.log("Enviando Payload:", { ...data, status });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(status === 'DRAFT' ? 'Rascunho salvo!' : 'Enviado para aprovação!');
      navigate({ to: '/posts' });
    } catch (error) {
      toast.error('Erro ao salvar postagem.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <form className="max-w-4xl mx-auto space-y-8 pb-20">
      
      <div className="flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10 py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate({ to: '/posts' })}
          className="text-slate-500"
        >
          <ChevronLeft className="mr-1 size-4" />
          Voltar
        </Button>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" title="Configurações da Postagem">
                <Settings2 className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Configurações da Postagem</SheetTitle>
                <SheetDescription>
                  Defina a categoria e a imagem de destaque.
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 py-6">
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Controller
                    control={control}
                    name="categoryId"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full" style={{ backgroundColor: cat.colorCode || '#ccc' }} />
                                {cat.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.categoryId && <span className="text-xs text-red-500">{errors.categoryId.message}</span>}
                </div>

                <div className="space-y-2">
                  <Label>URL da Imagem de Capa</Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <Input {...register('featuredImageUrl')} placeholder="https://..." className="pl-9" />
                  </div>
                  {watch('featuredImageUrl') && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 aspect-video">
                       <img src={watch('featuredImageUrl')} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button 
            type="button" 
            variant="secondary"
            onClick={handleSubmit((data) => onSubmit(data, 'DRAFT'))}
            disabled={isSubmitting}
          >
            <Save className="mr-2 size-4" />
            Salvar Rascunho
          </Button>

          <Button 
            type="button"
            className={isAdmin ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
            onClick={handleSubmit((data) => onSubmit(data, isAdmin ? 'PUBLISHED' : 'PENDING'))}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
               <Loader2 className="animate-spin size-4" />
            ) : (
               <Send className="mr-2 size-4" />
            )}
            {isAdmin ? 'Publicar Agora' : 'Enviar para Revisão'}
          </Button>
        </div>
      </div>

      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">        
        <div className="space-y-2">
            <Input
              {...register('title')}
              placeholder="Seu Título Impactante"
              className="text-4xl font-serif font-bold border-none shadow-none px-0 focus-visible:ring-0 placeholder:text-slate-300 h-auto py-2"
            />
             {errors.title && <span className="text-sm text-red-500">{errors.title.message}</span>}
        </div>
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <RichTextEditor 
              content={field.value} 
              onChange={field.onChange} 
            />
          )}
        />
        {errors.content && <span className="text-sm text-red-500">{errors.content.message}</span>}

      </div>
    </form>
  );
}