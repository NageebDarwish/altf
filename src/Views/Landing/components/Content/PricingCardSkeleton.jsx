const PricingCardSkeleton = () => {
  return (
    <div className="w-full max-w-sm p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg sm:p-8 animate-pulse">
      <div className="h-6 mb-4 bg-gray-300 rounded-md"></div>
      <div className="flex items-baseline text-gray-900">
        <div className="h-10 w-24 bg-gray-300 rounded-md"></div>
        <div className="h-4 w-16 ml-2 bg-gray-300 rounded-md"></div>
      </div>
      <div className="h-4 mt-2 w-32 bg-gray-300 rounded-md"></div>
      <ul role="list" className="space-y-5 my-7">
        {[...Array(4)].map((_, i) => (
          <li key={i} className="flex items-center">
            <div className="w-5 h-5 mr-2 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-full bg-gray-300 rounded-md"></div>
          </li>
        ))}
      </ul>
      <div className="h-12 bg-gray-300 rounded-lg"></div>
    </div>
  );
};

export default PricingCardSkeleton;