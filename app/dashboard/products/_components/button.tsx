import { handleDeleteFormProduct } from "@/actions/product"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const CreateProduct = () => {
    return(
        <Button> <Link href={'/dashboard/products/create'}>Add Product</Link></Button>
    )
}

export const UpdateProduct = ({ id }: {id: string}) => {
    return(
        <Button variant={"secondary"}> <Link href={`/dashboard/products/${id}`}>Update</Link></Button>
    )
}

export const DeleteProduct = ({ id }: {id: string}) => {

    const formAction = handleDeleteFormProduct.bind(null, id)

    return(
        <>
            <form action ={formAction}>
                <Button type="submit" variant={"destructive"}>Delete</Button>
            </form>
        </>
    )
}