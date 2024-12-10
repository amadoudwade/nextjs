'use client'

import { handleCreateFormProduct } from "@/actions/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Category } from "@/lib/type"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { toast } from "sonner"




export const CreateProductForm = ({category}: { category : Category[] }) => {

    const [state, FormAction] = useFormState(handleCreateFormProduct, undefined)
    const [name, setName] = useState("")
    const [prix, setPrix] = useState("")
    const router = useRouter()

    useEffect(()=> {
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
            <form action={FormAction} className="flex flex-col gap-4 w-96 mx-auto p-5 border rounded-md">
                <div className="flex flex-col gap-2">
                    <Label>Nom Produit</Label>
                    <Input placeholder="Nom" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-80" />
                    {
                        state?.errors?.name && (
                                <span className="text-red-500">{ state.errors.name }</span>
                        )
                    }
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Prix Produit</Label>
                    <Input placeholder="Prix" name="prix" value={prix} onChange={(e) => setPrix(e.target.value)} className="w-80" />
                    {
                        state?.errors?.price && (
                                <span className="text-red-500">{ state.errors.price }</span>
                        )
                    }
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Category</Label>
                    <Select name="category">
                        <SelectTrigger className="w-80">
                            <SelectValue placeholder="Choisir la categorie" />
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