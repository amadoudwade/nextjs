
'use client'

import { handleUpdateFormProduct } from "@/actions/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Category, Product } from "@/lib/type"
import { Label } from "@radix-ui/react-label"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "sonner"



export const UpdateProductForm = ({category, product}: { category : Category[], product : Product }) => {

    const [state, formAction] = useFormState(handleUpdateFormProduct, undefined)
    const router = useRouter()

    useEffect(() => {
        if (state?.type === 'success') {
            toast.success(state.message)
            router.push('/dashboard/products')
        }

        if (state?.type === 'error') {
            toast.error(state.message)
        }
    }, [state])
   
    
    return (
        <>
            <form action={formAction} className="flex flex-col gap-4 w-96 mx-auto p-5 border rounded-md">
                <Input type="hidden" name="productId" value={product._id}/>
                <div className="flex flex-col gap-2">
                    <Label>Nom Produit</Label>
                    <Input placeholder="Nom" name="name" defaultValue={product.name}  className="w-80" />
                    {
                        state?.errors?.name && (
                                <span className="text-red-500">{ state.errors.name }</span>
                        )
                    }
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Prix Produit</Label>
                    <Input placeholder="Prix" name="prix" defaultValue={product.price} className="w-80" />
                    {
                        state?.errors?.price && (
                                <span className="text-red-500">{ state.errors.price }</span>
                        )
                    }
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Category</Label>
                    <Select name="category" defaultValue={product.category._id} >
                        <SelectTrigger className="w-80">
                            <SelectValue  placeholder={product.category.name} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                category.map((cat:any) => (
                                    <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    {
                        state?.errors?.category && (
                                <span className="text-red-500">{ state.errors.category }</span>
                        )
                    }
                </div>
                <div>
                    <Button type="submit">Ajouter</Button>
                </div>
            </form>
        </>
    )
}
