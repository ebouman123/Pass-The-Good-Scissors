export default function Square({ size, fabricUrl, onClick }) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      cursor= 'pointer'
    >
      {/* Conditionally render a white square or a square with an image if an image is provided */}
      <g>
        <rect
          width={size}
          height={size}
          fill="white"
          stroke="black"
          strokeWidth="1"
        />
        {fabricUrl && (
          <image
            href={fabricUrl}
            width={size}
            height={size}
            preserveAspectRatio="xMidYMid slice"
          />
        )}
      </g>
    </svg>
  );
}
