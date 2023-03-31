import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react";

const LoadingAnimation = ({isLoading}) => {

    const [display, setDisplay] = useState(true)

    useEffect(() => {
        if (isLoading === false) {
          setDisplay(false);
        } else {
            setDisplay(true);
        }
      }, [isLoading]);
    


   return(
    <AnimatePresence>
        {display ? 
        <motion.div
        key="loading"
        initial={{ opacity: 0, y: -250 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, type: "spring", bounce: 0.1 }}
        exit={{ opacity: 0, y: -250 }}
        >
         <div className="w-full flex justify-center">
            <br/>
            <br/>
            <p className="text-3xl text-primary">Loading</p>
        </div>
        </motion.div>
        : null}
    </AnimatePresence>
   ) 
}

export default LoadingAnimation