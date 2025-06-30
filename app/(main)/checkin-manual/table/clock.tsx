import React, {useEffect} from "react";
import Clock from 'react-simple-clock'

interface ClockDisplayProps {
  formattedTime: string; // e.g., "02:30 PM"
}

const ClockDisplay: React.FC<ClockDisplayProps> = ({ formattedTime })  => {
 

  return <Clock live={true} hourMarkFormat="number" className="clock_check " />
  ;
};

export default ClockDisplay;

