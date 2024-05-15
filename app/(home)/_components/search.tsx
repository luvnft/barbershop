"use client"
import { Button } from "@/app/_components/ui/button"
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { SearchIcon } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    search: z.string({
        required_error: 'Required field'
    }).trim().min(1, "Required field").max(50),
})
interface SearchProps {
    defaultValues?: z.infer<typeof formSchema>
}
const Search = ({defaultValues}:SearchProps) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })
    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        router.push(`/barbershops?search=${data.search}`)
    }
    return (
        <div className="flex items-center w-full mb-2">
            <Form {...form}>
                <form className="flex w-full gap-3 items-center" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel />
                                <FormControl>
                                    <Input className="" placeholder="Search for a hair stylist..." {...field} />

                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button>
                        <SearchIcon size={18} />
                    </Button>
                </form>
            </Form>

        </div>
    )
}
export default Search