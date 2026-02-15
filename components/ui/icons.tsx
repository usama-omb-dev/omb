export const ArrowRight = ({ color }: { color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      stroke={color ? color : "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1 8h14m0 0L8 1m7 7-7 7"
    ></path>
  </svg>
);

export const BulletPoint = ({ color }: { color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    fill="none"
    viewBox="0 0 11 11"
  >
    <circle cx="5.5" cy="5.5" r="5.5" fill={color ? color : "#fff"}></circle>
  </svg>
);

// export const ArrowRight = ({ color }: { color?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="16"
//     height="16"
//     fill="none"
//     viewBox="0 0 16 16"
//   >
//     <path
//       stroke="#fff"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M1.001 9.573 14.524 5.95m0 0L5.951 1m8.573 4.95-4.95 8.573"
//     ></path>
//   </svg>
// );
