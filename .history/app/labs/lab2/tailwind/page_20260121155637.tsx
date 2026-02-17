import "./index.css";
import TailwindSpacing from "./tailwindspacing";
import TailwindTypography from "./tailwindtypography";
import TailwindBackgroundColors from "./tailwindbackgroundcolors";


export default function TailwindLab() {
 return (
   <div className="p-8">
     <h1 className="text-4xl font-bold mb-8">Tailwind CSS</h1>
    <TailwindSpacing />
    <TailwindTypography />
    <TailwindBackgroundColors />
   </div>
 );
}

