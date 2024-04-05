import prismadb from "@/lib/prismadb";

export const getHouseById = async(houseId: string) => {
    try {
        const house = await prismadb.house.findUnique({
            where: {
                id: houseId
            },
            include: {
                rooms: true,
            }
        })
        if(!house) return null;
        return house;
        
    } catch (error: any) {
      throw new Error(error);
    }
    }
    
    
    