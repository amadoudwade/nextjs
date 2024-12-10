"use client"

import { Button } from "@/components/ui/button"
import { Product } from "@/lib/type"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { DeleteProduct, UpdateProduct } from "./button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Product = {
//   name: string
//   price: number
//   category: string
// }


export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nom produit"
  },
  {
    accessorKey: "price",
    header: "Prix produit"
  },
  {
    accessorKey: "category.name",
    header: "Categorie produit"
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({row}) => { 
        const productId = row.original._id
        
      return (
        <div className="flex gap-2"> <UpdateProduct id={productId} /> <DeleteProduct id={productId} /> </div>
      )
    },
  },
]
