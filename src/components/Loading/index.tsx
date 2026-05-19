function Loading() {
  // From Uiverse.io by tubbymctubbzz
  return (
    <div className="mx-auto rounded-xl overflow-hidden drop-shadow-2xl">

      <div className="flex p-8 justify-center items-center h-[450px]">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 border-4 border-t-[#006666] border-gray-200 rounded-full animate-spin mx-auto"></div>
          <div className="text-[#006666] font-semibold text-4xl opacity-90 animate-fadeIn">
            Almost There...
          </div>
          <div className="text-gray-600 text-sm opacity-80 animate-fadeIn">
            <p>We&apos;re getting everything ready for you...</p>
            <p>Sit tight for just a moment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
