
import { Skill } from "@/types/skill";
import Image from "next/image";

export default function SkillCard({
    name, iconSrc, details
}: Skill) {

    return (
        <article className="">
            <h3>{name}</h3>
            <p>{details}</p>
            {iconSrc ? (
                <div>
                    <Image src={iconSrc} alt={`${name} icon`} width={50} height={50} />
                </div>
            ): null}
        </article>
    );
    
}