// import { GraduationCap, MapPin, Calendar, Briefcase } from "lucide-react"
// import { education, workExperience } from "../data/index.js"

// export default function Education() {
//   return (
//     <div id="Education" className="min-h-screen bg-background py-8 md:py-16 px-4">
//       <div className="max-w-6xl mx-auto space-y-12 md:space-y-24">
//         {/* Education Section */}
//         <div>
//           {/* Header */}
//           <div className="flex items-center justify-center gap-3 mb-8 md:mb-16">
//             <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-full flex items-center justify-center">
//               <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
//             </div>
//             <h1 className="text-2xl md:text-3xl font-bold text-white">Education</h1>
//           </div>

//           {/* Timeline */}
//           <div className="relative">
//             {/* Timeline line - hidden on mobile, visible on desktop */}
//             <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-emerald-400"></div>
            
//             {/* Mobile timeline line - left aligned */}
//             <div className="block md:hidden absolute left-6 top-0 h-full w-0.5 bg-emerald-400"></div>

//             {/* Timeline dots - desktop only */}
//             <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-8 w-3 h-3 bg-emerald-400 rounded-full"></div>
//             <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full"></div>
//             <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bottom-8 w-3 h-3 bg-emerald-400 rounded-full"></div>

//             <div className="space-y-8 md:space-y-24">
//               {education.map((edu, index) => (
//                 <div key={edu.id} className="flex items-start md:items-center">
//                   {/* Mobile Timeline Dot */}
//                   <div className="block md:hidden w-3 h-3 bg-emerald-400 rounded-full mt-6 mr-6 flex-shrink-0"></div>
                  
//                   {/* Desktop Layout */}
//                   <div className="hidden md:flex md:items-center w-full">
//                     {index % 2 === 0 ? (
//                       // Left side for even indices
//                       <>
//                         <div className="w-1/2 pr-8">
//                           <div className="relative bg-slate-800 rounded-lg p-6 border-2 border-transparent bg-gradient-to-r from-emerald-400 via-yellow-400 to-orange-400 bg-clip-border">
//                             <div className="bg-slate-800 rounded-md p-6 -m-0.5">
//                               {/* Date badge */}
//                               <div className="flex items-center gap-2 bg-slate-700 rounded-md px-3 py-1.5 mb-4 w-fit">
//                                 <Calendar className="w-4 h-4 text-gray-400" />
//                                 <span className="text-sm text-gray-300">{edu.duration}</span>
//                               </div>

//                               <h3 className="text-xl font-bold text-white mb-3">{edu.degree}</h3>

//                               <p className="text-gray-400 mb-4">{edu.institution}</p>

//                               <div className="flex items-center gap-2 text-gray-400 mb-4">
//                                 <MapPin className="w-4 h-4" />
//                                 <span className="text-sm">{edu.location}</span>
//                               </div>

//                               <p className="text-white font-medium">
//                                 {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="w-1/2"></div>
//                       </>
//                     ) : (
//                       // Right side for odd indices
//                       <>
//                         <div className="w-1/2"></div>
//                         <div className="w-1/2 pl-8">
//                           <div className="relative bg-slate-800 rounded-lg p-6 border-2 border-transparent bg-gradient-to-r from-emerald-400 via-yellow-400 to-orange-400 bg-clip-border">
//                             <div className="bg-slate-800 rounded-md p-6 -m-0.5">
//                               {/* Date badge */}
//                               <div className="flex items-center gap-2 bg-slate-700 rounded-md px-3 py-1.5 mb-4 w-fit">
//                                 <Calendar className="w-4 h-4 text-gray-400" />
//                                 <span className="text-sm text-gray-300">{edu.duration}</span>
//                               </div>

//                               <h3 className="text-xl font-bold text-white mb-3">{edu.degree}</h3>

//                               <p className="text-gray-400 mb-4">{edu.institution}</p>

//                               <div className="flex items-center gap-2 text-gray-400 mb-4">
//                                 <MapPin className="w-4 h-4" />
//                                 <span className="text-sm">{edu.location}</span>
//                               </div>

//                               <p className="text-white font-medium">
//                                 {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </>
//                     )}
//                   </div>

