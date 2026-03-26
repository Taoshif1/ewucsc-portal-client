// const roles = ["All", "President", "Executive", "Sub Executive"];

// const MembersFilterTabs = ({ activeRole, setActiveRole }) => {
//   return (
//     <div className="flex flex-wrap justify-center gap-3">
//       {roles.map((role) => (
//         <button
//           key={role}
//           onClick={() => setActiveRole(role)}
//           className={`btn rounded-full px-6 transition-all duration-300 ${
//             activeRole === role
//               ? "btn-primary shadow-lg shadow-primary/20 scale-105"
//               : "btn-outline border-base-content/10 hover:border-primary hover:text-primary"
//           }`}
//         >
//           {role}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default MembersFilterTabs;