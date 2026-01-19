import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Palette, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useCreateCategory } from '@/services/mutations/categories';

const createCategorySchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  colorCode: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Código Hex inválido (ex: #FF0000)')
    .optional()
    .or(z.literal('')),
});

type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export function CreateCategoryDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, isPending } = useCreateCategory();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      colorCode: '#2563EB',
    },
  });

  const watchedColor = watch('colorCode');

  const onSubmit = async (data: CreateCategorySchema) => {
    try {
      await mutateAsync({
        name: data.name,
        colorCode: data.colorCode || undefined,
      });
      toast.success('Categoria criada com sucesso!');
      setIsOpen(false);
      reset();
    } catch {
      toast.error('Erro ao criar categoria. Verifique se o nome já existe.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-slate-900 text-white hover:bg-slate-800">
          <Plus className="mr-2 size-4" />
          Nova Categoria
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Nova Categoria</DialogTitle>
          <DialogDescription>
            Crie uma categoria para organizar as postagens do portal.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Categoria</Label>
            <Input
              id="name"
              placeholder="Ex: Tecnologia, Eventos..."
              {...register('name')}
            />
            {errors.name && (
              <span className="text-xs text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Cor de Identificação (Hex)</Label>
            <div className="flex gap-3">
              <div 
                className="size-10 rounded-lg border border-slate-200 shadow-sm shrink-0 transition-colors"
                style={{ backgroundColor: watchedColor || '#fff' }}
              />
              <div className="flex-1 relative">
                <Palette className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input
                  id="color"
                  placeholder="#000000"
                  className="pl-9"
                  maxLength={7}
                  {...register('colorCode')}
                />
              </div>
            </div>
            {errors.colorCode && (
              <span className="text-xs text-red-500">{errors.colorCode.message}</span>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}