//                   {/* Mobile Layout */}
//                   <div className="block md:hidden w-full">
//                     <div className="relative bg-slate-800 rounded-lg p-4 border-2 border-transparent bg-gradient-to-r from-emerald-400 via-yellow-400 to-orange-400 bg-clip-border">
//                       <div className="bg-slate-800 rounded-md p-4 -m-0.5">
//                         {/* Date badge */}
//                         <div className="flex items-center gap-2 bg-slate-700 rounded-md px-3 py-1.5 mb-3 w-fit">
//                           <Calendar className="w-4 h-4 text-gray-400" />
//                           <span className="text-xs text-gray-300">{edu.duration}</span>
//                         </div>

//                         <h3 className="text-lg font-bold text-white mb-2">{edu.degree}</h3>

//                         <p className="text-gray-400 mb-3 text-sm">{edu.institution}</p>

//                         <div className="flex items-center gap-2 text-gray-400 mb-3">
//                           <MapPin className="w-3 h-3" />
//                           <span className="text-xs">{edu.location}</span>
//                         </div>

//                         <p className="text-white font-medium text-sm">
//                           {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Work Experience Section */}
//         <div>
//           {/* Header */}
//           <div className="flex items-center justify-center gap-3 mb-8 md:mb-16">
//             <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-full flex items-center justify-center">
//               <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
//             </div>
//             <h1 className="text-2xl md:text-3xl font-bold text-white">Work Experience</h1>
//           </div>

//           {/* Timeline */}
//           <div className="relative">
//             {/* Timeline line - hidden on mobile, visible on desktop */}
//             <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-blue-400"></div>
            
//             {/* Mobile timeline line - left aligned */}
//             <div className="block md:hidden absolute left-6 top-0 h-full w-0.5 bg-blue-400"></div>

//             {/* Timeline dots - desktop only */}
//             <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-8 w-3 h-3 bg-blue-400 rounded-full"></div>
//             <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bottom-8 w-3 h-3 bg-blue-400 rounded-full"></div>

//             <div className="space-y-8 md:space-y-24">
//               {workExperience.map((work, index) => (
//                 <div key={work.id} className="flex items-start md:items-center">
//                   {/* Mobile Timeline Dot */}
//                   <div className="block md:hidden w-3 h-3 bg-blue-400 rounded-full mt-6 mr-6 flex-shrink-0"></div>
                  
//                   {/* Desktop Layout */}
//                   <div className="hidden md:flex md:items-center w-full">
//                     {index % 2 === 0 ? (
//                       // Left side for even indices
//                       <>
//                         <div className="w-1/2 pr-8">
//                           <div className="relative bg-slate-800 rounded-lg p-6 border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-border">
//                             <div className="bg-slate-800 rounded-md p-6 -m-0.5">
//                               {/* Date badge */}
//                               <div className="flex items-center gap-2 bg-slate-700 rounded-md px-3 py-1.5 mb-4 w-fit">
//                                 <Calendar className="w-4 h-4 text-gray-400" />
//                                 <span className="text-sm text-gray-300">{work.duration}</span>
//                               </div>

//                               <h3 className="text-xl font-bold text-white mb-2">{work.position}</h3>
//                               <p className="text-blue-400 font-medium mb-4">{work.company}</p>

//                               <div className="flex items-center gap-2 text-gray-400 mb-4">
//                                 <MapPin className="w-4 h-4" />
//                                 <span className="text-sm">{work.location}</span>
//                               </div>

//                               <p className="text-gray-300 mb-4 text-sm leading-relaxed">{work.description}</p>

//                               <div className="flex flex-wrap gap-2">
//                                 {work.skills.map((skill, skillIndex) => (
//                                   <span key={skillIndex} className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs">
//                                     {skill}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="w-1/2"></div>
//                       </>
//                     ) : (
//                       // Right side for odd indices
//                       <>
//                         <div className="w-1/2"></div>
//                         <div className="w-1/2 pl-8">
//                           <div className="relative bg-slate-800 rounded-lg p-6 border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-border">
//                             <div className="bg-slate-800 rounded-md p-6 -m-0.5">
//                               {/* Date badge */}
//                               <div className="flex items-center gap-2 bg-slate-700 rounded-md px-3 py-1.5 mb-4 w-fit">
//                                 <Calendar className="w-4 h-4 text-gray-400" />
//                                 <span className="text-sm text-gray-300">{work.duration}</span>
//                               </div>

//                               <h3 className="text-xl font-bold text-white mb-2">{work.position}</h3>
//                               <p className="text-blue-400 font-medium mb-4">{work.company}</p>

