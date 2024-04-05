import { getHouseById } from "@/actions/getHouseById";
import AddHouseForm from "@/components/house/AddHouseForm";
import { auth } from "@clerk/nextjs";


interface HousePageProps{
    params: {
        houseId: string
    }
}

const House = async({params}: HousePageProps) => {
    const house = await getHouseById(params.houseId)
   
    const {userId} = auth()

    if(house && house.userId !== userId) return <div>Access denined..</div>

    return ( <div>
        <AddHouseForm house={house} />
    </div> );
}
 
export default House;