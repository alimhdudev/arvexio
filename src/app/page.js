import { Mbs } from "../../public/mbs";
import { Minutes } from "../../public/minutes";
import UploadProvider from '../components/UploadProvider'

export default async function Home() {
  const MEGABYTES = await Mbs();
  const MINUTES = await Minutes();
  return (
    <div>
      <UploadProvider MEGABYTES={MEGABYTES} MINUTES={MINUTES}/>
      
    </div>
  )
}