//                               <div className="flex items-center gap-2 text-gray-400 mb-4">
//                                 <MapPin className="w-4 h-4" />
//                                 <span className="text-sm">{work.location}</span>
//                               </div>

//                               <p className="text-gray-300 mb-4 text-sm leading-relaxed">{work.description}</p>

//                               <div className="flex flex-wrap gap-2">
//                                 {work.skills.map((skill, skillIndex) => (
//                                   <span key={skillIndex} className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs">
//                                     {skill}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </>
//                     )}
//                   </div>

//                   {/* Mobile Layout */}
//                   <div className="block md:hidden w-full">
//                     <div className="relative bg-slate-800 rounded-lg p-4 border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-border">
//                       <div className="bg-slate-800 rounded-md p-4 -m-0.5">
//                         {/* Date badge */}
//                         <div className="flex items-center gap-2 bg-slate-700 rounded-md px-3 py-1.5 mb-3 w-fit">
//                           <Calendar className="w-4 h-4 text-gray-400" />
//                           <span className="text-xs text-gray-300">{work.duration}</span>
//                         </div>

//                         <h3 className="text-lg font-bold text-white mb-2">{work.position}</h3>
//                         <p className="text-blue-400 font-medium mb-3 text-sm">{work.company}</p>

//                         <div className="flex items-center gap-2 text-gray-400 mb-3">
//                           <MapPin className="w-3 h-3" />
//                           <span className="text-xs">{work.location}</span>
//                         </div>

//                         <p className="text-gray-300 mb-3 text-xs leading-relaxed">{work.description}</p>

//                         <div className="flex flex-wrap gap-1">
//                           {work.skills.map((skill, skillIndex) => (
//                             <span key={skillIndex} className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs">
//                               {skill}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }











"use client"
import { GraduationCap, MapPin, Calendar, Briefcase } from "lucide-react"
import { education, workExperience } from "../data/index.js"

