import { Skill } from "@/types/skill";
import Image from "next/image";

export default function SkillCard({
    name, iconSrc, details
}: Skill) {

    return (
        <article className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-100 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-md">
            <div className="flex flex-col items-center text-center space-y-4">
                {/* Icon */}
                {iconSrc ? (
                    <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 ring-1 ring-gray-200 dark:ring-gray-600">
                        <Image 
                            src={iconSrc} 
                            alt={`${name} icon`} 
                            width={36} 
                            height={36}
                            className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                    </div>
                ) : (
                    <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 ring-1 ring-gray-200 dark:ring-gray-600">
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            {name.charAt(0)}
                        </span>
                    </div>
                )}
                
                {/* Content */}
                <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                        {details}
                    </p>
                </div>
            </div>
            
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/5 dark:to-purple-400/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </article>
    );
    
}