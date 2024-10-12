import { BounceLoader } from "react-spinners";
import Box from "./Box";

export default function Loading () {
  return ( 
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(10, 0, 21, 0.95)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <BounceLoader color="#953AE7" size={60} />
    </div>
  );
}