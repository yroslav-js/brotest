import {NextPage} from "next";
import PastRound from "@/components/screens/pastRound/PastRound";

const PastRoundPage: NextPage<{ params: { id: string } }> = ({params}) => <PastRound id={params.id}/>

export default PastRoundPage;