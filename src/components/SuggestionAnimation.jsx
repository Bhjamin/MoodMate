import { motion, AnimatePresence} from "framer-motion";


const SuggestionAnimation = ({suggestions}) => {


    const suggestionsMap = {
        H: ["joy", "pride", "excitement", "amusement", "relaxed"],
        S: ["lonely", "hopeless", "miserable", "gloomy", "depressed"],
        F: ["worried", "panicked", "nervous", "scared", "stressed"],
        A: ["annoyed", "frustrated", "insulted", "bitter", "vengeful"]
      };
    
      const selectedSuggestions = suggestionsMap[suggestions];
    
      return (
        <div className="m-2 flex flex-col items-center">
          {suggestions ? selectedSuggestions.map((emo) =>

          <AnimatePresence mode="popLayout">
            <motion.div
            className="h-9"
            key={suggestions}
            initial={{ opacity: 0, x: -700 }}
            animate={{ opacity: 1, x: 0}}
            transition={{ duration: 1, type: "spring", bounce: 0.25 }}
            exit={{ opacity: 0, x: 700 }}
            >
              <p className="m-1 text-primary">{emo}</p>
            </motion.div>
          </AnimatePresence>
           
           ) : null}
        </div>
      );
}

export default SuggestionAnimation