export default function Education() {
  return (
    <div id="Education"  className="min-h-screen bg-background py-8 md:py-16 px-4">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.7s ease-out forwards;
        }

        .animate-pulse-hover:hover {
          animation: pulse 0.3s ease-in-out;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        .gradient-border {
          background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
          padding: 2px;
          border-radius: 1rem;
        }

        .gradient-border-blue {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          padding: 2px;
          border-radius: 1rem;
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-12 md:space-y-24">
        {/* Education Section */}
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-8 md:mb-16 animate-scale-in delay-200">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-full flex items-center justify-center animate-pulse-hover">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Education</h1>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Desktop Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-emerald-400"></div>
            
            {/* Mobile Timeline line */}
            <div className="block md:hidden absolute left-6 top-0 h-full w-0.5 bg-emerald-400"></div>

            {/* Desktop Timeline dots */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-8 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bottom-8 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>

            <div className="space-y-8 md:space-y-24">
              {education.map((edu, index) => (
                <div key={edu.id} className="flex items-start md:items-center">
                  {/* Mobile Timeline Dot */}
                  <div className="block md:hidden w-3 h-3 bg-emerald-400 rounded-full mt-6 mr-6 flex-shrink-0 animate-pulse"></div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden md:flex md:items-center w-full">
                    {index % 2 === 0 ? (
                      <>
                        <div className="w-1/2 pr-8 animate-slide-in-left" style={{animationDelay: `${0.3 + index * 0.2}s`}}>
                          <div className="gradient-border card-hover">
                            <div className="bg-slate-800 rounded-md p-6">
                              <div className="flex items-center gap-2 bg-slate-700 rounded-md px-3 py-1.5 mb-4 w-fit">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-300">{edu.duration}</span>
                              </div>
                              <h3 className="text-xl font-bold text-white mb-3">{edu.degree}</h3>
                              <p className="text-gray-400 mb-4">{edu.institution}</p>
                              <div className="flex items-center gap-2 text-gray-400 mb-4">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{edu.location}</span>
                              </div>
                              <p className="text-white font-medium">
                                {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/2"></div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2"></div>
                        <div className="w-1/2 pl-8 animate-slide-in-right" style={{animationDelay: `${0.3 + index * 0.2}s`}}>
                          <div className="gradient-border card-hover">
                            <div className="bg-slate-800 rounded-md p-6">
                              <div className="flex items-center gap-2 bg-slate-700 rounded-md px-3 py-1.5 mb-4 w-fit">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-300">{edu.duration}</span>
                              </div>
                              <h3 className="text-xl font-bold text-white mb-3">{edu.degree}</h3>
                              <p className="text-gray-400 mb-4">{edu.institution}</p>
                              <div className="flex items-center gap-2 text-gray-400 mb-4">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{edu.location}</span>
                              </div>
                              <p className="text-white font-medium">
                                {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile Layout */}
                  <div className="block md:hidden w-full animate-fade-in-up" style={{animationDelay: `${0.3 + index * 0.2}s`}}>
                    <div className="gradient-border card-hover">
                      <div className="bg-slate-800 rounded-md p-4">
                        <div className="flex items-center gap-2 bg-slate-700 rounded-md px-3 py-1.5 mb-3 w-fit">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-300">{edu.duration}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{edu.degree}</h3>
                        <p className="text-gray-400 mb-3 text-sm">{edu.institution}</p>
                        <div className="flex items-center gap-2 text-gray-400 mb-3">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{edu.location}</span>
                        </div>
                        <p className="text-white font-medium text-sm">
                          {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-8 md:mb-16 animate-scale-in delay-200">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-full flex items-center justify-center animate-pulse-hover">
              <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Work Experience</h1>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Desktop Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-blue-400"></div>
            
            {/* Mobile Timeline line */}
            <div className="block md:hidden absolute left-6 top-0 h-full w-0.5 bg-blue-400"></div>

            {/* Desktop Timeline dots */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-8 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bottom-8 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>

            <div className="space-y-8 md:space-y-24">
              {workExperience.map((work, index) => (
                <div key={work.id} className="flex items-start md:items-center">
                  {/* Mobile Timeline Dot */}
                  <div className="block md:hidden w-3 h-3 bg-blue-400 rounded-full mt-6 mr-6 flex-shrink-0 animate-pulse"></div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden md:flex md:items-center w-full">
                    {index % 2 === 0 ? (
                      <>
                        <div className="w-1/2 pr-8 animate-slide-in-left" style={{animationDelay: `${0.3 + index * 0.2}s`}}>
                          <div className="gradient-border-blue card-hover">
                            <div className="bg-slate-800 rounded-md p-6">
                              <div className="flex items-center gap-2 bg-slate-700 rounded-md px-3 py-1.5 mb-4 w-fit">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-300">{work.duration}</span>
                              </div>
                              <h3 className="text-xl font-bold text-white mb-2">{work.position}</h3>
                              <p className="text-blue-400 font-medium mb-4">{work.company}</p>
                              <div className="flex items-center gap-2 text-gray-400 mb-4">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{work.location}</span>
                              </div>
                              <p className="text-gray-300 mb-4 text-sm leading-relaxed">{work.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {work.skills.map((skill, skillIndex) => (
                                  <span key={skillIndex} className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs transition-transform hover:scale-105">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/2"></div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2"></div>
                        <div className="w-1/2 pl-8 animate-slide-in-right" style={{animationDelay: `${0.3 + index * 0.2}s`}}>
                          <div className="gradient-border-blue card-hover">
                            <div className="bg-slate-800 rounded-md p-6">
                              <div className="flex items-center gap-2 bg-slate-700 rounded-md px-3 py-1.5 mb-4 w-fit">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-300">{work.duration}</span>
                              </div>
                              <h3 className="text-xl font-bold text-white mb-2">{work.position}</h3>
                              <p className="text-blue-400 font-medium mb-4">{work.company}</p>
                              <div className="flex items-center gap-2 text-gray-400 mb-4">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{work.location}</span>
                              </div>
                              <p className="text-gray-300 mb-4 text-sm leading-relaxed">{work.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {work.skills.map((skill, skillIndex) => (
                                  <span key={skillIndex} className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs transition-transform hover:scale-105">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile Layout */}
                  <div className="block md:hidden w-full animate-fade-in-up" style={{animationDelay: `${0.3 + index * 0.2}s`}}>
                    <div className="gradient-border-blue card-hover">
                      <div className="bg-slate-800 rounded-md p-4">
                        <div className="flex items-center gap-2 bg-slate-700 rounded-md px-3 py-1.5 mb-3 w-fit">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-300">{work.duration}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{work.position}</h3>
                        <p className="text-blue-400 font-medium mb-3 text-sm">{work.company}</p>
                        <div className="flex items-center gap-2 text-gray-400 mb-3">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{work.location}</span>
                        </div>
                        <p className="text-gray-300 mb-3 text-xs leading-relaxed">{work.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {work.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs transition-transform hover:scale-105">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}