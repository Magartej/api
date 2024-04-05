'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Checkbox } from "../ui/checkbox"

import { useState } from "react"
import { UploadButton } from "../uploadthing"
import { House, Room } from "@prisma/client"
import { useToast } from "../ui/use-toast"
import Image from "next/image"
import { Loader, Loader2, XCircle } from "lucide-react"
import { Button } from "../ui/button"
import axios from 'axios';

interface AddHouseFormProps{
    house: HouseWithRooms | null
}

export type HouseWithRooms = House & {
    rooms: Room[]
}

const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 3 characters.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    image: z.string().min(1, {
      message: "Image is required.",
    }),
    provience: z.string().min(1, {
      message: "Country is required.",
    }),
    district: z.string().optional(),
    locallevel: z.string().optional(),
    localarea: z.string().optional(),
    locationdescription: z.string().min(10, {
        message: "Description must be at least 10 characters.",
      }),
      freewifi: z.boolean().optional(),
      laundry: z.boolean().optional(),
      freeparking: z.boolean().optional(),
      watersupply: z.boolean().optional(),
      electricity: z.boolean().optional(),
  })

const AddHouseForm = ({house}: AddHouseFormProps) => {

    const [image, setImage] = useState<string | undefined>(house?.image)
    const [imageIsDeleting, setImageIsDeleting] = useState(false)

    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            image: '',
            provience: '',
            district: '',
            locallevel: '',
            localarea: '',
            locationdescription: '',
            freewifi: false,
            laundry: false,
            freeparking: false,
            watersupply: false,
            electricity: false,
        },
      })
      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }

      const handlImageDelete = (image: string) =>{
        setImageIsDeleting(true)
        const imagekey = image.substring(image.lastIndexOf('/') )

        axios.post('/api/uploadthing/delete', {imagekey}).then((res) =>{
          if(res.data.success){
            setImage('');
            toast({
              variant: 'success',
              description: 'Image removed'
            })
          }
        }).catch(() =>{
          toast({
            variant: 'destructive',
            description: 'Something went wrong'
          })
        }).finally(() => {
          setImageIsDeleting(false)
        })
      }

    return (  <div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-lg font-semibold">Describe your room</h3>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-6">
                <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Title *</FormLabel>
              <FormDescription>
                Provide your room name
              </FormDescription>
              <FormControl>
                <Input placeholder="KTM" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Description *</FormLabel>
              <FormDescription>
                Provide detail description fo your room 
              </FormDescription>
              <FormControl>
                <Textarea placeholder="It is the best room you can rent" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
            <FormLabel>Choose Amenities</FormLabel>
            <FormDescription>Choose Amenities popular in your room</FormDescription>
            <div className="grid grid-cols-2 gap-4 mt-2">
                <FormField 
                control={form.control}
                name="freewifi"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-4 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value}
                      onCheckedChange={field.onChange}/>
                    </FormControl>
                    <FormLabel>FreeWiFi</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name="laundry"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-4 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value}
                      onCheckedChange={field.onChange}/>
                    </FormControl>
                    <FormLabel>Laundry</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name="freeparking"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-4 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value}
                      onCheckedChange={field.onChange}/>
                    </FormControl>
                    <FormLabel>Freeparking</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name="watersupply"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-4 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value}
                      onCheckedChange={field.onChange}/>
                    </FormControl>
                    <FormLabel>Watersupply</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name="electricity"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-4 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value}
                      onCheckedChange={field.onChange}/>
                    </FormControl>
                    <FormLabel>Electricity</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
                />
            </div>
        </div>
        <FormField
        control={form.control}
        name="image"
        render={({field}) => (
            <FormItem className="felx flex-col space-y-">
                <FormLabel>Upload an Image *</FormLabel>
                <FormDescription>Choose an image that will show-case your room nicely</FormDescription>
                <FormControl>
                    {image? <>
                    <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-">
                      <Image fill src={image} alt='House Image' className='boject-contain'/>
                      <Button onClick={() => handlImageDelete(image)} type="button" size='icon' variant='ghost' 
                      className="absolute right-[-12px] top-0">
                        {imageIsDeleting ? <Loader2 /> : <XCircle />}
                      </Button>
                    </div>
                    </>: <>
                    <div className="flex flex-col items-center max-w-[400px] p-12  
                    border-2 border-dashed border-primary/50 rounded mt-5">
                    <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setImage(res[0].url)
          toast({
            variant: 'success',
            description: 'Upload Completed'
          })
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast({
            variant: 'destructive',
            description: `ERROR! ${error.message}`
          })
        }}
      />
                    </div>
                    </>}
                </FormControl>
            </FormItem>
        )}/>
                </div>
                <div className="flex-1 flex flex-col gap-6">
                  <div>
                    Part
                  </div>
                </div>
            </div>
        
        </form>
        </Form>
    </div>);
}
 
export default AddHouseForm;